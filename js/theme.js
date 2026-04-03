"use strict";
import $ from "jquery";
// Always use dark theme
function loadTheme() {
  $(document).ready(function () {
    $("body").addClass("dark");
  });
}

export default loadTheme;
