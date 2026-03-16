"use strict";
import $ from 'jquery';
// Function to initialize header
function loadFooter() {
    $(document).ready(function() {
        const CODENAME = "krdb.info";
        const VERSION = "v1.2";
        const REVISION = "0";

        let TEST_BUILD;

        if (window.location.hostname !== "krdb.info") {
            TEST_BUILD = true;
        } else {
            TEST_BUILD = false;
        }

        const TEST_BUILD_MSG = TEST_BUILD
            ? "This version of " + CODENAME + " also looks Experimental!"
            : "";

        const START_YEAR = 2026;
        const currentYear = new Date().getFullYear();

        $('#site-name-version').text(CODENAME + " " + VERSION + " -> R" + REVISION);
        $('#testbuild').text(TEST_BUILD_MSG);
        if (currentYear === START_YEAR) {
            $('#copyright-year').text(START_YEAR.toString());
        } else {
            $('#copyright-year').text(START_YEAR + " -> " + currentYear);
        }
    });
}

export default loadFooter;