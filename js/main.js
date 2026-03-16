"use strict";

import '../css/button.css';
import '../css/img.css';
import '../css/layout.css';
import '../css/master.css';
import '../css/scrollbar.css';
import '../css/section.css';
import '../css/text.css';
import '../css/footer.css';
import './content.js';
import './partymode.js'
import loadTheme from './theme.js';
import loadHeader from './header.js';
import loadFooter from './footer.js';
import starttheparty from './partymode.js';
loadTheme();
loadHeader();
loadFooter();

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
    if (getDate().startsWith("11.02")) {
        console.log("Starte Bday1 Party!")
        document.getElementById("logotext").innerHTML = "Geburtstags Party!";
        starttheparty();
        return true;
    } else {
        console.log("Konnte Bday1 nicht starten :(")
    }
    if (getDate().startsWith("02.03")) {
        console.log("Starte DayOfSeal Party!")
        document.getElementById("logotext").innerHTML = "Day of Seal Party!";
        starttheparty();
        return true;
    } else {
        console.log("Konnte DayOfSeal nicht starten :(")
    }
    if (getDate().startsWith("27.07")) {
        console.log("Starte Bday2 Party!")
        document.getElementById("logotext").innerHTML = "Geburtstags Party!";
        starttheparty();
        return true;
    } else {
        console.log("Konnte Bday2 nicht starten :(")
    }
    if (getDate().startsWith("31.12")) {
        console.log("Starte NewYear Party!")
        document.getElementById("logotext").innerHTML = "Silvester Party!";
        starttheparty();
        return true;
    } else {
        console.log("Konnte NewYear nicht starten :(")
    }
}