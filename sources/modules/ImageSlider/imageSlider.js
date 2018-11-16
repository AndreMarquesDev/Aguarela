const Aguarela = Aguarela || {};

Aguarela.imageSlider = (() => {

    return {

        init: function (element) {
            const view = this;
                view.el = $(element);
                view.ele = element;

                view.initSlider();
                view.teste();
        },

        initSlider: function () {
            const view = this;

            view.sliderContainer = view.el.find('.imageSlider__sliderContainer');

            view.sliderContainer.on('init', () => {
                // Autoplay if video is the active slide
                (!!view.el.find('.slick-current video').length && window.innerWidth > 767) && view.el.find('.slick-current video')[0].play()
            });

            view.sliderContainer.slick({
                slidesToShow: 3,
                centerMode: true,
                variableWidth: true
            }).on('beforeChange', () => {
                (!!view.el.find('.slick-current video').length) && view.el.find('.slick-current video')[0].pause();
            }).on('afterChange', () => {
                (!!view.el.find('.slick-current video').length && window.innerWidth > 767) && view.el.find('.slick-current video')[0].play();
            });

        },

        teste: function () {
            const view = this;
            let coiso;

            !!view.ele.querySelector('.coiso') && (coiso = view.ele.querySelector('.coiso'));

             const isElementInViewport = el => {

                const elViewportPosition = el.getBoundingClientRect();

                return (
                    elViewportPosition.top >= 0 &&
                    elViewportPosition.left >= 0 &&
                    elViewportPosition.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    elViewportPosition.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            }

            const onVisibilityChange = (el, callback) => {
                let visible;
                return () => {
                    if (isElementInViewport(el) !== visible) {
                        visible = isElementInViewport(el);
                        (typeof callback == 'function') && callback();
                    }
                }
            }

            const isVisible = onVisibilityChange(coiso, () => {
                console.log('ta?')
            });

            if (window.addEventListener && !!coiso) {
                addEventListener('DOMContentLoaded', isVisible, false);
                addEventListener('load', isVisible, false);
                addEventListener('scroll', isVisible, false);
                addEventListener('resize', isVisible, false);
            }

        }
    }

});