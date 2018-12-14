const Aguarela = Aguarela || {};

Aguarela.utils = (() => {

    return {

        init() {
            const view = this;

            view.polyfills();
        },

        polyfills() {
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
        }

    }

});