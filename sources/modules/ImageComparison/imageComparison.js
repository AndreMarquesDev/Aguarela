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

            view.sliderButton = view.el.querySelectorAll('.imageComparison__sliderButton');

        },

        initComparison: function (element) {
            const view = this;

                view.sliderButton.forEach(element => {
                    const sliderButtonWidth = element.getBoundingClientRect().width,
                        imageBefore = element.nextElementSibling,
                        width = imageBefore.getBoundingClientRect().width,
                        height = imageBefore.getBoundingClientRect().height;
                    //imageBefore.style.clip = 'rect(0px, ' + width / 2 + 'px, ' + height + 'px, 0px)';
                    // imageBefore.style.clip = 'rect(0px, ' + width / 2 + 'px, 999px, 0px)';
                    let mouseDownX = false,
                        X;

                    element.style.left = width / 2 - sliderButtonWidth / 2 + 'px';

                    element.addEventListener('mousedown', event => {
                        X = event.clientX;
                        mouseDownX = true;
                    });
                    element.addEventListener('touchstart', event => {
                        X = event.touches[0].clientX;
                        mouseDownX = true;
                    });

                    element.addEventListener('mouseup', event => mouseDownX = false);
                    element.addEventListener('touchend', event => mouseDownX = false);
                    element.addEventListener('mouseout', event => mouseDownX = false);

                    element.addEventListener('mousemove', function() {
                        if (mouseDownX) {
                            this.style.left = parseInt(this.style.left) + (event.clientX - X) + 'px';
                            X = event.clientX;
                            this.nextElementSibling.style.clip = 'rect(0px, ' + (this.getBoundingClientRect().width / 2 + parseInt(this.style.left)) + 'px, ' + this.getBoundingClientRect().height + 'px, 0px)';
                        }
                    });

                    element.addEventListener('touchmove', function(event) {
                        if (mouseDownX) {
                            this.style.left = parseInt(this.style.left) + (event.touches[0].clientX - X) + 'px';
                            X = event.touches[0].clientX;
                            this.nextElementSibling.style.clip = 'rect(0px, ' + (this.getBoundingClientRect().width / 2 + parseInt(this.style.left)) + 'px, ' + this.getBoundingClientRect().height + 'px, 0px)';
                        }
                    });

                })

                window.addEventListener('load', function(f) {
                    var sliderButtonre = document.querySelectorAll('.imageComparison__sliderButton');
                    var ii = sliderButtonre.length;
                    while (ii--) {
                        var sliderButtonWidth = sliderButtonre[ii].getBoundingClientRect().width;
                        var imageBefore = sliderButtonre[ii].nextElementSibling;
                        var width = imageBefore.getBoundingClientRect().width;
                        var height = imageBefore.getBoundingClientRect().height;
                        sliderButtonre[ii].style.left = width / 2 - sliderButtonWidth / 2 + 'px';
                        imageBefore.style.clip = 'rect(0px, ' + width / 2 + 'px, ' + height + 'px, 0px)';
                    }
                });


                window.addEventListener('resize', function(f) {
                    var sliderButtonre = document.querySelectorAll('.imageComparison__sliderButton');
                    var ii = sliderButtonre.length;
                    while (ii--) {
                        var sliderButtonWidth = sliderButtonre[ii].getBoundingClientRect().width;
                        var imageBefore = sliderButtonre[ii].nextElementSibling;
                        var width = imageBefore.getBoundingClientRect().width;
                        var height = imageBefore.getBoundingClientRect().height;
                        sliderButtonre[ii].style.left = width / 2 - sliderButtonWidth / 2 + 'px';
                        imageBefore.style.clip = 'rect(0px, ' + width / 2 + 'px, ' + height + 'px, 0px)';
                    }
                });

        },

        // init: function (element) {
        //     const view = this;
        //         view.el = element;

        //         view.variables();
        //         view.initComparison();
        // },

        // variables: function () {
        //     const view = this;

        //     view.container = view.el.querySelectorAll('.imageComparison__container');

        // },

        // initComparison: function () {
        //     const view = this;

        //     const compareImages = img => {
        //         let clicked = false;

        //         // get the width and height of the img element
        //         const slideButton = img.previousElementSibling,
        //             imageWidth = img.offsetWidth,
        //             imageHeight = img.offsetHeight;

        //         img.style.width = (imageWidth / 2) + 'px';

        //         // position the slider in the middle:
        //         slideButton.style.top = (imageHeight / 2) - (slideButton.offsetHeight / 2) + 'px';
        //         slideButton.style.left = (imageWidth / 2) - (slideButton.offsetWidth / 2) + 'px';

        //         const slideReady = event => {
        //             event.preventDefault();
        //             clicked = true;
        //             window.addEventListener('mousemove', slideMove);
        //             window.addEventListener('touchmove', slideMove);
        //         }

        //         const slideFinish = () => clicked = false;

        //         const slideMove = event => {
        //             let cursorPosition;

        //             if (!clicked) return false;

        //             // get the cursor's x position:
        //             (event = event || window.event) && (cursorPosition = event.pageX - img.getBoundingClientRect().left - window.pageXOffset);

        //             // prevent the slider from being positioned outside the image:
        //             cursorPosition < 0
        //                 ? cursorPosition = 0
        //                 : cursorPosition > imageWidth && (cursorPosition = imageWidth);

        //             img.style.width = cursorPosition + 'px';
        //             slideButton.style.left = img.offsetWidth - (slideButton.offsetWidth / 2) + 'px';
        //         }

        //         slideButton.addEventListener('mousedown', slideReady);
        //         slideButton.addEventListener('touchstart', slideReady);
        //         window.addEventListener('mouseup', slideFinish);
        //         window.addEventListener('touchstop', slideFinish);

        //     }

        //     view.el.querySelectorAll('.imageComparison__overlayedImage').forEach(element => compareImages(element));

        // }

    }

});