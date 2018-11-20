let Aguarela = Aguarela || {};

Aguarela.main = (() => {

    return {
        init: (selector) => {
            (typeof selector == 'undefined') && (selector = '');

            $(selector + '[data-script]').not('[data-auto-init="false"]').each((index, elem) => {
                const data = $(elem).data(),
                      script = data.script;

                if (!Aguarela[script]) return;

                if (typeof Aguarela[script] === 'function') {
                    const obj = new Aguarela[script];
                    obj.init(elem, data);
                } else if (typeof Aguarela[script] === 'object') {
                    Aguarela[script].init(elem, data);
                }
            });
        }
    }
}) ();

document.addEventListener('DOMContentLoaded', () => {

    // Matches polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
        const matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
        };
    }

    // Includes polyfill
    if (!Array.prototype.includes) {
        Array.prototype.includes = function() {
            'use strict';
            return Array.prototype.indexOf.apply(this, arguments) !== -1;
        };
    }

    // Nodelist forEach polyfill
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (let i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
        };
    }

    // Closest polyfill
    if (!Element.prototype.closest) Element.prototype.closest = function(s) {
        let el = this,
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