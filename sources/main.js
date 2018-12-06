let Aguarela = Aguarela || {};

Aguarela.main = (() => {

    return {
        init: (selector) => {
            Aguarela.utils().init();

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

document.addEventListener('DOMContentLoaded', () => Aguarela.main.init());