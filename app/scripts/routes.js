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
                var appView = new AppView({
                    //always inject the container element into the view
                    el : $('body')
                });
                    //call the render function immediately.  
                    //asynchronous actions should be created after the template render
                appView.render();
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