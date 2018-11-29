// import {defaults as defaultControls} from 'ol/control.js';
// import {getWidth} from 'ol/extent.js';
// import TileLayer from 'ol/layer/Tile.js';
// import {fromLonLat, get as getProjection} from 'ol/proj.js';
// import WMTS from 'ol/source/WMTS.js';
// import WMTSTileGrid from 'ol/tilegrid/WMTS.js';

function $(sel) {
  return document.querySelector(sel);
}

function $$(sel) {
  return document.querySelectorAll(sel);
}

const TILES_URL = {
  'root': 'data_private/maps/tiles2',
}

const LAYER_MAP_NAME = {
  'AOI-percountry': 'AOI per country',
  'land-use-contour': 'Land use contour',
  'agricultura': 'Agriculture',
  'agua': 'Agua',
  'aguajales': 'Aguajales',
  'arbustos': 'Arbustos',
  'bosque-inundable': 'Inundable bosque',
  'bosque-no-inundable': 'No inundable bosque',
  'herbazal': 'Herbazal',
  'humedales': 'Humedales',
  'mineria': 'Mineria',
  'other': 'Other',
  'pasto': 'data/land-use/pasto.geojson',
  'pasto-agricultura': 'data/land-use/pasto_agricultura.geojson',
  'pasto-herbazal': 'data/land-use/pasto_herbazal.geojson',
  'sabana': 'data/land-use/sabana.geojson',
  'sabana-humedales': 'data/land-use/sabana_humedales.geojson',
  'suela-desnudo': 'data/land-use/suela_desnudo.geojson',
  'thb-df': 'data/land-use/thb_df.geojson',
  'urbano': 'data/land-use/urbano.geojson',
  'vegetacion': 'data/land-use/vegetacion.geojson'
};

const LAYER_MAP = {
  'AOI-percountry': {
    'url': 'data/AOI_percountry.geojson',
    'style': null
  },
  'agricultura': {
    'url': 'data/land-use/agricultura.geojson',
    'style': {
        color: 'rgba(180, 180, 30, 1)'
      }
  },
  'agua': {
    'url': 'data/land-use/agua.geojson',
    'style': {
        color: 'rgba(20, 20, 240, 1)'
      }
  },
  'aguajales': {
    'url': 'data/land-use/aguajales.geojson',
    'style': {
        color: 'rgba(5, 5, 120, 1)'
      }
  },
  'bosque-inundable': {
    'url': 'data/land-use/bosque_inundable.geojson',
    'style': {
        color: 'rgba(40, 130, 190, 1)'
      }
  },
  'bosque-no-inundable': {
    'url': 'data/land-use/bosque_no_inundable.geojson',
    'style': {
        color: 'rgba(80, 130, 80, 1)'
      }
  },
  'herbazal': {
    'url': 'data/land-use/herbazal.geojson',
    'style': {
        color: 'rgba(8, 230, 3, 1)'
      }
  },
  'mineria': {
    'url': 'data/land-use/mineria.geojson',
    'style': {
        color: 'rgba(0, 0, 0, 1)'
      }
  },
  'pasto': {
    'url': 'data/land-use/pasto.geojson',
    'style': {
        color: 'rgba(80, 30, 30, 1)'
      }
  },
  'pasto-agricultura': {
    'url': 'data/land-use/pasto_agricultura.geojson',
    'style': {
        color: 'rgba(150, 200, 50, 1)'
      }
  },
  'pasto-herbazal': {
    'url': 'data/land-use/pasto_herbazal.geojson',
    'style': {
        color: 'rgba(80, 130, 130, 1)'
      }
  },
  'suela-desnudo': {
    'url': 'data/land-use/suela_desnudo.geojson',
    'style': {
        color: 'rgba(180, 130, 30, 1)'
      }
  },
  'urbano': {
    'url': 'data/land-use/urbano.geojson',
    'style': {
        color: 'rgba(120, 120, 130, 1)'
      }
  },
  'vegetacion': {
    'url': 'data/land-use/vegetacion.geojson',
    'style': {
        color: 'rgba(5, 90, 5, 1)'
      }
  },
  // 'arbustos': {
  //   'url': 'data/land-use/arbustos.geojson',
  //   'style': {
  //       color: 'rgba(5, 90, 5, 1)'
  //     }
  // },
  // 'land-use-contour': 'data/land-use-contour.geojson',
  // 'humedales': 'data/land-use/humedales.geojson',
  // 'sabana': 'data/land-use/sabana.geojson',
  // 'sabana-humedales': 'data/land-use/sabana_humedales.geojson',
  // 'thb-df': 'data/land-use/thb_df.geojson',
  // 'other': 'data/land-use/other.geojson',
};
const BASE_ID = "base";

