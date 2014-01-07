
define([
    'jquery',
    'underscore',
    'backbone',
    'views/base',
    'slickgrid'
], function ($, _, Backbone, BaseView, Slick) {

    var GridView = BaseView.extend({
    	//the template file is defined relative to the path /app/scripts/templates
        // see main.js to modify this configuration
        template: 'grid.hbs',

        subscription : {
            'search:term:selected' : 'consoleLog'
        },

        defaults: {
            grid: {
                enableCellNavigation: true,
                enableColumnReorder: false
            }
        },

        initialize: function(options) {
            this.gridOptions = _.extend(this.defaults.grid, options.grid || {});
        },
        
        //afterRender is executed immediately after the view's document fragment is injected into the DOM.
        //This is the first opportunity to select, modify, or attach handlers to the view's DOM fragment
        afterRender: function() {
            var grid = Slick.Grid(this.$el.find('.slickgrid_container'), this.collection, columns, this.gridOptions);
            var circvis = new vq.CircVis(factory.config());
            circvis();

            this.mediator.subscribe("search:term:selected", function(term) {
                console.log("term selected: " + term);
            }, null, this);
        },

        consoleLog : function(term) {
                console.log("term selected: " + term);
            }
    });

    return CircularView;
});