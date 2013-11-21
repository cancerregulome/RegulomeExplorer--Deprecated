define([
    'jquery',
    'underscore',
    'backbone',
    'routes',
    'mediator-js'
], function ($, _, Backbone, Routes, Mediator) {
    'use strict';

var RE = function() {
    this.mediator = new Mediator();
    this.routes = new Routes();
    Backbone.history.start();
};

return RE;

});