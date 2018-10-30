function $(sel) {
  return document.querySelector(sel);
}

function $$(sel) {
  return document.querySelectorAll(sel);
}


class Map {
	constructor(container) {
		this.container = container;
		this.render();
	}

	async render() {
		const parser = new DOMParser();
		const svg = parser.parseFromString(await this.getMap(), "image/svg+xml");

		this.container.append(svg.firstChild)
	}

	async getMap() {
		const response = await fetch("maps/AOI_percountry.svg");
		return await response.text();
	}
}

document.addEventListener("DOMContentLoaded", () => {
	console.log("Start of the page");
	new Map($("#map"));
});
