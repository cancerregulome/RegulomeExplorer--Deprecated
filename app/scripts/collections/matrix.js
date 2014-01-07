
define([
    'underscore',
    'backbone',
    'models/genomic_feature',
    'models/generic_feature',
], function (_, Backbone, GenomicFeature, GenericFeature) {

var MatrixCollection = Backbone.Collection.extend({

	initialize : function() {
		_.bindAll(this, 'getItem', 'getLength');
	},

	isGenomic : true,
   
   //support several similar row/model types
   model: function(attrs, options) {
   		// do any attriubtes smell like genomic data.
   		// names like: chr, Chr, CHR, chromosome
	   
	   var isGenomic = true;

	   if ( GenomicFeature.isGenomic(attr) ) {
	   	return new GenomicFeature(attr, options);
	   } else {
	   	this.isGenomic = false;
	   	return new GenericFeature(attr, options);
	   }
   },


   // Slick.Grid DataView API requires two functions:
   // getItem returns the Item at the specified index
	getItem : function(index) {
		return this.at(index);
	},

	// getLength returns the total length of the collection
	getLength : function() {
		return this.length;
	}


});

    return MatrixCollection;
});