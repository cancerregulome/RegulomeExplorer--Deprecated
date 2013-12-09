/*global define*/

define([
    'jquery',
    'backbone',
    'views/application',
    'views/circular'
], function ($, Backbone, AppView, CircularView) {
    'use strict';

    var Router = Backbone.Router.extend({
            routes: {
                '' : 'openApplication',
                'circle' : 'openCircular'
            },
            openApplication : function() {
               
            },
            openCircular : function () {
                var circularView = new CircularView({
                    el : $('#mainPanel')
                });
                circularView.render();
            }
        });

    return Router;
});