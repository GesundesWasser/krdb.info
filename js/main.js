"use strict";

import '../css/button.css';
import '../css/img.css';
import '../css/layout.css';
import '../css/master.css';
import '../css/scrollbar.css';
import '../css/section.css';
import '../css/text.css';
import '../css/footer.css';
import '../css/rainbowtext.css';
import './content.js';
import './partymode.js'
import loadTheme from './theme.js';
import loadHeader from './header.js';
import loadFooter from './footer.js';
import { starttheparty, stopparty } from './partymode.js';
import { loadakten } from './akten_test.js';
import { loadSections, SectionsMain } from './content.js';
import { acceptCookies } from './cookies.js';
import { initLogin } from './login.js';

loadTheme();
loadHeader();
loadFooter();
await initLogin();

if (window.location.hostname == "krdb.info") {

const audio = new Audio('https://download.scamcraft.net/Soyuzed.mp3');
audio.preload = "auto";
audio.loop = false;

function startAudio() {
    const isParty = trytostartparty();

    if (isParty) {
        console.log("Heute ist eine Party angesagt! Keine Hymne!");
    } else {
        audio.play()
            .then(() => {
                console.log("Hymne abgespielt!");
            })
            .catch((err) => {
                console.warn("Autoplay blocked:", err);
            });
    }

    document.removeEventListener("click", startAudio);
    document.removeEventListener("keydown", startAudio);
}

// Wait for first user interaction (required by browsers)
document.addEventListener("click", startAudio, { once: true });
document.addEventListener("keydown", startAudio, { once: true });
}
const getDate = () => {
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const d = newDate.getDate();
  
  return `${d.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
}

function trytostartparty() {
    console.log(getDate());
    if (getDate().startsWith("04.04")) {
        console.log("Starte Anniversary Party!")
        document.getElementById("logotext").innerHTML = "";
        document.getElementById("feed-party-grab").classList.add("rainbow-animated");
        starttheparty();
        return true;
    } else {
        console.log("Konnte Anniversary nicht starten :(")
    }
}
loadSections();
document.getElementById("gesetze").addEventListener("click", () => {
loadakten();
});
document.getElementById("logotext").addEventListener("click", () => {
history.pushState(null, '', window.location.pathname);
loadSections();
});

document.getElementById("cookies").addEventListener("click", acceptCookies);

async function loadData() {
    const response = await fetch("https://api.krdb.info/api/stats");
    const data = await response.json();

    console.log("API Returned: ", data);

    const apiresponse = data.players;
    let messages = [];

    if (apiresponse.includes("GesundesWasser")) {
        messages.push("Comrade Sam ist gerade auf KRDB!");
    }
    if (apiresponse.includes("Scamcraft_net")) {
        messages.push("Comrade Jakob ist gerade auf KRDB!");
    }

    const knownPlayers = ["GesundesWasser", "Scamcraft_net"];
    const otherPlayers = apiresponse.filter(player => !knownPlayers.includes(player));

    if (otherPlayers.length > 0) {
        messages.push(`Comrade Freddy ist gerade ${otherPlayers.length} mal auf KRDB!`);
    }

    console.log(messages);
    document.getElementById("playerCount").innerHTML = messages.join("<br>");
}

loadData();