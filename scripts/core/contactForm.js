"use strict";

var Aguarela = Aguarela || {};

Aguarela.contactForm = function () {
  return {
    init: function init(element) {
      var view = this;
      view.el = element;
      view.variables();
      view.formHandler();
    },
    variables: function variables() {
      var view = this;
      view.form = view.el.querySelector('form');
      view.iframe = view.el.querySelector('iframe');
      view.formNotification = view.el.querySelector('.formNotification');
    },
    formHandler: function formHandler() {
      var view = this;
      var formSubmitted = false;
      view.form.addEventListener('submit', function () {
        return formSubmitted = true;
      });
      view.iframe.addEventListener('load', function () {
        if (formSubmitted) {
          view.formNotification.classList.add('success');
          view.formNotification.innerHTML = view.formNotification.dataset.success;
          setTimeout(function () {
            view.form.reset();
            view.formNotification.classList.remove('success');
          }, 5000);
        }
      });
    }
  };
};