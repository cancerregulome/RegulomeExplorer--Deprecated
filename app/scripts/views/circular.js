
define([
    'jquery',
    'underscore',
    'backbone',
    'views/base',
    'helpers/circvis_helper',
    'vq',
    'circvis'
], function ($, _, Backbone, BaseView, CircvisConfigFactory, vq, Circvis) {

    var CircularView = BaseView.extend({
    	//the template file is defined relative to the path /app/scripts/templates
        // see main.js to modify this configuration
        template: 'circular.hbs',
        
        //afterRender is executed immediately after the view's document fragment is injected into the DOM.
        //This is the first opportunity to select, modify, or attach handlers to the view's DOM fragment
        afterRender: function() {
            var factory = CircvisConfigFactory.container('.circvis-container').data().rings([{}]);
            var circvis = new vq.CircVis(factory.config());
            circvis();
        }
    });

    return CircularView;
});