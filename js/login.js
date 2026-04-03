"use strict";

const STORAGE_KEY_REMEMBER = "krdb_remember";
const STORAGE_KEY_TOKEN = "krdb_token";

export async function initLogin() {
  const token = localStorage.getItem(STORAGE_KEY_TOKEN);
  if (token) {
    const profile = await fetchProfile(token);
    if (profile) {
      showLoggedIn(profile);
      return;
    }
    // Token invalid/expired — clear and show login
    localStorage.removeItem(STORAGE_KEY_TOKEN);
  }
  renderLoginForm();
}

async function fetchProfile(token) {
  try {
    const res = await fetch("https://api.krdb.info/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return await res.json(); // { username, email, role }
  } catch {
    return null;
  }
}

function renderLoginForm() {
  const field = document.getElementById("account-field");
  field.innerHTML = `
        <div class="login-input-wrap">
            <span class="login-icon">&#128100;</span>
            <input type="text" id="login-username" placeholder="Comradename" autocomplete="username"/>
        </div>
        <div class="login-input-wrap">
            <span class="login-icon">&#128274;</span>
            <input type="password" id="login-password" placeholder="Passwort" autocomplete="current-password"/>
            <button class="login-eye" id="login-toggle-pw" type="button">&#128065;</button>
        </div>
        <label class="login-remember">
            <input type="checkbox" id="login-remember"/> Angemeldet bleiben
        </label>
        <button id="login-btn" type="button">Anmelden</button>
        <p id="login-msg"></p>
    `;

  const btn = document.getElementById("login-btn");
  const togglePw = document.getElementById("login-toggle-pw");
  const pwInput = document.getElementById("login-password");
  const msg = document.getElementById("login-msg");
  const remember = document.getElementById("login-remember");
  const userInput = document.getElementById("login-username");

  const savedUser = localStorage.getItem(STORAGE_KEY_REMEMBER);
  if (savedUser) {
    userInput.value = savedUser;
    remember.checked = true;
  }

  togglePw.addEventListener("click", () => {
    const isText = pwInput.type === "text";
    pwInput.type = isText ? "password" : "text";
    togglePw.innerHTML = isText ? "&#128065;" : "&#128064;";
  });

  btn.addEventListener("click", async () => {
    const username = userInput.value.trim();
    const password = pwInput.value;

    if (!username || !password) {
      msg.style.color = "var(--yellow)";
      msg.textContent = "Felder ausfüllen!";
      return;
    }

    btn.disabled = true;
    btn.textContent = "...";
    msg.textContent = "";

    try {
      const res = await fetch("https://api.krdb.info/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const { token } = await res.json();

        const profile = await fetchProfile(token);
        if (!profile) {
          msg.style.color = "var(--yellow)";
          msg.textContent = "Token ungültig!";
          btn.disabled = false;
          btn.textContent = "LOGIN";
          return;
        }

        localStorage.setItem(STORAGE_KEY_TOKEN, token);
        if (remember.checked) {
          localStorage.setItem(STORAGE_KEY_REMEMBER, username);
        } else {
          localStorage.removeItem(STORAGE_KEY_REMEMBER);
        }

        showLoggedIn(profile);
      } else {
        msg.style.color = "var(--yellow)";
        msg.textContent = "Falsches Passwort!";
        btn.disabled = false;
        btn.textContent = "LOGIN";
      }
    } catch (_) {
      msg.style.color = "var(--yellow)";
      msg.textContent = "Server nicht erreichbar!";
      btn.disabled = false;
      btn.textContent = "LOGIN";
    }
  });

  [userInput, pwInput].forEach((el) =>
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") btn.click();
    }),
  );
}

function showLoggedIn(profile) {
  const field = document.getElementById("account-field");

  field.innerHTML = `
        <p class="login-hello">Halölölölö, <strong>${profile.username}</strong>!</p>
        <p class="login-profile-detail">${profile.email}</p>
        <p class="login-profile-detail login-role">${profile.role}</p>
        <button id="logout-btn" type="button">Abmelden</button>
    `;
  if (profile.role === "admin") {
    document.getElementById("account-field").innerHTML = `
        <p class="login-hello">Halölölölö, <strong>${profile.username}</strong>!</p>
        <p class="login-profile-detail">${profile.email}</p>
        <p class="login-profile-detail rainbow-animated login-role">${profile.role}</p>
        <button id="logout-btn" type="button">Abmelden</button>
    `;
    document.getElementById("logout-btn").addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY_TOKEN);
      renderLoginForm();
    });
  }
}
