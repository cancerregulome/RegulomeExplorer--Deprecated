define([
    'jquery',
    'underscore',
    'backbone',
    'views/base',
    'views/topbar/sign_in'
], function($, _, Backbone, BaseView, SignInView) {

    var SignInModal = BaseView.extend({
        //the template file is defined relative to the path /app/scripts/templates
        // see main.js to modify this configuration
        template: 'topbar/sign_in_modal.hbs',

        afterRender: function() {
            var self = this;
            var addAuthProviders = function(json) {
                _.each(json.providers, function(provider) {
                    var signInView = new SignInView({
                        'provider': provider
                    });
                    self.$el.find('.modal-body').append(signInView.render().el);
                    self.$el.find('.signout-all').click(function() {
                        signInView.signout();
                    });
                    if (provider.id === 'google') {
                        if (provider.active) self.$el.find('.requires-google-oauth').show();
                        signInView.on('signout', function() {
                            self.$el.find('.requires-google-oauth').hide();
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
                        self.$el.modal('show');
                        self.$el.find('.signout-all').click();
                    }
                });
            });
            
            $(document).ajaxError( function(event, request) {
                if (request.status === 403) signInProcessStart();
            });

            $.when( $.ajax( { url: 'svc/auth/whoami', method: 'GET'} ) )
                .done(addAuthProviders)
                .fail(function () {
                    return false;
                });
           
        }
    });

    return SignInModal;
});