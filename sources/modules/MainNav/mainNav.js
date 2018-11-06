const Aguarela = Aguarela || {};

Aguarela.mainNav = (() => {

    return {

        init: function (element, data) {
            const view = this;
                view.el = $(element);
                view.variables();
                view.dummy();
        },

        variables: function () {
            const view = this;
        },

        dummy: function () {
            const view = this;

            console.log('mainNav');
        }
    }

});