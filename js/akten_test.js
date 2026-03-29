"use strict";
import jSecRenderer from './jSecRenderer.js';

function loadakten() {
let SectionsMain = [];
SectionsMain = [
            {
                imgSrc: 'https://s3.wagger.dev/uploads/8ecee6be20dc98647c1be8bcdeba6ac08ddf0fb2fe5a00afa26beee8b1c31299.png',
                author: '',
                date: '15.03.2026',
                imgAlt: '',
                title: 'Fileable Gesetz',
                description: '',
                buttonText: '',
                showButton: false
            },
            {
                imgSrc: 'https://s3.wagger.dev/uploads/936d6b553a31a59ee3895ad56030a9b7ba107ca750edc7caef40351e71179157.png',
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