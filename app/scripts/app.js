define([
    'jquery',
    'underscore',
    'backbone',
    'routes',
    'mediator-js'
], function ($, _, Backbone, Routes, Mediator) {
    'use strict';

function loadApplicationView(){
	 var appView = new AppView({
                    //always inject the container element into the view
                    el : $('body')
                });
                    //call the render function immediately.  
                    //asynchronous actions should be created after the template render
                appView.render();
}

var RE = function() {
    this.mediator = new Mediator();
    this.routes = new Routes();
    Backbone.history.start();
    loadApplicationView();
};

return RE;

});