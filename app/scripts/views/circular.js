
define([
    'jquery',
    'underscore',
    'backbone',
    'views/application',
    'vq',
    'helpers/circvis_helper',
    'circvis'
], function ($, _, Backbone, AppView, vq, CircvisConfigFactory) {

    var CircularView = AppView.extend({
    	//the template file is defined relative to the path /app/scripts/templates
    	// see main.js to modify this configuration
        template: 'application.hbs',
        
        //afterRender is executed immediately after the view's document fragment is injected into the DOM.
        //This is the first opportunity to select, modify, or attach handlers to the view's DOM fragment
        afterRender: function() {
            CircvisConfigFactory.data().rings([{}]);
        }
    });

    return CircularView;
});