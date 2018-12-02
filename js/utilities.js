import * as constants from './constants.js';

export function $(sel) {
  return document.querySelector(sel);
}

export function $$(sel) {
  return document.querySelectorAll(sel);
}

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

export function createImputList(el) {
  Object.keys(constants.LAYER_MAP).forEach((id) => {
    const container = document.createElement("div");
    const input = document.createElement("input");
    const label = document.createElement("label");
    const text = document.createTextNode(constants.LAYER_MAP_NAME[id]);

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
