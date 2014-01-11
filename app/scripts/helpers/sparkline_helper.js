define([
'jquery',
'underscore',
'helpers/data_source_helper',
'jquery.sparkline',
], function( $, _, DataSourceHelper ) {

	var defaults = {
		width: '100%'
	};

	function renderSparkline (el, data, formatOptions) {
		var options = _.defaults( {}, defaults );
		var cardinality = _.uniq(data, true).length;
		if (cardinality <= 3) {
			_.extend(options, {
				type : 'bar',
				zeroAxis: false,
				chartRangeMin: 0,
				tooltipFormat: '{{offset:offset}} - {{value}}',
				tooltipValueLookups: { 'offset': formatOptions.offset || {} },
				colorMap : [ 'blue', 'orange', 'grey' ]
			});
		} else {
			data = _.filter(data, function(val) { return _.isFinite(val); });
			_.extend(options, {
				type : 'line',
				minSpotColor: '',
				maxSpotColor: '',
				spotColor: ''
			});
		}
		$(el).empty().sparkline(data, options);
	}
		
	return {
		render : renderSparkline
	};
});