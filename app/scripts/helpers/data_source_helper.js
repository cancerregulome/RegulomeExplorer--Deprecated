define([
	'underscore'
], function( _ ) {

var sourceMaps = {
	'GNAB' : {
		order : {
			// order of displayed categories with be [1st, 2nd, 3rd]
			first: ['Wildtype', 'Mutated'],
			// order of displayed categories with be [next to last, last] 
			last: ['NA']
		},
		dictionary : {
			0 : 'Wildtype',
			1 : 'Mutated',
			'NA' : 'NA'
		}
	}
};

var DataSourceHelper =  {

	decorateDataArray : function(sourceType, data) {
			var labeledData = this.prettifyLabels(sourceType, data);
			var sortedData = this.sortLabeledData(sourceType, labeledData);
			var offset = _.object( _.range(0, sortedData[0].length), sortedData[0]);
			return {
				offset: offset,
				data : sortedData[1]
			};
	},

	formatChrEnd: function(value) {
		if (value < 0) {
			return '';
		} else {
			return (value);
		}
	},

	replaceValues: function(sourceType, simpleValueArray) {
		var returnArray = simpleValueArray;
		if ( sourceType && sourceMaps[ sourceType ] ) {
			var map = sourceMaps[ sourceType ];
			returnArray = _.map(simpleValueArray, function(val) {
				if (map.dictionary[val]) {
					return map.dictionary[val];
				} else {
					return val;
				}
			});
		}
		return returnArray;
	},

	// countObj is an Object containing single objects.
	// member object is a single (key, value) 
	// 			keys is the Data Value 
	//			value is the count of that Data Value 
	// example:  { 0: 543, 1: 20, NA: 94 }
	prettifyLabels: function (sourceType, labeledData) {

		//if there is a definition of how to relabel and order the source type (like GNAB)
		if ( sourceType && sourceMaps[ sourceType ] ) {
			var map = sourceMaps[ sourceType ];
			var copy = _.clone(labeledData);

			if ( map.dictionary ) {
				_.forEach( map.dictionary, function(val, key) {
					if ( copy[key] !== undefined && val !== key ) {
						copy[val] = copy[key];
						delete copy[key];
					}
				});
			}
			return copy;
		}
		return labeledData;
	},

	sortLabeledData: function (sourceType, labeledData) {

		if ( (sourceType && sourceMaps[ sourceType ]) ) {
			var map = sourceMaps[ sourceType ];
			var pairArray = _.pairs(labeledData);
			var labels = _.map( pairArray, function(dataPair) { return dataPair[0]; } );
			var data = _.map( pairArray, function(dataPair) { return dataPair[1]; } );
			if ( map.order ) {
				if (map.order.first ) {
					_.forEach( map.order.first.reverse(), function(val) { 
						if ( labeledData[val] !== undefined ) {
							var index = labels.indexOf(val);
							labels.splice(index,1);
							labels.unshift(val);
							data.splice(index,1);
							data.unshift(labeledData[val]);
						}
					});
				}
				if ( map.order.last ){
					_.forEach( map.order.last, function(val) { 
						if ( labeledData[val] !== undefined ) {
							var index = labels.indexOf(val);
							labels.splice(index,1);
							labels.push(val);
							data.splice(index,1);
							data.push(labeledData[val]);
						}
					});
				}
			}
			return [labels, data];
		}
		return [ _.keys(labeledData), _.values(countObj)];
	}	
};

return DataSourceHelper;

});