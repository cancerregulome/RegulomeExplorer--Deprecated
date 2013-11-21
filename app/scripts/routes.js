/*global define*/

define([
    'jquery',
    'backbone',
    'views/application'
], function ($, Backbone, AppView) {
    'use strict';

    var Router = Backbone.Router.extend({
        routes: {
        	'' : 'openApplication'
        },
        openApplication : function() {
        	var appView = new AppView({
        		el : $('body')
        	});
        	appView.render();
        }

    });

    return Router;
});