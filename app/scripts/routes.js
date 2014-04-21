/*global define*/

define([
    'underscore',
    'jquery',
    'backbone',
    'views/dashboard',
    'views/circular',
    'views/grid',
    'views/filters/base_filter',
    'collections/matrix'
], function (_, $, Backbone, DashboardView, CircularView, GridView, FilterView, MatrixCollection) {
    'use strict';

    var Router = Backbone.Router.extend({
            routes: {
                '' : 'openApplication',
                'circle' : 'openCircular',
                'grid' : 'openGrid',
                'filters' : 'openFilter'
            },
            openApplication : function() {
               $('#mainPanel').empty();
               var dashboardView = new DashboardView( { el: $('#mainPanel') } );
               dashboardView.render();
               window[window.app].clearTopMenu();
               $('body').addClass('dashboard');
            },
            openCircular : function () {
                var circularView = new CircularView({
                    el : $('#mainPanel')
                });
                circularView.render();
            },
            openGrid : function() {
                var gridView = new GridView ({
                    el: $('#mainPanel'),
                    collection: new MatrixCollection( [], {
                        url : 'svc/datastores/20140404/BRCA/feature_matrix?gene=KRAS&gene=TP53&gene=akr1c4&gene=ccnd1'
                    })
                });
                gridView.render();
            },
            openFilter: function() {
                var filterView = new FilterView ({
                    el:$('#mainPanel')
                });
                filterView.render();
            }
        });

    return Router;
});