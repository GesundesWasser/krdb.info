"use strict";
import $ from "jquery";

function loadFooter() {
  $(document).ready(function () {
    const CODENAME = "krdb.info";
    const VERSION = "";
    const REVISION = __GIT_HASH__; // ← injected at build time

    let TEST_BUILD;

    if (window.location.hostname !== "krdb.info") {
      TEST_BUILD = true;
    } else {
      TEST_BUILD = false;
    }

    const TEST_BUILD_MSG = TEST_BUILD
      ? "Das ist eine Developerversion von " + CODENAME + "!"
      : "";

    const START_YEAR = 2026;
    const currentYear = new Date().getFullYear();

    $("#site-name-version").text(CODENAME + " " + VERSION);
    $("#git-commit").text("Git Commit: " + REVISION);
    $("#testbuild").text(TEST_BUILD_MSG);
    if (currentYear === START_YEAR) {
      $("#copyright-year").text(START_YEAR.toString());
    } else {
      $("#copyright-year").text(START_YEAR + " -> " + currentYear);
    }
  });
}

export default loadFooter;
