"use strict";

var Aguarela = Aguarela || {};

Aguarela.imageComparison = function () {
  return {
    init: function init(element) {
      var view = this;
      view.el = element;
      view.variables();
      view.initComparison();
    },
    variables: function variables() {
      var view = this;
      view.sliderButton = view.el.querySelectorAll('.imageComparison__sliderButton');
    },
    initComparison: function initComparison() {
      var view = this;
      view.sliderButton.forEach(function (sliderButton) {
        var sliderButtonWidth = sliderButton.getBoundingClientRect().width,
            imageBefore = sliderButton.nextElementSibling,
            imageBeforeWidth = imageBefore.getBoundingClientRect().width;
        var mouseDown = false,
            mousePosition; // IE and Edge 'clip' fallback, since clip-path is not supported

        imageBefore.style.clip = "rect(0px, ".concat(imageBeforeWidth / 2, "px, 9999px, 0px)");
        imageBefore.style.clipPath = "inset(0 ".concat(imageBeforeWidth / 2, "px 0 0)");
        sliderButton.style.left = "".concat(imageBeforeWidth / 2 - sliderButtonWidth / 2, "px");
        sliderButton.addEventListener('mousedown', function (event) {
          mousePosition = event.clientX;
          mouseDown = true;
        });
        sliderButton.addEventListener('touchstart', function (event) {
          mousePosition = event.touches[0].clientX;
          mouseDown = true;
        });
        sliderButton.addEventListener('mouseup', function () {
          return mouseDown = false;
        });
        sliderButton.addEventListener('touchend', function () {
          return mouseDown = false;
        });
        sliderButton.addEventListener('mouseout', function () {
          return mouseDown = false;
        });
        sliderButton.addEventListener('mousemove', function (event) {
          if (mouseDown) {
            var sliderButtonPosition = parseInt(sliderButton.style.left);
            sliderButton.style.left = "".concat(sliderButtonPosition + (event.clientX - mousePosition), "px");
            mousePosition = event.clientX; // IE and Edge 'clip' fallback, since clip-path is not supported

            imageBefore.style.clip = "rect(0px, ".concat(sliderButton.getBoundingClientRect().width / 2 + sliderButtonPosition, "px, ").concat(sliderButton.getBoundingClientRect().height, "px, 0px)");
            imageBefore.style.clipPath = "inset(0 ".concat(imageBefore.getBoundingClientRect().width - sliderButtonPosition - sliderButton.getBoundingClientRect().width / 2, "px 0 0)");
          }
        });
        sliderButton.addEventListener('touchmove', function (event) {
          if (mouseDown) {
            var sliderButtonPosition = parseInt(sliderButton.style.left);
            sliderButton.style.left = "".concat(sliderButtonPosition + (event.touches[0].clientX - mousePosition), "px");
            mousePosition = event.touches[0].clientX; // IE and Edge 'clip' fallback, since clip-path is not supported

            imageBefore.style.clip = "rect(0px, ".concat(sliderButton.getBoundingClientRect().width / 2 + sliderButtonPosition, "px, ").concat(sliderButton.getBoundingClientRect().height, "px, 0px)");
            imageBefore.style.clipPath = "inset(0 ".concat(imageBefore.getBoundingClientRect().width - sliderButtonPosition - sliderButton.getBoundingClientRect().width / 2, "px 0 0)");
          }
        });
      });
    }
  };
};