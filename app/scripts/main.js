/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        handlebars: {
            exports: 'Handlebars',
            init: function() {
                this.Handlebars = Handlebars;
                return this.Handlebars;
            }
        }
    },
    paths: {
        'mediator-js': '../bower_components/mediator-js/lib/mediator',
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        'layoutmanager' : '../bower_components/layoutmanager/backbone.layoutmanager',
        underscore: '../bower_components/underscore/underscore',
        handlebars: '../bower_components/handlebars/handlebars',
        text: '../bower_components/requirejs-text/text'
    }
});

require([
    'jquery', 'underscore', 'backbone', 'app', 'layoutmanager'
], function ($, _ , Backbone, RE, layoutmanager ) {

    //Configure LayoutManager
    Backbone.Layout.configure({
        prefix: 'app/scripts/views/templates/',
        manage: true
    });

    window.RE = new RE();
    window.Backbone = Backbone;
    window.$ = window.jQuery = $;
    window._ = _;
});
