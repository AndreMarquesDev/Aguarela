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

            view.container = view.el.querySelectorAll('.imageComparison__container');

        },

        initComparison: function () {
            const view = this;

            const compareImages = img => {
                let clicked = false;

                // get the width and height of the img element
                const slideButton = img.previousElementSibling,
                    imageWidth = img.offsetWidth,
                    imageHeight = img.offsetHeight;

                img.style.width = (imageWidth / 2) + 'px';

                // position the slider in the middle:
                slideButton.style.top = (imageHeight / 2) - (slideButton.offsetHeight / 2) + 'px';
                slideButton.style.left = (imageWidth / 2) - (slideButton.offsetWidth / 2) + 'px';

                const slideReady = event => {
                    event.preventDefault();
                    clicked = true;
                    window.addEventListener('mousemove', slideMove);
                    window.addEventListener('touchmove', slideMove);
                }

                const slideFinish = () => clicked = false;

                const slideMove = event => {
                    let cursorPosition;

                    if (!clicked) return false;

                    // get the cursor's x position:
                    (event = event || window.event) && (cursorPosition = event.pageX - img.getBoundingClientRect().left - window.pageXOffset);

                    // prevent the slider from being positioned outside the image:
                    cursorPosition < 0
                        ? cursorPosition = 0
                        : cursorPosition > imageWidth && (cursorPosition = imageWidth);

                    img.style.width = cursorPosition + 'px';
                    slideButton.style.left = img.offsetWidth - (slideButton.offsetWidth / 2) + 'px';
                }

                slideButton.addEventListener('mousedown', slideReady);
                slideButton.addEventListener('touchstart', slideReady);
                window.addEventListener('mouseup', slideFinish);
                window.addEventListener('touchstop', slideFinish);

            }

            view.el.querySelectorAll('.imageComparison__overlayedImage').forEach(element => compareImages(element));

        }

    }

});