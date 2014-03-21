/*global require*/
'use strict';

require.config({
    baseUrl: "/scripts",
    shim: {
         'jQuery-ui' : ['jquery'],

        bootstrap :  ['jquery','jQuery-ui'],

        handlebars: {
            exports: 'Handlebars',
            init: function() {
                this.Handlebars = Handlebars;
                return this.Handlebars;
            }
        },
        slickgrid: {
            deps: [
            '../bower_components/slickgrid/slick.core',
            'jquery', 
            'jQuery-ui',
            '../bower_components/slickgrid/lib/jquery.event.drag-2.2'
            ],
            exports : 'Slick'
        },
        slickgrid_rowselectionmodel: {
            deps: [
            'slickgrid'
            ],
            exports : 'Slick'
        }
    },
    paths: {
        //base libraries
        underscore: '../bower_components/underscore/underscore',
        jquery: '../bower_components/jquery/dist/jquery',
        'jQuery-ui': '../bower_components/jquery-ui/ui/jquery-ui',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',

        //backbone
        backbone: '../bower_components/backbone/backbone',
        'backbone.layoutmanager' : '../bower_components/layoutmanager/backbone.layoutmanager',

        //logic
        'mediator-js': '../bower_components/mediator-js/lib/mediator',
        
        //vis
        d3 : '../bower_components/d3/d3',
        vq : '../bower_components/visquick/vq',
        circvis : '../bower_components/visquick/vq.circvis',
        'jquery.sparkline' : '../bower_components/kapusta-jquery.sparkline/dist/jquery.sparkline',

        //datagrid
        slickgrid: '../bower_components/slickgrid/slick.grid',
        slickgrid_rowselectionmodel: '../bower_components/slickgrid/plugins/slick.rowselectionmodel',

        handlebars: '../bower_components/handlebars/handlebars',

        //localstorage
        localstoragedb: '../bower_components/localStorageDB/localstoragedb',

        text: '../bower_components/requirejs-text/text',
        json: '../bower_components/requirejs-plugins/src/json',
        propertyParser : '../bower_components/requirejs-plugins/src/propertyParser'
    }
});

require([
   'jquery',
   'underscore',
   'backbone',
   'app',
   'bootstrap',
   'backbone.layoutmanager'
], function ($, _ , Backbone, App, Bootstrap, layoutmanager ) {
 'use strict';

    Backbone.Router.namedParameters = true;
    
    Backbone.emulateJSON = true;
  //Configure LayoutManager
    Backbone.Layout.configure({
        //all templates are relative to this path
        prefix: 'app/scripts/views/templates/',
        //treat all Backbone Views as Layouts
        manage: true,
        suppressWarnings: true
    });
    
    window.app = 'RE';
    window[window.app] = new App();
    //inject Backbone, jQuery, Underscore as global objects.
    window.Backbone = Backbone;
    window.$ = window.jQuery = $;
    window._ = _;

    window[window.app].start();
});
