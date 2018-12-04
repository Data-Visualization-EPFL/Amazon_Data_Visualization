import * as maps from './map.js';
import * as constants from './constants.js';
import { $, $$, createImputList } from './utilities.js';


document.addEventListener("DOMContentLoaded", () => {
  $("#get-started").onclick = () => {
    $("body").classList.remove("overlay-on");
  };

  let categories = Object.keys(constants.LAYER_MAP);
  createImputList($("#categories"), categories);
  const map = new maps.RealMap($("#map"));
});
