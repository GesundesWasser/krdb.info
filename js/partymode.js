"use strict"

import JSConfetti from 'js-confetti';
import { startRain } from "rain-effect";
import Chance from 'chance';
const c = new Chance({ country: "ru", mobile: true, formatted: true});
const partyWords = ["Harry Hops Hotline: " + c.phone(), "Einhorn Klebestift!", "𝑓ancy 𝑓!", "Party auf KRDB?", "Richtig fancy", "Phonk gefällig?", "DJ Autoplay hat reingaggt!", "Rena ist dumm!", "9/10 DJs empfehlen dieses Lied!"];

function party() {
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti();
        console.log("PARTYZEIT");
        spawnWord();
        spawnWord();
        spawnWord();
        spawnWord();
    }

function starttheparty() {
        startRain({amount: 180, fullscreen: false});
    const audio = new Audio('https://download.scamcraft.net/Dubtec Records - Audio K9 - Clubbed To Tech (Extended Mix).m4a');
    audio.preload = "auto";
    audio.loop = true;
    audio.play();
    party(); // run instantly
    setInterval(party, 2000); // then repeat every 2 seconds
};

function spawnWord() {
  const word = document.createElement("span");
  word.textContent = partyWords[Math.floor(Math.random() * partyWords.length)];

  // Random position, color, size
  word.style.cssText = `
    position: fixed;
    left: ${Math.random() * 90}vw;
    top: ${Math.random() * 80}vh;
    font-size: ${1.5 + Math.random() * 3}rem;
    font-weight: bold;
    color: hsl(${Math.random() * 360}, 100%, 60%);
    pointer-events: none;
    z-index: 9999;
    animation: wordPop 1.5s ease-out forwards;
    font-family: sans-serif;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.4);
  `;

  document.body.appendChild(word);
  setTimeout(() => word.remove(), 1500); // Clean up after animation
};

export default starttheparty;