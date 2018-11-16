"use strict";

var Aguarela = Aguarela || {};

Aguarela.imageSlider = function () {
  return {
    init: function init(element) {
      var view = this;
      view.el = $(element);
      view.ele = element;
      view.initSlider();
      view.teste();
    },
    initSlider: function initSlider() {
      var view = this;
      view.sliderContainer = view.el.find('.imageSlider__sliderContainer');
      view.sliderContainer.on('init', function () {
        // Autoplay if video is the active slide
        !!view.el.find('.slick-current video').length && window.innerWidth > 767 && view.el.find('.slick-current video')[0].play();
      });
      view.sliderContainer.slick({
        slidesToShow: 3,
        centerMode: true,
        variableWidth: true
      }).on('beforeChange', function () {
        !!view.el.find('.slick-current video').length && view.el.find('.slick-current video')[0].pause();
      }).on('afterChange', function () {
        !!view.el.find('.slick-current video').length && window.innerWidth > 767 && view.el.find('.slick-current video')[0].play();
      });
    },
    teste: function teste() {
      var view = this;
      var coiso;
      !!view.ele.querySelector('.coiso') && (coiso = view.ele.querySelector('.coiso'));

      var isElementInViewport = function isElementInViewport(el) {
        var elViewportPosition = el.getBoundingClientRect();
        return elViewportPosition.top >= 0 && elViewportPosition.left >= 0 && elViewportPosition.bottom <= (window.innerHeight || document.documentElement.clientHeight) && elViewportPosition.right <= (window.innerWidth || document.documentElement.clientWidth);
      };

      var onVisibilityChange = function onVisibilityChange(el, callback) {
        var visible;
        return function () {
          if (isElementInViewport(el) !== visible) {
            visible = isElementInViewport(el);
            typeof callback == 'function' && callback();
          }
        };
      };

      var isVisible = onVisibilityChange(coiso, function () {
        console.log('ta?');
      });

      if (window.addEventListener && !!coiso) {
        addEventListener('DOMContentLoaded', isVisible, false);
        addEventListener('load', isVisible, false);
        addEventListener('scroll', isVisible, false);
        addEventListener('resize', isVisible, false);
      }
    }
  };
};