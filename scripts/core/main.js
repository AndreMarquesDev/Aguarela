"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Aguarela = Aguarela || {};

Aguarela.main = function () {
  return {
    init: function init(selector) {
      typeof selector == 'undefined' && (selector = '');
      $(selector + '[data-script]').not('[data-auto-init="false"]').each(function (index, elem) {
        var data = $(elem).data(),
            script = data.script;
        if (!Aguarela[script]) return;

        if (typeof Aguarela[script] === 'function') {
          var obj = new Aguarela[script]();
          obj.init(elem, data);
        } else if (_typeof(Aguarela[script]) === 'object') {
          Aguarela[script].init(elem, data);
        }
      });
    }
  };
}();

document.addEventListener('DOMContentLoaded', function () {
  Aguarela.main.init();
});