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
				Object.defineProperty(Array.prototype, 'includes', {
				  enumerable: false,
				  value: function(obj) {
					  var newArr = this.filter(function(el) {
						return el == obj;
					  });
					  return newArr.length > 0;
					}
				});
			}

			if (!String.prototype.includes) {
				String.prototype.includes = function(search, start) {
					typeof start !== 'number' && (start = 0);

					if (start + search.length > this.length) return false;
					else return this.indexOf(search, start) !== -1;
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

            // Dataset polyfill
			if (!document.documentElement.dataset && (!Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'dataset') || !Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'dataset').get)) {
				const descriptor = {}
				descriptor.enumerable = true;
				descriptor.get = function get() {
					const element = this,
						map = {},
						attributes = this.attributes;

					function toUpperCase(n0) {
						return n0.charAt(1).toUpperCase();
					}

					function getter() {
						return this.value;
					}

					function setter(name, value) {
						if (typeof value !== 'undefined') this.setAttribute(name, value)
						else this.removeAttribute(name);
					}

					for (let i = 0; i < attributes.length; i++) {
						const attribute = attributes[i];

						// This test really should allow any XML Name without
						// colons (and non-uppercase for XHTML)

						if (attribute && attribute.name && (/^data-\w[\w-]*$/).test(attribute.name)) {
							const name = attribute.name,
								value = attribute.value;

							// Change to CamelCase

							const propName = name.substr(5).replace(/-./g, toUpperCase);

							Object.defineProperty(map, propName, {
								enumerable: descriptor.enumerable,
								get: getter.bind({ value: value || '' }),
								set: setter.bind(element, name)
							});
						}
					}
					return map;
				}

				Object.defineProperty(HTMLElement.prototype, 'dataset', descriptor)
            }

        }

    }

});