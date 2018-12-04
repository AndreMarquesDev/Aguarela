"use strict";

var Aguarela = Aguarela || {};

Aguarela.mainNav = function () {
  return {
    init: function init(element) {
      var view = this;
      view.el = element;
      view.events();
    },
    events: function events() {
      var view = this;
      view.el.querySelector('.mainNav__menuIcon').addEventListener('click', view.openMenu.bind(view));
    },
    openMenu: function openMenu() {
      var view = this;
      view.el.classList.toggle('open');
      document.querySelector('body').classList.toggle('noScroll');
    }
  };
};