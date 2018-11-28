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

            // Stop Youtube videos from autoplaying on init except for currentSlide (because the 'autoplay' option might be in the url unintendedly)
            view.sliderContainer.on('init', () => {
                view.el.querySelectorAll('iframe').forEach(element => {
                    element.closest('.slick-current')
                        ? window.innerWidth > 767 && view.playYoutube(element)
                        : view.pauseYoutube(element);
                });
            });

            view.sliderContainer.slick({
                slidesToShow: 3,
                centerMode: true,
                variableWidth: true
            }).on('beforeChange', () => {
                !!view.el.querySelector('.slick-current video') && view.el.querySelector('.slick-current video').pause();
                !!view.el.querySelector('.slick-current iframe') && view.pauseYoutube(view.el.querySelector('.slick-current iframe'));
            }).on('afterChange', () => {
                !!view.el.querySelector('.slick-current video') && window.innerWidth > 767 && view.el.querySelector('.slick-current video').play();
                !!view.el.querySelector('.slick-current iframe') && window.innerWidth > 767 && view.playYoutube(view.el.querySelector('.slick-current iframe'));
            });

        },

        playYoutube: (video) => {
            const videoURL = video.getAttribute('src');
            video && !/autoplay=1/i.test(videoURL) && video.setAttribute('src', videoURL.replace('autoplay=0', 'autoplay=1'));
        },

        pauseYoutube: (video) => {
            const videoURL = video.getAttribute('src');
            video && /autoplay=1/i.test(videoURL) && video.setAttribute('src', videoURL.replace('autoplay=1', 'autoplay=0'));
        },

        playWhenVisible: function () {
            const view = this;
            let video,
                iframe,
                iframeURL,
                wasAutoplayed = false,
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
                if (video && window.innerWidth > 767) isInViewport(video)
                    ? video.play()
                    : video.pause();

                iframe = view.el.querySelector('.slick-current iframe');
                iframeURL = iframe && iframe.getAttribute('src');

                if (iframe && window.innerWidth > 767) isInViewport(iframe)
                    ? !wasAutoplayed && (iframe.setAttribute('src', iframeURL.replace('autoplay=0', 'autoplay=1')), wasAutoplayed = true, console.log(iframeURL, wasAutoplayed))
                    : /autoplay=1/i.test(iframeURL) && (iframe.setAttribute('src', iframeURL.replace('autoplay=1', 'autoplay=0')), wasAutoplayed = true, console.log('not today', wasAutoplayed));
            }

            // Don't autoplay video if it was paused at least once, wether by user click or any other cause
            if (view.el.querySelector('video')) view.el.querySelectorAll('video').forEach(element => {
                element.addEventListener('pause', event => {
                    !!event.target.closest('.slick-current') && (wasPaused = true)
                })
            });

            window.addEventListener('resize', () => !wasPaused && startVideo())
            window.addEventListener('scroll', () => !wasPaused && startVideo())

        }

    }

});