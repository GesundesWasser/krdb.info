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
import loadTheme from './theme.js';
import loadHeader from './header.js';
import loadFooter from './footer.js';
loadTheme();
loadHeader();
loadFooter();

// Create audio instance
if (window.location.hostname == "krdb.info") {
const audio = new Audio('https://download.scamcraft.net/Soyuzed.mp3');
audio.preload = "auto";
audio.loop = false; // change to true if you want looping

// Function to safely play audio
function startAudio() {
    audio.play()
        .then(() => {
            console.log("[krdb.info] Audio started successfully.");
        })
        .catch((err) => {
            console.warn("[krdb.info] Autoplay blocked:", err);
        });

    // Remove listeners after first interaction
    document.removeEventListener("click", startAudio);
    document.removeEventListener("keydown", startAudio);
}

// Wait for first user interaction (required by browsers)
document.addEventListener("click", startAudio, { once: true });
document.addEventListener("keydown", startAudio, { once: true });
}

console.log("[krdb.info] Successfully loaded all Scripts!");