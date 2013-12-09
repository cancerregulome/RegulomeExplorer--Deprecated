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
            "click .signin": "toggleModal"
        },

        toggleModal: function() {
            this.$el.modal('toggle');
            return false;
        },

        afterRender: function() {
            var self = this;
            var addAuthProviders = function(json) {
                _.each(json.providers, function(provider) {
                    var sign_in_view = new SignInView({
                        "provider": provider
                    });
                    self.$el.find(".modal-body").append(sign_in_view.render().el);
                    self.$signInModal.find(".signout-all").click(function() {
                        sign_in_view.signout();
                    });
                    if (provider.id == "google") {
                        if (provider.active) self.$el.find(".requires-google-oauth").show();
                        sign_in_view.on("signout", function() {
                            self.$el.find(".requires-google-oauth").hide();
                        });
                    }
                });
            };

            // prepare sign in process in case of 403 (Forbidden)
            var signInProcessStart = _.once(function() {
                $.ajax({
                    url: "svc/auth/providers",
                    type: "GET",
                    dataType: "json",
                    success: function(json) {
                        addAuthProviders(json);
                        _this.$signInModal.modal("show");
                        _this.$signInModal.find(".signout-all").click();
                    }
                });
            });

            $(document).ajaxError(function(event, request) {
                if (request.status == 403) signInProcessStart();
            });

            $.ajax({
                url: "svc/auth/whoami",
                method: "GET",
                context: this,
                success: addAuthProviders
            });
        }
    });

    return SignInView;
});