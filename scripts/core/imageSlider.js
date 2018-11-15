"use strict";

var Aguarela = Aguarela || {};

Aguarela.imageSlider = function () {
  return {
    init: function init(element) {
      var view = this;
      view.el = $(element);
      view.variables();
      view.events();
      view.initSlider();
    },
    variables: function variables() {
      var view = this;
      view.sliderContainer = view.el.find('.imageSlider__sliderContainer');
    },
    events: function events() {
      var view = this; //view.menuIcon.addEventListener('click', view.initSlider.bind(view));
    },
    initSlider: function initSlider() {
      var view = this;
      view.sliderContainer.slick({
        slidesToShow: 3,
        centerMode: true,
        // centerPadding: '300px'
        // adaptiveHeight: true
        variableWidth: true
      });
    }
  };
};