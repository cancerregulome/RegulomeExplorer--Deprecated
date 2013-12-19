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
}

var RE = function() {
    this.mediator = Mediator();
    this.routes = new Routes();
    
    this.start = function() {
        loadApplicationView();
        Backbone.history.start({pushState: false});
    };

};

return RE;

});