
define([
    'jquery',
    'underscore',
    'backbone',
    'views/base'
], function ($, _, Backbone, BaseView) {

    var AboutLinkView = BaseView.extend({
    	//the template file is defined relative to the path /app/scripts/templates
    	// see main.js to modify this configuration
        template: 'topbar/about_link.hbs',
        
    });

    return AboutLinkView;
});