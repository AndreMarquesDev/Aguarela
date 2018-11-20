const Aguarela = Aguarela || {};

Aguarela.imageSlider = (() => {

    return {

        init: function (element) {
            const view = this;
                view.$el = $(element);
                view.el = element;

                view.initSlider();
                view.playWhenVisible();
        },

        initSlider: function () {
            const view = this;

            view.sliderContainer = view.$el.find('.imageSlider__sliderContainer');

            view.sliderContainer.slick({
                slidesToShow: 3,
                centerMode: true,
                variableWidth: true
            }).on('beforeChange', () => {
                !!view.el.querySelector('.slick-current video') && view.el.querySelector('.slick-current video').pause();
            }).on('afterChange', () => {
                (!!view.el.querySelector('.slick-current video') && window.innerWidth > 767) && view.el.querySelector('.slick-current video').play();
            });

        },

        playWhenVisible: function () {
            const view = this;
            let video,
                wasPaused = false;

            const isInViewport = (element) => {
                const elementTop = element.getBoundingClientRect().top + element.offsetHeight,
                    elementBottom = elementTop + element.offsetHeight,
                    viewportTop = window.scrollY,
                    viewportBottom = viewportTop + window.innerHeight;
                return elementBottom > viewportTop && elementTop < viewportBottom;
            };

            const startVideo = () => {
                video = view.el.querySelector('.slick-current video');
                if (video && window.innerWidth > 767) isInViewport(video) ? video.play() : video.pause();
            }

            // Don't autoplay video if it was paused at least once, wether by user click or any other cause
            if (view.el.querySelector('video')) view.el.querySelectorAll('video').forEach(element => {
                element.addEventListener('pause', (event) => {
                    !!event.target.closest('.slick-current') && (wasPaused = true)
                })
            });

            window.addEventListener('resize', () => !wasPaused && startVideo())
            window.addEventListener('scroll', () => !wasPaused && startVideo())

        }

    }

});