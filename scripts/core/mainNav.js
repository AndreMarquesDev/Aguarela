"use strict";

var Aguarela = Aguarela || {};

Aguarela.mainNav = function () {
  return {
    init: function init(element, data) {
      var view = this;
      view.el = $(element);
      view.variables();
      view.dummy();
    },
    variables: function variables() {
      var view = this;
    },
    dummy: function dummy() {
      var view = this;
      console.log('mainNav');
    }
  };
};