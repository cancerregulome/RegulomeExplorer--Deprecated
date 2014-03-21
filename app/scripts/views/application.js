
define([
    'views/base',
    'views/topbar/topbar'
], function (BaseView, TopbarView) {

    var ApplicationView = BaseView.extend({
    	//the template file is defined relative to the path /app/scripts/templates
    	// see main.js to modify this configuration
        template: 'application.hbs',

        beforeRender: function () {
            this.setView('#navigation-container', new TopbarView());
        },
        
        //afterRender is executed immediately after the view's document fragment is injected into the DOM.
        //This is the first opportunity to select, modify, or attach handlers to the view's DOM fragment
        afterRender: function() {
        	console.log('Application: Render complete.');
        }
    });

    return ApplicationView;
});