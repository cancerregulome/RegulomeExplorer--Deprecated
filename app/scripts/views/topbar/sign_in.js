
define([
    'jquery',
    'underscore',
    'backbone',
    'views/base'
], function ($, _, Backbone, BaseView) {

    var SignInView = BaseView.extend({
    	//the template file is defined relative to the path /app/scripts/templates
    	// see main.js to modify this configuration
        template: 'topbar/sign_in.hbs',

        initialize: function(options) {
            _.extend(this, options);
            _.bindAll(this, "signout");
        },

        afterRender: function () {

            if (this.provider.user && this.provider.user.pic) {
                this.$el.find(".user-pic").show();
            }

            if (this.provider.active) {
                this.$el.find(".user-details").show();
                this.$el.find(".signin-link").hide();
            } else {
                this.$el.find(".signin-link").show();
                this.$el.find(".user-details").hide();
            }
        },

        serialize: function () {
            return this.provider;
        },

        signout: function() {
            $.ajax({
                url:"svc/auth/signout/" + this.provider.id,
                method:"GET",
                context: this,
                success:function () {
                    this.provider.user = null;
                    this.provider.active = false;
                    this.refresh();
                    this.trigger("signout");
                }
            });
        }
        
    });

    return SignInView;
});