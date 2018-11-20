"use strict";

var Aguarela = Aguarela || {};

Aguarela.imageSlider = function () {
  return {
    init: function init(element) {
      var view = this;
      view.$el = $(element);
      view.el = element;
      view.initSlider();
      view.playWhenVisible();
    },
    initSlider: function initSlider() {
      var view = this;
      view.sliderContainer = view.$el.find('.imageSlider__sliderContainer');
      view.sliderContainer.slick({
        slidesToShow: 3,
        centerMode: true,
        variableWidth: true
      }).on('beforeChange', function () {
        !!view.el.querySelector('.slick-current video') && view.el.querySelector('.slick-current video').pause();
      }).on('afterChange', function () {
        !!view.el.querySelector('.slick-current video') && window.innerWidth > 767 && view.el.querySelector('.slick-current video').play();
      });
    },
    playWhenVisible: function playWhenVisible() {
      var view = this;
      var video,
          wasPaused = false;

      var isInViewport = function isInViewport(element) {
        var elementTop = element.getBoundingClientRect().top + element.offsetHeight,
            elementBottom = elementTop + element.offsetHeight,
            viewportTop = window.scrollY,
            viewportBottom = viewportTop + window.innerHeight;
        return elementBottom > viewportTop && elementTop < viewportBottom;
      };

      var startVideo = function startVideo() {
        video = view.el.querySelector('.slick-current video');
        if (video && window.innerWidth > 767) isInViewport(video) ? video.play() : video.pause();
      }; // Don't autoplay video if it was paused at least once, wether by user click or any other cause


      if (view.el.querySelector('video')) view.el.querySelectorAll('video').forEach(function (element) {
        element.addEventListener('pause', function (event) {
          !!event.target.closest('.slick-current') && (wasPaused = true);
        });
      });
      window.addEventListener('resize', function () {
        return !wasPaused && startVideo();
      });
      window.addEventListener('scroll', function () {
        return !wasPaused && startVideo();
      });
    }
  };
};