class RealMap {
  constructor(ctn) {
    this.map = null;
    this.layers = {};
    this.container = ctn;
    this.layers.base = new ol.layer.Tile({source: new ol.source.OSM()});
    var resolutions = [];
    var matrixIds = [];
    var proj4326 = new ol.proj.get('EPSG:4326');
    console.log(proj4326, proj4326.getExtent());
    var maxResolution = ol.extent.getWidth(proj4326.getExtent()) / 256;

    for (var i = 0; i < 18; i++) {
      matrixIds[i] = 'EPSG:4326:' + i;
      resolutions[i] = maxResolution / Math.pow(2, i);
    }

    var tileGrid = new ol.tilegrid.WMTS({
      origin: ol.proj.fromLonLat([-68.45, -12.92], 'EPSG:4326'),
      resolutions: resolutions,
      matrixIds: matrixIds
    });
    this.layers.tiles = new ol.source.WMTS({
        url: TILES_URL.root,
        layer: 'GEOGRAPHICALGRIDSYSTEMS.MAPS',
        matrixSet: 'EPSG:4326',
        format: 'image/png',
        projection: 'EPSG:4326',
        tileGrid: tileGrid,
        style: 'normal',
        // attributions: '<a href="http://www.geoportail.fr/" target="_blank">' +
        //       '<img src="https://api.ign.fr/geoportail/api/js/latest/' +
        //       'theme/geoportal/img/logo_gp.gif"></a>'
      })
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
    console.log(LAYER_MAP[id]);
    if (LAYER_MAP[id].style == null) {
      console.log(LAYER_MAP[id]);
      const vector = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: LAYER_MAP[id].url,
          format: new ol.format.GeoJSON({ layers: ['cantons'] }),
          overlaps: true
        })
      });
      this.layers[id] = vector;
    } else {
      const vector = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: LAYER_MAP[id].url,
          format: new ol.format.GeoJSON({ layers: ['cantons'] }),
          overlaps: true
        }),
        style: new ol.style.Style({
          fill: new ol.style.Stroke(LAYER_MAP[id].style)
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
        center: ol.proj.fromLonLat([-68.45, -12.92], 'EPSG:4326'),
        zoom: 5
      }),
    });
  }

  AddCluster() {
    const distance = document.getElementById('distance');

    var count = 20000;
       var features = new Array(count);
       var e = 4500000;
       for (var i = 0; i < count; ++i) {
         var coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
         features[i] = new ol.Feature(new ol.geom.Point(coordinates));
       }

    const source = new ol.source.Vector({
            features: features
          });

          var clusterSource = new ol.source.Cluster({
            distance: parseInt(distance.value, 10),
            source: source
          });

          var styleCache = {};
          var clusters = new ol.layer.Vector({
            source: clusterSource,
            style: function(feature) {
              var size = feature.get('features').length;
              var style = styleCache[size];
              if (!style) {
                style = new ol.style.Style({
                  image: new ol.style.Circle({
                    radius: 10,
                    stroke: new ol.style.Stroke({
                      color: '#fff'
                    }),
                    fill: new ol.style.Fill({
                      color: '#3399CC'
                    })
                  }),
                  text: new ol.style.Text({
                    text: size.toString(),
                    fill: new ol.style.Fill({
                      color: '#fff'
                    })
                  })
                });
                styleCache[size] = style;
              }
              return style;
            }
          });
          this.layers["cluster"] = clusters;
          this.map.render();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  $("#get-started").onclick = () => {
    $("body").classList.remove("overlay-on");
  };
  createImputList($("#categories"));
  const map = new RealMap($("#map"));
  map.AddCluster();
});

function getTileURL(bounds)
{
    var res = this.map.getResolution();
    var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round((bounds.bottom - this.maxExtent.bottom) / (res * this.tileSize.h));
    var z = this.map.getZoom();

    var path = "img/tiles/" + z + "/" + x + "/" + y + "." + this.type;
    var url = this.url;
    if (url instanceof Array)
    {
        url = this.selectUrl(path, url);
    }
    return url + path;
}

function createImputList(el) {
  Object.keys(LAYER_MAP).forEach((id) => {
    const container = document.createElement("div");
    const input = document.createElement("input");
    const label = document.createElement("label");
    const text = document.createTextNode(LAYER_MAP_NAME[id]);

    container.appendChild(input);
    container.appendChild(label);
    label.appendChild(text);

    input.setAttribute("id", id);
    input.setAttribute("class", "toggle");
    input.setAttribute("type", "checkbox");
    label.setAttribute("for", id);

    el.appendChild(container);
  });
}
