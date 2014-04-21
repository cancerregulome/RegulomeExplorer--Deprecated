define([
    'jquery',
    'underscore',
    'backbone',
    'routes',
    'views/application',
    'mediator'
], function ($, _, Backbone, Routes, AppView, Mediator) {
    'use strict';

function loadApplicationView(){
	 var appView = new AppView({
                    //always inject the container element into the view
                    el : $('body')
                });
                    //call the render function immediately.  
                    //asynchronous actions should be created after the template render
                appView.render();
                return appView;
}

var RE = function() {
    var appView;
    this.mediator = Mediator();
    this.routes = new Routes();
    
    this.start = function() {
        appView = loadApplicationView();
        Backbone.history.start({pushState: false});
    };

    this.printWarning = function(text) {
        appView.showWarning(text);
    };
    this.printError = function(text) {
        appView.showError(text);
    };
    this.setTopMenu = function(view) {
        appView.setView('#navbar-controls', view).render();
    };
    this.clearTopMenu = function() {
         appView.removeView('#navbar-controls');
    };

    //force application to update itself.  useful for localstorage, IndexDB, etc.
    this.version = 'v0.0.1';
};

return RE;

});