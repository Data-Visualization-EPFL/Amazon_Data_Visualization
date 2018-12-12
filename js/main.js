import * as maps from './map.js';
import * as constants from './constants.js';
import { $, $all, createImputList, changeTab } from './utilities.js';


document.addEventListener("DOMContentLoaded", () => {
  $("#get-started").onclick = () => {
    $("body").classList.remove("overlay-on");
  };

  let categories = Object.keys(constants.LAYER_MAP);
  createImputList($("#categories"), categories);
  const map = new maps.RealMap($("#map"));
  const id = "AOI";
  map.switchLayers(id);
  $all(".tablinks").forEach(el => {
      el.onclick = (event) => {
          changeTab(event);
          if (map) {
              map.switchLayers(event.target.id.split('-')[0]);
          }
      };
      if (el.id.split("-")[0] == id) {
          el.classList.add("tab-active");
      }
  });
  $all(".tabcontent").forEach(el => {
      if (el.id.split("-")[0] !== id) {
          el.style.display = "none";
      }
  });
});
