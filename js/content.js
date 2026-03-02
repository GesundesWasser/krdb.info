"use strict";
import jSecRenderer from './jSecRenderer.js';

const SectionsMain = [
      {
        imgSrc: '', // Verbuggt
        author: 'Comrade Sam',
        date: '02.03.2026',
        imgAlt: '', // Verbuggt
        title: 'Day of Seal',
        description: 'Halölölö? Heute ist der Day of Seal von Comrade Jakob, Es wurde der Seal of Yes! Er hat sich dazu entschieden, den Seal of No in KRDB hinter den Stall zu erschießen! Die Leiche wurde natürlich per Cargo-Rakete zum Dönerklotz angemeldet!',
        buttonText: 'Lorem ipsum',
        videoSrc: 'https://download.scamcraft.net/krdbvideo-01.mp4',
        videoType: 'mp4',
        showButton: false, // Verbuggt
    },
    {
        imgSrc: '', // Verbuggt
        author: 'Comrade Sam',
        date: '02.03.2026',
        imgAlt: '', // Verbuggt
        title: 'Release von krdb.info',
        description: 'Halölölö? Hier ist Comrade Sam, Live aus Bulettien! Die neue Seite krdb.info ist jetzt offiziell online, das heißt jeder, auch außerhalb KRDB kann die News sehen!',
        buttonText: 'Lorem ipsum',
        showButton: false, // Verbuggt
    }
];
jSecRenderer.initialize(SectionsMain);
export { SectionsMain };