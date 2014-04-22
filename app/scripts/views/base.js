define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'module_mediator',
    'backbone.layoutmanager'
], function ($, _, Backbone, JST, ModuleMediator) {
    'use strict';

    var BaseView = Backbone.Layout.extend({
        el: false,
        manage: true,
        fetchTemplate: function(path) {
            return JST[path];
        },

        constructor: function() {
            Backbone.Layout.apply(this,arguments);
            this.mediator = ModuleMediator();
            var subs = this.subscriptions;
            for (var key in this.subscriptions) {
                if (typeof this[subs[key]] === 'function') this.mediator.subscribe(key, this[subs[key]], null, null);
            }

        }

    });

    return BaseView;
});