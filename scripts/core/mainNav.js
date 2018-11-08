"use strict";

var Aguarela = Aguarela || {};

Aguarela.mainNav = function () {
  return {
    init: function init(element) {
      var view = this;
      view.el = element;
      view.variables();
      view.events();
    },
    variables: function variables() {
      var view = this;
      view.menuIcon = view.el.querySelector('.iconAguarela-menu');
    },
    events: function events() {
      var view = this;
      view.menuIcon.addEventListener('click', view.openMenu.bind(view));
    },
    openMenu: function openMenu() {
      var view = this;

      if (view.menuIcon.classList.contains('iconAguarela-menu')) {
        view.menuIcon.classList.remove('iconAguarela-menu');
        view.menuIcon.classList.add('iconAguarela-cross');
      } else {
        view.menuIcon.classList.remove('iconAguarela-cross');
        view.menuIcon.classList.add('iconAguarela-menu');
      }

      view.el.classList.toggle('open');
      document.querySelector('body').classList.toggle('noScroll');
    }
  };
};