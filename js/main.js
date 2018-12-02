// import {defaults as defaultControls} from 'ol/control.js';
// import {getWidth} from 'ol/extent.js';
// import TileLayer from 'ol/layer/Tile.js';
// import {fromLonLat, get as getProjection} from 'ol/proj.js';
// import WMTS from 'ol/source/WMTS.js';
// import WMTSTileGrid from 'ol/tilegrid/WMTS.js';
import * as maps from './map.js';
import * as constants from './constants.js';
import { $, $$, createImputList } from './utilities.js';


document.addEventListener("DOMContentLoaded", () => {
  $("#get-started").onclick = () => {
    $("body").classList.remove("overlay-on");
  };
  createImputList($("#categories"));
  const map = new maps.RealMap($("#map"));
});
