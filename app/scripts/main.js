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
        },
        d3 : {
          exports: 'd3'  
        },
        vq : {
            deps : [
                    'd3'
                ],
            exports: 'vq'
        },
        circvis: {
            deps : ['vq'],
            exports : 'vq'
        },
    },
    paths: {
        //base libraries
        underscore: '../bower_components/underscore/underscore',
        jquery: '../bower_components/jquery/jquery',
        //backbone
        backbone: '../bower_components/backbone/backbone',
        layoutmanager : '../bower_components/layoutmanager/backbone.layoutmanager',
        //logic
        'mediator-js': '../bower_components/mediator-js/lib/mediator',
        //vis
        d3 : '../bower_components/d3/d3',
        vq : '../bower_components/visquick/vq',
        circvis : '../bower_components/visquick/vq.circvis',

        handlebars: '../bower_components/handlebars/handlebars',

        text: '../bower_components/requirejs-text/text',
        json: '../bower_components/requirejs-plugins/src/json',
        propertyParser : '../bower_components/requirejs-plugins/propertyParser'
    }
});

require([
    'jquery', 'underscore', 'backbone', 'app', 'layoutmanager'
], function ($, _ , Backbone, RE, layoutmanager ) {

    //Configure LayoutManager
    Backbone.Layout.configure({
        //all templates are relative to this path
        prefix: 'app/scripts/views/templates/',
        //treat all Backbone Views as Layouts
        manage: true
    });

    window.RE = new RE();
    //inject Backbone, jQuery, Underscore as global objects.
    window.Backbone = Backbone;
    window.$ = window.jQuery = $;
    window._ = _;
});
