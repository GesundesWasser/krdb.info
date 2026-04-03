// ---------------------------
// Main File of Cookies System
// Copyright mcdonelts.city
// ---------------------------

// Function to set the cookie
function setCookie(cookieName, cookieValue, expirationDays) {
  const d = new Date();
  d.setTime(d.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

// Function to get the cookie value by name
function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

// Function to check if the user has accepted cookies
function checkCookieConsent() {
  const cookieConsent = getCookie("cookie_consent");
  if (cookieConsent === "accepted") {
    // User has previously accepted cookies, hide the popup
    document.getElementById("cookieConsent").style.display = "none";
  } else {
    // Cookie consent not yet accepted, show the popup
    document.getElementById("cookieConsent").style.display = "block";
  }
}

// Function to accept cookies
function acceptCookies() {
  setCookie("cookie_consent", "accepted", 365); // Set cookie to expire in 365 days
  document.getElementById("cookieConsent").style.display = "none"; // Hide the popup after accepting
}

// Check cookie consent status when the page loads
window.onload = checkCookieConsent;

export { acceptCookies };
