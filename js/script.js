function $(sel) {
  return document.querySelector(sel);
}

function $$(sel) {
  return document.querySelectorAll(sel);
}


class RealMap {
  constructor(container) {

      // var vector = new ol.layer.Vector({
      //   source: new ol.source.Vector({
      //     url: 'maps/ch-cantons.json',
      //     format: new ol.format.TopoJSON({
      //       // don't want to render the full world polygon (stored as 'land' layer),
      //       // which repeats all countries
      //       layers: ['countries']
      //     }),
      //     overlaps: false
      //   }),
      //   // style: style
      // });

      var vector = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: 'maps/test.geojson',
          format: new ol.format.GeoJSON({
            // don't want to render the full world polygon (stored as 'land' layer),
            // which repeats all countries
            layers: ['cantons']
          }),
          overlaps: false
        }),
        // style: style
      });
    new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        vector
      ],
      target: container.id,
      view: new ol.View({
        center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 4
      })
    });
  }
}

// class Map {
// 	constructor(container) {
// 		this.container = container;
// 		this.render();
// 	}
//
// 	async render() {
// 		const parser = new DOMParser();
// 		const svg = parser.parseFromString(await this.getMap(), "image/svg+xml");
//
// 		this.container.append(svg.firstChild)
// 	}
//
// 	async getMap() {
// 		const response = await fetch("maps/AOI_percountry.svg");
// 		return await response.text();
// 	}
// }

document.addEventListener("DOMContentLoaded", () => {
	console.log("Start of the page");
	new RealMap($("#map"));
});
