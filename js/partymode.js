"use strict"

import JSConfetti from 'js-confetti';
import { startRain, stopRain } from "rain-effect";
import Chance from 'chance';

const c = new Chance({ country: "ru", mobile: true, formatted: true});
const partyWords = ["Harry Hops Hotline: " + c.phone(), "Einhorn Klebestift!", "𝑓ancy 𝑓!", "Party auf KRDB?", "Richtig fancy", "Phonk gefällig?", "DJ Autoplay hat reingaggt!", "Rena ist dumm!", "9/10 DJs empfehlen dieses Lied!"];
const audio = new Audio('https://download.scamcraft.net/Dubtec Records - Audio K9 - Clubbed To Tech (Extended Mix).m4a');
let loopInterval;
let index = 1;

function party() {
        document.getElementById("feed-party-grab").classList.add("rainbow-animated");
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti();
        console.log("PARTYZEIT");
        spawnWord();
        spawnWord();
        spawnWord();
        spawnWord();
        swaptext();
        if (audio.currentTime > 255) {
          stopparty();
        }
};

function starttheparty() {
        startRain({amount: 180, fullscreen: false});
    audio.preload = "auto";
    audio.loop = false;
    audio.currentTime = 15.25;
    audio.play();
    party(); // run instantly
    loopInterval = setInterval(party, 2000); // then repeat every 2 seconds
    setInterval(clearInterval, 281000);
};

function stopparty() {
  console.log("Stoppe die Party :(");
  stopRain();
  audio.pause()
  audio.currentTime = 0;
  document.getElementById("logotext").innerHTML = "KRDB.INFO";
  document.getElementById("feed-party-grab").classList.remove("rainbow-animated");
  console.log("Die Party wird gestoppt");
  clearInterval(loopInterval);
}

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

function swaptext() {
    if (index === 1) {
        console.log("Der Text index ist auf 1!")
        document.getElementById("feed-party-grab").innerHTML = "KRDB.INFO: Party Mode!"
        index = 2;
        return true;
    }
    if (index === 2) {
        console.log("Der Text index ist auf 2!")
        const d = new Date();
        if (d.getFullYear() - 2025 == "1") {
            document.getElementById("feed-party-grab").innerHTML = "Anniversary (" + (d.getFullYear() - 2025) + " Jahr)";
        } else {
            document.getElementById("feed-party-grab").innerHTML = "Anniversary (" + (d.getFullYear() - 2025) + " Jahre)";
        }
        index = 1;
        return true;
    }
}

export {starttheparty, stopparty};