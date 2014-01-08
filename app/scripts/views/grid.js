
define([
    'jquery',
    'underscore',
    'backbone',
    'views/base',
    'slickgrid',
    'helpers/slickgrid_helper'
], function ($, _, Backbone, BaseView, Slick, SlickHelper) {

    var GridView = BaseView.extend({
    	//the template file is defined relative to the path /app/scripts/templates
        // see main.js to modify this configuration
        template: 'grid.hbs',

        defaults: {
        },

        initialize: function(options) {
            _.bindAll(this, 'updateSlickGrid');
            this.gridOptions = _.extend( SlickHelper.gridConfig(), options.grid || {} );
        },
        
        //afterRender is executed immediately after the view's document fragment is injected into the DOM.
        //This is the first opportunity to select, modify, or attach handlers to the view's DOM fragment
        afterRender: function() {
            var self = this;
            this.collection.fetch().done(self.updateSlickGrid);
            
        },

        updateSlickGrid: function() {
            var columns = SlickHelper.columnConfig(this.collection.getColumns());
            var grid = new Slick.Grid(this.$el.find('.slickgrid_container'), this.collection, columns, this.gridOptions);
            SlickHelper.afterInit(grid, this.collection);
        }

    });

    return GridView;
});