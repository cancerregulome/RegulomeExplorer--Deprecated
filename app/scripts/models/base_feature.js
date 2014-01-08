
define([
    'underscore',
    'backbone'
], function (_, Backbone) {

	var BaseFeature = Backbone.Model.extend({

		initialize: function() {
			_.bindAll(this, 'clean');
		},

		parse : function(response, options) {
			return this.clean(response, options);
		},

		clean : function(obj, options) {
			return obj;
		}

	});

	return BaseFeature;
});
