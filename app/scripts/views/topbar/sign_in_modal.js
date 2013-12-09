define([
    'jquery',
    'underscore',
    'backbone',
    'views/base',
    'views/topbar/sign_in'
], function($, _, Backbone, BaseView, SignInView) {

    var SignInView = BaseView.extend({
        //the template file is defined relative to the path /app/scripts/templates
        // see main.js to modify this configuration
        template: 'topbar/sign_in_modal.hbs',

        events: {
            'click .signin' : 'toggleModal'
        },

        toggleModal: function() {
            this.$modal.modal('toggle');
            return false;
        },

        afterRender: function() {
            var self = this;
            self.$modal = self.$el.find('.signin-container');
            var addAuthProviders = function(json) {
                _.each(json.providers, function(provider) {
                    var signInView = new SignInView({
                        'provider': provider
                    });
                    self.$modal.find('.modal-body').append(signInView.render().el);
                    self.$modal.find('.signout-all').click(function() {
                        signInView.signout();
                    });
                    if (provider.id === 'google') {
                        if (provider.active) self.$modal.find('.requires-google-oauth').show();
                        signInView.on('signout', function() {
                            self.$modal.find('.requires-google-oauth').hide();
                        });
                    }
                });
            };

            // prepare sign in process in case of 403 (Forbidden)
            var signInProcessStart = _.once(function() {
                $.ajax({
                    url: 'svc/auth/providers',
                    type: 'GET',
                    dataType: 'json',
                    success: function(json) {
                        addAuthProviders(json);
                        self.$modal.modal('show');
                        self.$modal.find('.signout-all').click();
                    }
                });
            });

            $(document).ajaxError(function(event, request) {
                if (request.status === 403) signInProcessStart();
            });

            $.when($.ajax({ url: 'svc/auth/whoami', method: 'GET'}))
                .done(addAuthProviders)
                .fail(function () { 
                    return false;
                });
        }
    });

    return SignInView;
});