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
            exports: 'Handlebars'
        },
        'backbone.layoutmanager': ['backbone']
    },
    paths: {
    	'mediator-js': '../bower_components/mediator-js/lib/mediator',
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        'backbone.layoutmanager' : '../bower_components/layoutmanager/backbone.layoutmanager',
        underscore: '../bower_components/underscore/underscore',
        handlebars: '../bower_components/handlebars/handlebars',
        text: '../bower_components/requirejs-text/text'
    }
});

require([
    'backbone', 'app', 'backbone.layoutmanager'
], function (Backbone, RE) {

    //Configure LayoutManager
    Backbone.Layout.configure({
        prefix: 'views/templates/',
        paths: {
            layout: 'views/templates/layouts/',
            template: 'views/templates/'
        },
        manage: true
    });

    window.RE = new RE();
});
