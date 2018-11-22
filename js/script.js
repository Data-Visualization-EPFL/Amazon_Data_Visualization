
function $(sel) {
  return document.querySelector(sel);
}

function $$(sel) {
  return document.querySelectorAll(sel);
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
  'urbano': 'data/land-use/hurbano.geojson',
  'vegetacion': 'data/land-use/vegetacio.geojson'
};

const LAYER_MAP = {
  'AOI-percountry': 'data/AOI_percountry.geojson',
  'land-use-contour': 'data/land-use-contour.geojson',
  'agricultura': 'data/land-use/agricultura.geojson',
  'agua': 'data/land-use/agua.geojson',
  'aguajales': 'data/land-use/aguajales.geojson',
  'arbustos': 'data/land-use/arbustos.geojson',
  'bosque-inundable': 'data/land-use/bosque_inundable.geojson',
  'bosque-no-inundable': 'data/land-use/bosque_no_inundable.geojson',
  'herbazal': 'data/land-use/herbazal.geojson',
  'humedales': 'data/land-use/humedales.geojson',
  'mineria': 'data/land-use/mineria.geojson',
  'other': 'data/land-use/other.geojson',
  // 'pasto': 'data/land-use/pasto.geojson',
  // 'pasto-agricultura': 'data/land-use/pasto_agricultura.geojson',
  // 'pasto-herbazal': 'data/land-use/pasto_herbazal.geojson',
  // 'sabana': 'data/land-use/sabana.geojson',
  // 'sabana-humedales': 'data/land-use/sabana_humedales.geojson',
  // 'suela-desnudo': 'data/land-use/suela_desnudo.geojson',
  // 'thb-df': 'data/land-use/thb_df.geojson',
  // 'urbano': 'data/land-use/hurbano.geojson',
  // 'vegetacion': 'data/land-use/vegetacio.geojson'
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
  $("#get-started").onclick = () => {
    $("body").classList.remove("overlay-on");
  };
  createImputList($("#categories"));
  const map = new RealMap($("#map"));
});

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
