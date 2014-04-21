define([
	'underscore',
	'views/base'
], function( _, BaseView ) {
'use strict'

var DashboardView = BaseView.extend({

	template: 'dashboard.hbs'

});

return DashboardView;
});