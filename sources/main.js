const Aguarela = Aguarela || {};

Aguarela.main = () => {

    return {
        init(selector) {
            Aguarela.utils().init();

            (typeof selector == 'undefined') && (selector = '');

            document.querySelectorAll(`${selector}[data-script]:not([data-auto-init="false"])`).forEach(element => {
                const script = element.dataset.script;

                if (!Aguarela[script]) return;

                if (typeof Aguarela[script] === 'function') {
                    const scriptsObject = new Aguarela[script];
                    scriptsObject.init(element);
                } else if (typeof Aguarela[script] === 'object') Aguarela[script].init(element);
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => Aguarela.main().init());