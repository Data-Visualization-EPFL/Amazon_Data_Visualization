import * as constants from './constants.js';
import { $, $$ } from './utilities.js';


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
  }
  
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
