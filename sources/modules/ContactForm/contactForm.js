const Aguarela = Aguarela || {};

Aguarela.contactForm = (() => {

    return {

        init: function(element) {
            const view = this;
            view.el = element;

            view.variables();
            view.formHandler();
        },

        variables: function() {
            const view = this;

            view.form = view.el.querySelector('form');
            view.iframe = view.el.querySelector('iframe');
            view.formNotification = view.el.querySelector('.formNotification');

        },

        formHandler: function() {
            const view = this;
            let formSubmitted = false;

            view.form.addEventListener('submit', () => formSubmitted = true);
            view.iframe.addEventListener('load', () => {
                if (formSubmitted) {
                    view.formNotification.classList.add('success');
                    view.formNotification.innerHTML = view.formNotification.dataset.success;
                    setTimeout(() => {
                        view.form.reset();
                        view.formNotification.classList.remove('success');
                    }, 5000);
                }
            });

        }
    }

});