
define([
    'jquery',
    'underscore',
    'backbone',
    'layoutmanager'
], function ($, _, Backbone) {

    var BaseView = Backbone.Layout.extend({
    	manage: true,
        fetchTemplate: function(path) {
        	return JST[path];
        }
    });

    return BaseView;
});