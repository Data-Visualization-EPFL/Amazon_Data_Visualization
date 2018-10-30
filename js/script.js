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

new Map($("#map"));


document.addEventListener("DOMContentLoaded", () => {
	console.log("Start of the page");

  alert("You will see a Data visualisation project about: Natural Resilience in the Amazon.\
  You will be able to interact with the data by using the toolbox.")
});
