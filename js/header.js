"use strict";
import $ from "jquery";

// ── Logo Text ────────────────────────────────────────────────
// Change this string to update the logo displayed in the header.
const LOGO_TEXT = "KRDB.INFO";
// ─────────────────────────────────────────────────────────────

function loadHeader() {
  $(document).ready(function () {
    $("#header-text").text(""); //window.location.hostname);
    $(".logo").text(LOGO_TEXT);
    $("#logo-link").attr("href", "javascript:");
  });
}

export default loadHeader;
