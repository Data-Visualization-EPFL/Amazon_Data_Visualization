import * as constants from './constants.js';

export function $(sel) {
  return document.querySelector(sel);
}

export function $all(sel) {
  return document.querySelectorAll(sel);
}

function getTileURL(bounds) {
  var res = this.map.getResolution();
  var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
  var y = Math.round((bounds.bottom - this.maxExtent.bottom) / (res * this.tileSize.h));
  var z = this.map.getZoom();

  var path = "img/tiles/" + z + "/" + x + "/" + y + "." + this.type;
  var url = this.url;
  if (url instanceof Array) {
      url = this.selectUrl(path, url);
  }
  return url + path;
}

export function createInputList(el, layers) {
  layers.forEach((id) => {
    const container = document.createElement("div");
    const input = document.createElement("input");
    const label = document.createElement("label");
    const text = document.createTextNode(constants.LAYER_MAP[id].text);

    container.appendChild(input);
    container.appendChild(label);
    label.appendChild(text);

    input.setAttribute("id", id);
    input.setAttribute("class", "toggle");
    if (constants.LAYER_MAP[id].check) {
      input.checked = true;
    }
    input.setAttribute("type", "checkbox");
    label.setAttribute("for", id);

    el.appendChild(container);
  });
}

export function changeTab(event) {
  $all(".tabcontent").forEach(el => {
    el.hidden = true;
    $("#" + el.id.split('-')[0] + "-tab").classList.remove("tab-active");
  });
  $("#" + event.target.id.split('-')[0] + "-content").removeAttribute("hidden");
  event.target.classList.add("tab-active");
}
