import * as constants from './constants.js';
import { $, $$ } from './utilities.js';

export class RealMap {
  constructor(ctn) {
    this.map = null;
    this.layers = {};
    this.container = ctn;
    this.layers.base = new ol.layer.Tile({source: new ol.source.OSM()});
    // var replacer = function(key, value) {
    //   if (value.geometry) {
    //     var type;
    //     var rawType = value.type;
    //     var geometry = value.geometry;
    //
    //     if (rawType === 1) {
    //       type = 'MultiPoint';
    //       if (geometry.length == 1) {
    //         type = 'Point';
    //         geometry = geometry[0];
    //       }
    //     } else if (rawType === 2) {
    //       type = 'MultiLineString';
    //       if (geometry.length == 1) {
    //         type = 'LineString';
    //         geometry = geometry[0];
    //       }
    //     } else if (rawType === 3) {
    //       type = 'Polygon';
    //       if (geometry.length > 1) {
    //         type = 'MultiPolygon';
    //         geometry = [geometry];
    //       }
    //     }
    //
    //     return {
    //       'type': 'Feature',
    //       'geometry': {
    //         'type': type,
    //         'coordinates': geometry
    //       },
    //       'properties': value.tags
    //     };
    //   } else {
    //     return value;
    //   }
    // };

    var url = constants.LAYER_MAP['agua'].url;
    fetch(url).then(function(response) {
      return response.json();
    }).then(function(json) {
      var tileIndex = geojsonvt(json, {
        extent: 4096,
        maxZoom: 15,
        indexMaxZoom: 5,
        debug: 1
      });
      console.log(tileIndex);

      // // request a particular tile
      // var features = tileIndex.getTile(z, x, y).features;
      // // show an array of tile coordinates created so far
      // console.log("hello", features); // [{z: 0, x: 0, y: 0}, ...]

      var vectorSource = new ol.source.VectorTile({
        format: new ol.format.GeoJSON(),
        tileLoadFunction: function(tile) {
          var format = tile.getFormat();
          var tileCoord = tile.getTileCoord();
          console.log(tilesCoord);
          var data = tileIndex.getTile(tileCoord[0], tileCoord[1], -tileCoord[2] - 1);
          var features = format.readFeatures(JSON.stringify({
              type: 'FeatureCollection',
              features: data ? data.features : []
            }), replacer);
          tile.setLoader(function() {
            tile.setFeatures(features);
            tile.setProjection(tilePixels);
          });
        },
        url: '' // arbitrary url, we don't use it in the tileLoadFunction
      });
      var vectorLayer = new ol.Layer.VectorTile({
        source: vectorSource,
        style: new ol.style.Style({
          fill: new ol.style.Stroke({
            color: 'rgba(20, 20, 240, 1)'
          })
        })
      });
      this.layers.tiles = vectorLayer;
      console.log(vectorLayer);
      this.renderMap();
    });


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
    for (let layer in constants.LAYER_MAP) {
      this.addLayer(layer);
    }
    this.renderMap();

    for (let layer in constants.LAYER_MAP) {
      if (!$("#" + layer).checked) {
        this.hideLayer(layer);
      }
      $("#" + layer).addEventListener("change", e => {
        this.toggleLayer(layer);
      });
    }
  }

  addTilesLayer() {
    var layer = new  ol.layer.Tile({
          extent: [-13884991, 2870341, -7455066, 6338219],
          source: new ol.source.TileWMS({
            url: constants.TILES_URL.root,
            params: {'LAYERS': 'topp:states', 'TILED': true},
            serverType: 'geoserver',
            // Countries have transparency, so do not fade tiles:
            transition: 0
          })
        });
        this.layers.tiles = layer;
        return layer;
  }

  addLayer(id) {
    if (constants.LAYER_MAP[id].style == null) {
      const vector = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: constants.LAYER_MAP[id].url,
          format: new ol.format.GeoJSON({ layers: ['cantons'] }),
          overlaps: true
        })
      });
      this.layers[id] = vector;
    } else {
      const vector = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: constants.LAYER_MAP[id].url,
          format: new ol.format.GeoJSON({ layers: ['cantons'] }),
          overlaps: true
        }),
        style: new ol.style.Style({
          fill: new ol.style.Stroke(constants.LAYER_MAP[id].style)
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
        center: ol.proj.fromLonLat([-68.45, -12.92]),
        zoom: 5
      }),
    });
  }
}
