const Aguarela = Aguarela || {};

Aguarela.imageComparison = (() => {

    return {

        init: function (element) {
            const view = this;
                view.el = element;

                view.variables();
                view.initComparison();
                view.setContainerHeight();
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

                // set the width of the img element to 50%:
                img.style.width = (imageWidth / 2) + 'px';

                // position the slider in the middle:
                slideButton.style.top = (imageHeight / 2) - (slideButton.offsetHeight / 2) + 'px';
                slideButton.style.left = (imageWidth / 2) - (slideButton.offsetWidth / 2) + 'px';

                const slideReady = event => {
                    event.preventDefault();
                    // the slider is now clicked and ready to move:
                    clicked = true;
                    // execute a function when the slider is moved:
                    window.addEventListener('mousemove', slideMove);
                    window.addEventListener('touchmove', slideMove);
                }

                const slideFinish = () => /* the slider is no longer clicked: */ clicked = false;

                const slideMove = event => {
                    let cursorPosition;
                    // if the slider is no longer clicked, exit this function:
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

                // execute a function when the mouse button is pressed:
                slideButton.addEventListener('mousedown', slideReady);
                slideButton.addEventListener('touchstart', slideReady);
                window.addEventListener('mouseup', slideFinish);
                window.addEventListener('touchstop', slideFinish);

            }

            // once for each 'overlay' element:
            // pass the 'overlay' element as a parameter when executing the compareImages function:
            view.el.querySelectorAll('.imageComparison__overlayedImage').forEach(element => compareImages(element));

        },

        setContainerHeight: function () {
            const view = this;

            view.container.forEach(element => {
                console.log(element)
                console.log(element.offsetHeight)
            })

        }

    }

});