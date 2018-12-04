import * as constants from './constants.js';
import { $, $$ } from './utilities.js';

// import Map from 'ol/Map.js';
// import View from 'ol/View.js';
// import GeoJSON from 'ol/format/GeoJSON.js';
// import OSM from 'ol/source/OSM.js';
// import VectorTileSource from 'ol/source/VectorTile.js';
// import {Tile as TileLayer, VectorTile as VectorTileLayer} from 'ol/layer.js';
// import Projection from 'ol/proj/Projection.js';


export class RealMap {
  constructor(ctn) {
    this.map = null;
    this.layers = {};
    this.container = ctn;
    this.layers.base = new ol.layer.Tile({source: new ol.source.OSM()});

    for (let layerId in constants.LAYER_MAP) {
      this.addLayer(layerId, constants.LAYER_MAP);
      if (!$("#" + layerId).checked) {
        this.hideLayer(layerId);
      }
      $("#" + layerId).addEventListener("change", e => {
        this.toggleLayer(layerId);
      });
    }
    let categoryLayers;
    for (let categoryId in constants.CATEGORIES) {
      categoryLayers = constants.CATEGORIES[categoryId];
      for (let layerId in categoryLayers) {
        this.addLayer(layerId, categoryLayers);
        if (!$("#" + categoryId).checked) {
          this.hideLayer(layerId);
        }
        console.log(layerId);
      }
      $("#" + categoryId).addEventListener("change", e => {
        for (let layerId in categoryLayers) {
          this.toggleLayerOfCategory(layerId, categoryId);
        }
      });
    }
    this.renderMap();

    // var url = constants.LAYER_MAP['agua'].url;
    // fetch(url).then(function(response) {
    //   return response.json();
    // }).then(function(json) {
    //   var tileIndex = geojsonvt(json, {
    //     extent: 4096,
    //     maxZoom: 15,
    //     indexMaxZoom: 5,
    //     debug: 1
    //   });
    //   console.log(tileIndex);
    //
    //   var replacer = function(key, value) {
    //     if (value.geometry) {
    //       var type;
    //       var rawType = value.type;
    //       var geometry = value.geometry;
    //
    //       if (rawType === 1) {
    //         type = 'MultiPoint';
    //         if (geometry.length == 1) {
    //           type = 'Point';
    //           geometry = geometry[0];
    //         }
    //       } else if (rawType === 2) {
    //         type = 'MultiLineString';
    //         if (geometry.length == 1) {
    //           type = 'LineString';
    //           geometry = geometry[0];
    //         }
    //       } else if (rawType === 3) {
    //         type = 'Polygon';
    //         if (geometry.length > 1) {
    //           type = 'MultiPolygon';
    //           geometry = [geometry];
    //         }
    //       }
    //
    //       return {
    //         'type': 'Feature',
    //         'geometry': {
    //           'type': type,
    //           'coordinates': geometry
    //         },
    //         'properties': value.tags
    //       };
    //     } else {
    //       return value;
    //     }
    //   };
    //
    //   var tilePixels = new ol.proj.Projection({
    //     code: 'TILE_PIXELS',
    //     units: 'tile-pixels'
    //   });
    //
    //   var vectorSource = new ol.source.VectorTile({
    //     format: new ol.format.GeoJSON(),
    //     tileLoadFunction: function(tile) {
    //       console.log("HELLO", tile);
    //       var format = tile.getFormat();
    //       var tileCoord = tile.getTileCoord();
    //       console.log(tilesCoord);
    //       var data = tileIndex.getTile(tileCoord[0], tileCoord[1], -tileCoord[2] - 1);
    //       var features = format.readFeatures(JSON.stringify({
    //           type: 'FeatureCollection',
    //           features: data ? data.features : []
    //         }), replacer);
    //       tile.setLoader(function() {
    //         tile.setFeatures(features);
    //         tile.setProjection(tilePixels);
    //       });
    //     },
    //     projection: 'EPSG:4326',
    //     url: 'data' // arbitrary url, we don't use it in the tileLoadFunction
    //   });
    //   console.log(vectorSource);
    //   var vectorLayer = new ol.Layer.VectorTile({
    //     source: vectorSource,
    //     // style: new ol.style.Style({
    //     //   fill: new ol.style.Stroke({
    //     //     color: 'rgba(20, 20, 240, 1)'
    //     //   })
    //     // })
    //     preload: 0
    //   });
    //   console.log("HELLO");
    //   console.log(vectorLayer);
    //   this.layers.tiles = vectorLayer;
    //
    //   vectorLayer.getSource().on("tileloadstart", (e) => {
    //     console.log(vectorLayer);
    //   });
    //   this.renderMap();
    // });


    // var resolutions = [];
    // var matrixIds = [];
    // var proj4326 = new ol.proj.get('EPSG:4326');
    // var maxResolution = ol.extent.getWidth(proj4326.getExtent()) / 256;
    //
    // for (var i = 0; i < 18; i++) {
    //   matrixIds[i] = 'EPSG:4326:' + i;
    //   resolutions[i] = maxResolution / Math.pow(2, i);
    // }
    //
    // var tileGrid = new ol.tilegrid.WMTS({
    //   origin: ol.proj.fromLonLat([-68.45, -12.92], 'EPSG:4326'),
    //   resolutions: resolutions,
    //   matrixIds: matrixIds
    // });
    // var tiles = new ol.source.WMTS({
    //     url: TILES_URL.root,
    //     layer: 'GEOGRAPHICALGRIDSYSTEMS.MAPS',
    //     matrixSet: 'EPSG:4326',
    //     format: 'image/png',
    //     projection: 'EPSG:4326',
    //     tileGrid: tileGrid,
    //     style: 'normal',
    //     // attributions: '<a href="http://www.geoportail.fr/" target="_blank">' +
    //     //       '<img src="https://api.ign.fr/geoportail/api/js/latest/' +
    //     //       'theme/geoportal/img/logo_gp.gif"></a>'
    // })
    // this.layers.tiles = tiles;
    // console.log(this.layers.base);
    // console.log(tiles);
    // this.addTilesLayer();


  }

  // addTilesLayer() {
  //   var layer = new  ol.layer.Tile({
  //         extent: [-13884991, 2870341, -7455066, 6338219],
  //         source: new ol.source.TileWMS({
  //           url: constants.TILES_URL.root,
  //           params: {'LAYERS': 'topp:states', 'TILED': true},
  //           serverType: 'geoserver',
  //           // Countries have transparency, so do not fade tiles:
  //           transition: 0
  //         })
  //       });
  //       this.layers.tiles = layer;
  //       return layer;
  // }

  addLayer(id, category) {
    if (category[id].style == null) {
      const vector = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: category[id].url,
          format: new ol.format.GeoJSON({ layers: ['cantons'] }),
          overlaps: true
        })
      });
      this.layers[id] = vector;
    } else {
      const vector = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: category[id].url,
          format: new ol.format.GeoJSON({ layers: ['cantons'] }),
          overlaps: true
        }),
        style: new ol.style.Style({
          fill: new ol.style.Stroke(category[id].style)
        })
      });
      this.layers[id] = vector;
    }
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

  toggleLayerOfCategory(id, categoryId) {
    const layer = this.layers[id];
    if (!$("#" + categoryId).checked) {
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
  }

  renderMap() {
    console.log(this.layers);
    this.map = new ol.Map({
      layers: Object.values(this.layers),
      target: this.container.id,
      view: new ol.View({
        center: ol.proj.fromLonLat([-68.45, -11.62]),
        zoom: 7
      }),
    });
  }
}
