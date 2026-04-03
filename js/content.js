"use strict";
import SoyuzRenderer from "./SoyuzRenderer.js";

let SectionsMain = [];

// Load sections from API
async function loadSections() {
  try {
    const response = await fetch("https://api.krdb.info/api/sections");
    const data = await response.json();

    // Example: specific username exception
    SectionsMain = data.map((section) => {
      // Revive button.fn string back into a callable onClick
      let button = undefined;
      if (section.button?.fn) {
        try {
          const fn = new Function(section.button.fn);
          button = { ...section.button, onClick: fn };
        } catch (e) {
          console.warn("Could not revive button fn:", e);
          button = section.button;
        }
      } else if (section.button) {
        button = section.button;
      }

      if (section.author.includes("Wagger")) {
        return {
          ...section,
          author: section.author.replace("Wagger", "Comrade Sam"),
          ...(button ? { button } : {}),
        };
      }
      let author = capitalizeFirstLetter(section.author);
      // Modify the section for this special user
      return {
        ...section,
        author: "Comrade " + author,
        ...(button ? { button } : {}),
      };
    });

    // render sections
    SoyuzRenderer.initialize(SectionsMain);
  } catch (error) {
    console.error("Fehler beim laden des Inhalts (Server down?) ", error);

    // fallback content if API fails
    SectionsMain = [
      {
        imgSrc: "",
        author: "Leonidas Vanec",
        date: "02.03.2026",
        imgAlt: "",
        title: "Ladefehler",
        description: "Wir konnten uns nicht mit dem Server verbinden.",
      },
    ];

    SoyuzRenderer.initialize(SectionsMain);
  }
}

function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
// run on page load

export { SectionsMain, loadSections };
