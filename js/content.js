"use strict";
import jSecRenderer from './jSecRenderer.js';

let SectionsMain = [];

// Load sections from API
async function loadSections() {
    try {
        const response = await fetch("https://api.krdb.info/api/sections");
        const data = await response.json();

        // Example: specific username exception
        SectionsMain = data.map(section => {
            if (section.author === "Wagger") {
                return {
                    ...section,
                    author: "Comrade Sam",
                    title: section.title,
                    description: section.description,
                    buttonText: section.buttonText,
                    showButton: section.showButton
                };
            }
            let author = capitalizeFirstLetter(section.author);
                // Modify the section for this special user
                return {
                    ...section,
                    author: "Comrade " + author,
                    title: section.title,
                    description: section.description,
                    buttonText: section.buttonText,
                    showButton: section.showButton
                };
        });

        // render sections
        jSecRenderer.initialize(SectionsMain);

    } catch (error) {
        console.error("Fehler beim laden des Inhalts (Server down?) ", error);

        // fallback content if API fails
        SectionsMain = [
            {
                imgSrc: '',
                author: 'Leonidas Vanec',
                date: '02.03.2026',
                imgAlt: '',
                title: 'Ladefehler',
                description: 'Wir konnten uns nicht mit dem Server verbinden.',
                buttonText: '',
                showButton: false
            }
        ];

        jSecRenderer.initialize(SectionsMain);
    }
}

function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}
// run on page load
loadSections();

export { SectionsMain };