
function $(sel) {
  return document.querySelector(sel);
}

function $$(sel) {
  return document.querySelectorAll(sel);
}

const LAYER_MAP = {
  'AOI-percountry': 'data/AOI_percountry.geojson',
  'land-use-contour': 'data/contourLandUse.geojson'
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

// function tiles(fileName) {
//   loadJSON(function(geojson) {
//     // build an initial index of tiles
//     const tileIndex = geojsonvt(geojson);
//     // request a particular tile
//     var features = tileIndex.getTile(1, 0, 0).features;
//     // show an array of tile coordinates created so far
//     console.log(tileIndex.tileCoords); // [{z: 0, x: 0, y: 0}, ...]
//   }, 'data/maps/' + fileName );
// }

// function exemple2() {
//   const map = new mapboxgl.Map({
//       container: 'map',
//       style: carto.basemaps.voyager,
//       center: [-70, 0],
//       zoom: 4,
//       scrollZoom: true,
//     });
//
//     const nav = new mapboxgl.NavigationControl({
//       showCompass: false
//     });
//     map.addControl(nav, 'top-left');
//
//     // Define user
//     carto.setDefaultAuth({
//       username: 'cartovl',
//       apiKey: 'default_public'
//     });
//
//     loadJSON(function(geojson) {
//       const geojsonSource = new carto.source.GeoJSON(geojson);
//       const layer = new carto.Layer('AOI-percountry', geojsonSource, new carto.Viz());
//       layer.addTo(map);
//       layer.on('loaded', hideLoader);
//     }, 'data/AOI/AOI_percountry.geojson');
//
//     function hideLoader() {
//       document.getElementById('loader').style.opacity = '0';
//     }
// }

document.addEventListener("DOMContentLoaded", () => {
	console.log("Start of the page");
  if (window.Worker) {
    const myWorker = new Worker('worker.js');
    console.log(window.Worker);
    myWorker.postMessage(true);

    myWorker.onmessage = function(e) {
  		result.textContent = e.data;
  		console.log('Main (myWorker.onmessage): Message received from worker');
    }
  }

  $("#project-description-close-btn").onclick = () => {
    console.log("click");
    $("#project-description-container").style.display = 'none';
    console.log($$(".blur"));
    console.log($$(".blur").values());
    $$(".blur").forEach((node) => node.style.filter = "blur(0px)");
  };

  const map = new RealMap($("#map"));

});

function loadJSON(callback, pathToFile) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', pathToFile, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(JSON.parse(xobj.responseText));
    }
  };
  xobj.send(null);
}
