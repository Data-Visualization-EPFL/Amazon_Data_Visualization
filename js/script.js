// import * from './constants.js';

function $(sel) {
  return document.querySelector(sel);
}

function $$(sel) {
  return document.querySelectorAll(sel);
}

class RealMap {
  constructor(ctn) {
    this.urls = {
      'AOI-percountry': 'data/AOI_percountry.geojson',
      'land-use-contour': 'data/contourLandUse.geojson'
    }
    this.layers = [];
    this.container = ctn;
    this.layers.push(new ol.layer.Tile({source: new ol.source.OSM()}))
    $("#AOI-percountry").onchange = (e) => {
      const layer = e.target.id;
      if (this.layers.includes(this.urls[layer])) {
        this.layers.pop(this.urls[layer]);
      } else {
        this.addNewLayer(this.urls[layer]);
      }
      this.drawMap();
    }
  }

  addNewLayer(url) {
    const vector = new ol.layer.Vector({
      source: new ol.source.Vector({
      url: url,
      format: new ol.format.GeoJSON({ layers: ['cantons'] }),
      overlaps: true
      }),
      // style: style
    });
    this.layers.push(vector);
  }

  drawMap() {
    new ol.Map({
      layers: this.layers,
      target: this.container.id,
      view: new ol.View({
        center: ol.proj.fromLonLat([-68.45, -12.92]),
        zoom: 5
      })
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
  const urls = {
    'AOI-percountry': 'data/AOI_percountry.geojson',
    'land-use-contour': 'data/contourLandUse.geojson'
  }
  if (window.Worker) {
    const myWorker = new Worker('worker.js');
    console.log(window.Worker);
    myWorker.postMessage(true);

    myWorker.onmessage = function(e) {
  		result.textContent = e.data;
  		console.log('Main (myWorker.onmessage): Message received from worker');
    }
  }

  const map = new RealMap($("#map"));
  map.addNewLayer(urls['AOI-percountry']);
  // map.addNewLayer('data/maps/land-use.geojson');
  map.drawMap();
  //tiles('test.geojson');
  //exemple2();
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
