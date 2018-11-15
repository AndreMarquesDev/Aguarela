const Aguarela = Aguarela || {};

Aguarela.imageSlider = (() => {

    return {

        init: function (element) {
            const view = this;
                view.el = $(element);
                view.variables();
                view.events();
                view.initSlider();
        },

        variables: function () {
            const view = this;

            view.sliderContainer = view.el.find('.imageSlider__sliderContainer');

        },

        events: function () {
            const view = this;

            //view.menuIcon.addEventListener('click', view.initSlider.bind(view));

        },

        initSlider: function () {
            const view = this;

            view.sliderContainer.slick({
                slidesToShow: 3,
                centerMode: true,
                // centerPadding: '300px'
                // adaptiveHeight: true
                variableWidth: true
            })

        }
    }

});