
define([
    'jquery',
    'underscore',
    'backbone',
    'views/base',
    'helpers/slickgrid_helper'
], function ($, _, Backbone, BaseView, SlickHelper) {

    var GridView = BaseView.extend({
    	//the template file is defined relative to the path /app/scripts/templates
        // see main.js to modify this configuration
        template: 'grid.hbs',

        defaults: {
        },

        initialize: function(options) {
            _.bindAll(this, 'updateGrid');
        },
        
        //afterRender is executed immediately after the view's document fragment is injected into the DOM.
        //This is the first opportunity to select, modify, or attach handlers to the view's DOM fragment
        afterRender: function() {
            var self = this;
            this.collection.fetch().done(self.updateGrid);
            
        },

        updateGrid: function() {
            var slick = new SlickHelper();
            slick.init('.slickgrid_container', this.collection);
        }

    });

    return GridView;
});