"use strict";
import jSecRenderer from './jSecRenderer.js';

function loadakten() {
let SectionsMain = [];
SectionsMain = [
            {
                imgSrc: 'https://download.scamcraft.net/img/fileablegesetz.png',
                author: '',
                date: '15.03.2026',
                imgAlt: '',
                title: 'Fileable Gesetz',
                description: '',
                buttonText: '',
                showButton: false
            },
            {
                imgSrc: 'https://download.scamcraft.net/img/altreifengesetz.png',
                author: '',
                date: '11.09.2025',
                imgAlt: '',
                title: 'Altreifen Gesetz',
                description: '',
                buttonText: '',
                showButton: false
            }
        ];
jSecRenderer.setSections(SectionsMain, "Alle Gesetze aus Bulettien");
}

export { loadakten };