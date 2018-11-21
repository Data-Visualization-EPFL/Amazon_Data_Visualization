
function $(sel) {
  return document.querySelector(sel);
}

function $$(sel) {
  return document.querySelectorAll(sel);
}

const LAYER_MAP = {
  'aguajales2': 'data/aguajales2.geojson', // EPSG::32719
  'AOI-percountry': 'data/AOI_percountry.geojson',
  'land-use-contour': 'data/contourLandUse.geojson',
  'bosque-no-inundable': 'data/bosque-no-inundable.geojson',
  'bosque-inundable': 'data/bosque-inundable.geojson',
  'aguajales': 'data/aguajales.geojson' // EPSG::32719
};
const BASE_ID = "base";

class RealMap {
  constructor(ctn) {
    this.map = null;
    this.layers = {};
    this.container = ctn;
    this.layers.base = new ol.layer.Tile({source: new ol.source.OSM()});

    for (let layer in LAYER_MAP) {
      this.addLayer(layer);
    }
    this.renderMap();

    for (let layer in LAYER_MAP) {
      if (!$("#" + layer).checked) {
        this.hideLayer(layer);
      }
      $("#" + layer).addEventListener("change", e => {
        this.toggleLayer(layer);
      });
    }
  }

  addLayer(id) {
    const vector = new ol.layer.Vector({
      source: new ol.source.Vector({
        url: LAYER_MAP[id],
        format: new ol.format.GeoJSON({ layers: ['cantons'] }),
        overlaps: true
      }),
      // style: style
    });
    this.layers[id] = vector;
  }

  toggleLayer(id) {
    const layer = this.layers[id];
    if (!$("#" + id).checked) {
      this.hideLayer(id);
    } else {
      this.showLayer(id);
    }
    this.map.render();
  }

  showLayer(id) {
    this.layers[id].setVisible(true);
  }

  hideLayer(id) {
    this.layers[id].setVisible(false);
    // const layer = this.layers[id];
    // this.map.removeLayer(layer);
    // delete this.layers[id];
  }

  plsHelp() {
    const pt = [459123.1209, 3108334.7701];
    const test = ol.proj.transform(pt, new ol.proj.Projection('EPSG:32719'), new ol.proj.Projection('EPSG:4326'));
    console.log(pt, test);

    var myProjectionName = 'EPSG:32719';
    proj4.defs(myProjectionName, "+proj=utm +zone=19S +ellps=WRS84 +units=m +no_defs");
    var myProjection = ol.proj.get(myProjectionName)
    console.log(myProjection);
  }

  renderMap() {
    this.map = new ol.Map({
      layers: Object.values(this.layers),
      target: this.container.id,
      view: new ol.View({
        center: ol.proj.fromLonLat([-68.45, -12.92]),
        zoom: 5
      }),
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
	console.log("Start of the page");

  $("#project-description-close-btn").onclick = () => {
    $("#project-description-container").style.display = 'none';
    $$(".blur").forEach((node) => node.style.filter = "blur(0px)");
  };

  const map = new RealMap($("#map"));
  map.plsHelp();
});

// function loadJSON(callback, pathToFile) {
//   var xobj = new XMLHttpRequest();
//   xobj.overrideMimeType("application/json");
//   xobj.open('GET', pathToFile, true);
//   xobj.onreadystatechange = function () {
//     if (xobj.readyState == 4 && xobj.status == "200") {
//       callback(JSON.parse(xobj.responseText));
//     }
//   };
//   xobj.send(null);
// }
