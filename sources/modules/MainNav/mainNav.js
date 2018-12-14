const Aguarela = Aguarela || {};

Aguarela.mainNav = (() => {

    return {

        init(element) {
            const view = this;
            view.el = element;

            view.events();
        },

        events() {
            const view = this;

            view.el.querySelector('.mainNav__menuIcon').addEventListener('click', view.openMenu.bind(view));

        },

        openMenu() {
            const view = this;

            view.el.classList.toggle('open');
            document.querySelector('body').classList.toggle('noScroll');

        }
    }

});