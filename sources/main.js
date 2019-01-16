'serviceWorker' in navigator && navigator.serviceWorker.register('serviceWorker.js');

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

            console.log('%c| 🔧 Developed by AndreMarquesDev ✏️ Designed by Aguarela Project |', 'background: #000; color: #fff;');
            console.log('%c| https://github.com/AndreMarquesDev |', 'background: #000; color: #fff;');
            console.log('%c| https://codepen.io/AndreMarquesDev/ |', 'background: #000; color: #fff;');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => Aguarela.main().init());