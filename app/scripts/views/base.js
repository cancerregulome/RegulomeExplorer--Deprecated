
define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'layoutmanager'
], function ($, _, Backbone, JST) {

    var BaseView = Backbone.Layout.extend({
        manage: true,
        fetchTemplate: function(path) {
            return JST[path];
        }
    });

    return BaseView;
});