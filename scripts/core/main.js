"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

'serviceWorker' in navigator && navigator.serviceWorker.register('serviceWorker.js');
var Aguarela = Aguarela || {};

Aguarela.main = function () {
  return {
    init: function init(selector) {
      Aguarela.utils().init();
      typeof selector == 'undefined' && (selector = '');
      document.querySelectorAll("".concat(selector, "[data-script]:not([data-auto-init=\"false\"])")).forEach(function (element) {
        var script = element.dataset.script;
        if (!Aguarela[script]) return;

        if (typeof Aguarela[script] === 'function') {
          var scriptsObject = new Aguarela[script]();
          scriptsObject.init(element);
        } else if (_typeof(Aguarela[script]) === 'object') Aguarela[script].init(element);
      });
    }
  };
};

document.addEventListener('DOMContentLoaded', function () {
  return Aguarela.main().init();
});