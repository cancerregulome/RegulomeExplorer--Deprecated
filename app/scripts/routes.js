/*global define*/

define([
    'underscore',
    'jquery',
    'backbone',
    'views/application',
    'views/circular',
    'views/grid',
    'collections/matrix'
], function (_, $, Backbone, AppView, CircularView, GridView, MatrixCollection) {
    'use strict';

    var Router = Backbone.Router.extend({
            routes: {
                '' : 'openApplication',
                'circle' : 'openCircular',
                'grid' : 'openGrid'
            },
            openApplication : function() {
               
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
                        url : 'svc/datastores/ds/BRCA-SEQ-20131113/feature_matrix?gene=KRAS&gene=TP53&gene=akr1c4&gene=ccnd1'
                    })
                });
                gridView.render();
            }
        });

    return Router;
});