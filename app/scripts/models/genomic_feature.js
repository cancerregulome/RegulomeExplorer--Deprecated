
define([
    'underscore',
    'backbone',
    'models/base_feature'
], function (_, Backbone, BaseFeature) {

	var attributeList = ['chr','start'];
	var rectifyList = [   //from	:    to
						{ 'chromosome' : 'chr' }
					];

	var GenomicFeature = BaseFeature.extend({

		clean : function(obj, options) {
			var pairs = _.pairs(obj);
			var attr;
			var rectifiedPairs = _.map(pairs, function(pair) {
				attr = pair[0].toLowerCase();
				if (rectifyList[attr] === undefined) {
					return [attr, pair[1]];
				} else {
					return [rectifyList[attr], pair[1]];
				}
			});
			return _.object(rectifiedPairs);
		}

	});



	//utility function that determines if this is the proper model to use.

	GenomicFeature.isGenomic =  function(attrs) {
		var lcAttrs = _.invoke(attrs, 'toLowerCase');
		if ( _.intersection(lcAttrs, [ 'chr', 'chromosome'] ).length === 0  ) {
	   		return false;
	   } else {
	   		return true;
	   }

	};

	return GenomicFeature;
});
