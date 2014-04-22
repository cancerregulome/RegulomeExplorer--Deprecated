/*global require*/
'use strict';

require.config({
    baseUrl: 'scripts',
    paths: {
        //base libraries
        underscore: '../bower_components/underscore/underscore',
        jquery: '../bower_components/jquery/dist/jquery',
        'jQuery-ui': '../bower_components/jquery-ui/ui/jquery-ui',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',

        //backbone
        backbone: '../bower_components/backbone/backbone',
        'backbone.layoutmanager': '../bower_components/layoutmanager/backbone.layoutmanager',

        //localstorage
        localstoragedb: '../bower_components/localStorageDB/localstoragedb',

        //vis
        d3: '../bower_components/d3/d3',
        vq: '../bower_components/visquick/vq',
        circvis: '../bower_components/visquick/vq.circvis',
        'jquery.sparkline': '../bower_components/kapusta-jquery.sparkline/dist/jquery.sparkline',

        filter: '../bower_components/crossfilter/crossfilter',
        carve: '../bower_components/carve/carve',
        'vislegend': 'views/seqpeek/vis/jquery.vislegend',

        'mediator-js': '../bower_components/mediator-js/mediator.min',

        //datagrid
        slickcore: '../bower_components/slickgrid/slick.core',
        slickgrid: '../bower_components/slickgrid/slick.grid',
        slickgrid_rowselectionmodel: '../bower_components/slickgrid/plugins/slick.rowselectionmodel',
        "jquery-drag": "../bower_components/slickgrid/lib/jquery.event.drag-2.2",

        handlebars: '../bower_components/handlebars/handlebars',

        text: '../bower_components/requirejs-text/text',
        json: '../bower_components/requirejs-plugins/src/json',
        propertyParser: '../bower_components/requirejs-plugins/src/propertyParser',
    },
    shim: {
        'jQuery-ui': ['jquery'],
        'vislegend': ['jquery'],

        'backbone.layoutmanager': ['backbone'],

        bootstrap: {
            deps: ['jquery', 'jQuery-ui'],
            exports: 'bootstrap'
        },
        handlebars: {
            exports: 'Handlebars',
            init: function() {
                this.Handlebars = Handlebars;
                return this.Handlebars;
            }
        },
        "jquery-drag": ['jQuery-ui'],
        slickgrid: {
            deps: [
                "jquery-drag",
                "slickcore"
            ],
            exports: 'Slick'
        },
        slickgrid_rowselectionmodel: {
            deps: [
                'slickgrid'
            ],
            exports: 'Slick'
        },
        'localstoragedb': {
            exports: 'localStorageDB',
            init: function() {
                this.localStorageDB = localStorageDB;
                return this.localStorageDB;
            }
        }
    },

});

require([
    'jquery', 'underscore', 'backbone', 'bootstrap', 'app', 'backbone.layoutmanager'
], function($, _, Backbone, Bootstrap, App) {

    //Configure LayoutManager
    Backbone.Layout.configure({
        //all templates are relative to this path
        prefix: 'app/scripts/views/templates/',
        //treat all Backbone Views as Layouts
        manage: true,
        suppressWarnings: true
    });

    window.app = "RE";
    window[window.app] = new App();
    //inject Backbone, jQuery, Underscore as global objects.
    window.Backbone = Backbone;
    window.$ = window.jQuery = $;
    window._ = _;

    window[window.app].start();
});