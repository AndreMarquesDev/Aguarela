const Aguarela = Aguarela || {};

Aguarela.mainNav = (() => {

    return {

        init: function(element) {
            const view = this;
            view.el = element;

            view.events();
        },

        events: function() {
            const view = this;

            view.el.querySelector('.mainNav__menuIcon').addEventListener('click', view.openMenu.bind(view));

        },

        openMenu: function() {
            const view = this;

            view.el.classList.toggle('open');
            document.querySelector('body').classList.toggle('noScroll');

        }
    }

});