define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'backbone.layoutmanager'
], function ($, _, Backbone, JST) {
    'use strict';

    var BaseView = Backbone.Layout.extend({
        el: false,
        manage: true,
        fetchTemplate: function(path) {
            return JST[path];
        },

        constructor: function() {
            Backbone.Layout.apply(this,arguments);
        }

    });

    return BaseView;
});