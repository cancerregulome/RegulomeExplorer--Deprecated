
define([
    'underscore',
    'backbone',
    'models/genomic_feature',
    'models/generic_feature',
], function (_, Backbone, GenomicFeature, GenericFeature) {

var MatrixCollection = Backbone.Collection.extend({

	initialize : function(models, options) {
		_.bindAll(this, 'getItem', 'getLength', 'getColumns');
		this.url = options.url || '';
		this.columns = _.compact([]);
	},

	isGenomic : true,
   
   //support several similar row/model types
   model: function(model, options) {
   		
   	   //this function is run in the model instance.  collection scope is stored in options
   	   var self = options.collection;
	   // collect column ids from models
	   self.columns = _.union(self.columns, _.keys(model));
	   // do any attributes smell like genomic data.
	   self.isGenomic = true;
	   if ( GenomicFeature.isGenomic(model) ) {	
	   	return new GenomicFeature(model, options);
	   } else {
	   	self.isGenomic = false;
	   	return new GenericFeature(model, options);
	   }
   },

   parse: function(response) {
    return response.items;
   },

   getColumns: function() {
   	return this.columns;
   },

   // Slick.Grid DataView API requires two functions:
   // getItem returns the Item at the specified index
	getItem : function(index) {
		return _.clone(this.at(index).attributes);
	},

	// getLength returns the total length of the collection
	getLength : function() {
		return this.length;
	}


});

    return MatrixCollection;
});