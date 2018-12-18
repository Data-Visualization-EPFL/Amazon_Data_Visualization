import * as constants from './constants.js';
import { $ } from './utilities.js';

export class RealMap {
  constructor(ctn) {
    this.map = null;
    this.layers = {};
    this.container = ctn;
    this.layers.base = new ol.layer.Tile({source: new ol.source.OSM()});
    // this.mapBounds = new ol.Bounds( -72.611555238, -14.5522269577, -65.3395954718, -8.361227684);
    // this.mapMinZoom = 7;
    // this.mapMaxZoom = 10;
    // this.emptyTileURL = "http://www.maptiler.org/img/none.png";

    for (let layerId in constants.LAYER_MAP) {
      this.addLayer(layerId, constants.LAYER_MAP);
      this.hideLayer(layerId);
      $("#" + layerId).addEventListener("change", e => {
        this.toggleLayer(layerId);
      });
    }

    let categoryLayers;
    for (let categoryId in constants.CATEGORIES) {
      categoryLayers = constants.CATEGORIES[categoryId];
      for (let layerId in categoryLayers) {
        this.addLayer(layerId, categoryLayers);
        this.hideLayer(layerId);
      }
      $("#" + categoryId).addEventListener("change", e => {
        categoryLayers = constants.CATEGORIES[categoryId];
        for (let layerId in categoryLayers) {
          this.toggleLayerOfCategory(layerId, categoryId);
        }
      });
    }
    // var tilesLayer = new ol.layer.Tile({
    //   source: new ol.source.XYZ({
    //     url: constants.LAYER_MAP["carbon-stock"].url
    //   })
    // });
    //
    // this.layers["carbon-stock"] = tilesLayer;

    this.renderMap();
  }

  addLayer(id, category) {
    const format = category[id].format || "GeoJSON";
    if (!category[id].style) {
      const vector = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: category[id].url,
          format: new ol.format[format](),
          overlaps: true
        })
      });
      this.layers[id] = vector;
    } else {
      const vector = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: category[id].url,
          format: new ol.format[format](),
          overlaps: true
        }),
        style: (feature, resolution) => {
          let styles = [
            new ol.style.Style({
              fill: new ol.style.Fill({ color: category[id].style.fill }),
              stroke: category[id].style.stroke && new ol.style.Stroke({ color: category[id].style.stroke }),
            }),
          ];

          if (category[id].style.text) {
            styles.push(new ol.style.Style({
              text: new ol.style.Text(category[id].style.text(feature, resolution))
            }))
          }
          return styles;
        }
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
    const layer = this.layers[id];
    // if (layer.getSource().getState() != "ready") {
      this.container.classList.add("loading");
    // }
    layer.getSource().once("change", (e) => {
      if (layer.getSource().getState() == "ready") {
        this.container.classList.remove("loading");
      }
    });

    setTimeout(() => this.container.classList.remove("loading"), 1000)

    layer.setVisible(true);
  }

  hideLayer(id) {
    this.layers[id].setVisible(false);
  }

  switchLayers(id) {
    // Hide layers
    this.hideLayer("AOI-percountry");
    for (let category in constants.CATEGORIES) {
      for (let layerId in constants.CATEGORIES[category]) {
        this.hideLayer(layerId);
      }
    }
    this.hideLayer("agua");
    this.hideLayer("mineria");
    switch (id) {
      case "AOI":
        this.showLayer("AOI-percountry");
        break;

      case "agriculture":
        this.showLayer("AOI-percountry");
        for (let layerId in constants.CATEGORIES["agricultura"]) {
          this.showLayer(layerId);
        }
        break;

      case "water":
        this.showLayer("AOI-percountry");
        for (let layerId in constants.CATEGORIES["agua"]) {
          this.showLayer(layerId);
        }
        break;

      case "mines":
        this.showLayer("AOI-percountry");
        $("#mines-slider").value = 2010;
        for (let layerId of ['mines_1980s', 'mines_1990s', 'mines_2000s', 'mines_2010s']) {
          this.showLayer(layerId);
        }
        break;

      case "mapItems":
        for (let layerId in constants.LAYER_MAP) {
          if (!$("#" + layerId).checked) {
            this.hideLayer(layerId);
          } else {
            this.showLayer(layerId);
          }
        }
        for (let categoryId in constants.CATEGORIES) {
          const categoryLayers = constants.CATEGORIES[categoryId];
          for (let layerId in categoryLayers) {
            this.toggleLayerOfCategory(layerId, categoryId);
          }
        }
        break;
    }
  }

  renderMap() {
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
