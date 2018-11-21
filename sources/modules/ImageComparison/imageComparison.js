const Aguarela = Aguarela || {};

Aguarela.imageComparison = (() => {

    return {

        init: function (element) {
            const view = this;
                view.el = element;

                view.variables();
                view.initComparison();
        },

        variables: function () {
            const view = this;

            view.overlayImage = view.el.querySelectorAll('.img-comp-overlay');

        },

        initComparison: function () {
            const view = this;

            const compareImages = img => {
                var slider, img, clicked = 0;

                // get the width and height of the img element
                const imageWidth = img.offsetWidth,
                    imageHeight = img.offsetHeight;

                // set the width of the img element to 50%:
                img.style.width = (imageWidth / 2) + 'px';

                slider = document.createElement('div');
                slider.classList.add('img-comp-slider');
                img.parentElement.insertBefore(slider, img);

                // position the slider in the middle:
                slider.style.top = (imageHeight / 2) - (slider.offsetHeight / 2) + 'px';
                slider.style.left = (imageWidth / 2) - (slider.offsetWidth / 2) + 'px';

                const slideReady = event => {
                    event.preventDefault();
                    // the slider is now clicked and ready to move:
                    clicked = 1;
                    // execute a function when the slider is moved:
                    window.addEventListener('mousemove', slideMove);
                    window.addEventListener('touchmove', slideMove);
                }

                const slideFinish = () => /* the slider is no longer clicked: */ clicked = 0;

                const slideMove = event => {
                    var pos;
                    // if the slider is no longer clicked, exit this function:
                    if (clicked == 0) return false;
                    // get the cursor's x position:
                    pos = getCursorPos(event)
                    // prevent the slider from being positioned outside the image:
                    if (pos < 0) pos = 0;
                    if (pos > imageWidth) pos = imageWidth;
                    // execute a function that will resize the overlay image according to the cursor:
                    slide(pos);
                }

                const getCursorPos = event => {
                    var a, x = 0;
                    event = event || window.event;
                    // get the x positions of the image:
                    a = img.getBoundingClientRect();
                    // calculate the cursor's x coordinate, relative to the image:
                    x = event.pageX - a.left;
                    // consider any page scrolling:
                    x = x - window.pageXOffset;
                    return x;
                }

                const slide = x => {
                    // resize the image:
                    img.style.width = x + 'px';
                    // position the slider:
                    slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + 'px';
                }

                // execute a function when the mouse button is pressed:
                slider.addEventListener('mousedown', slideReady);
                slider.addEventListener('touchstart', slideReady);
                window.addEventListener('mouseup', slideFinish);
                window.addEventListener('touchstop', slideFinish);

            }

            // once for each 'overlay' element:
            // pass the 'overlay' element as a parameter when executing the compareImages function:
            view.overlayImage.forEach(element => compareImages(element));

        }

    }

});