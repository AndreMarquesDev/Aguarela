"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

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
  // Matches polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;

      while ((_readOnlyError("i"), --i) >= 0 && matches.item(i) !== this) {}

      return i > -1;
    };
  } // Includes polyfill


  if (!Array.prototype.includes) {
    Array.prototype.includes = function () {
      'use strict';

      return Array.prototype.indexOf.apply(this, arguments) !== -1;
    };
  } // Nodelist forEach polyfill


  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;

      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  } // Closest polyfill


  if (!Element.prototype.closest) Element.prototype.closest = function (s) {
    var el = this,
        ancestor = this;
    if (!document.documentElement.contains(el)) return null;

    do {
      if (ancestor.matches(s)) return ancestor;
      ancestor = ancestor.parentElement;
    } while (ancestor !== null);

    return null;
  };
  Aguarela.main.init();
});