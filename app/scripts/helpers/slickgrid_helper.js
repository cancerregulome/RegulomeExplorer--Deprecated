define([
	'underscore',
	'slickgrid',
	'slickgrid_rowselectionmodel'
], function( _, Slick ){

	var order = [
	'label',
	'source',
	'chr',
	'start',
	'end'
	];

	var hide = [
	'values',
	'gene',
	'type',
	'id',
	'modifier',
	'strand'
	];


	// capitalize - utility function
	// trim and split whitespace, capitalize each token, join with whitespace
	function capitalize(term) {
		var tokens = term.replace(/^\s\s*/, '').replace(/\s\s*$/, '').split(' ');
		return tokens.map(function(token) {
					return token[0].toUpperCase() + token.substring(1).toLowerCase(0);
				}).join(' ');
	}

	function labelize(term) {
		return capitalize(term);
	}

	var SlickGridConfig = {

		gridConfig: function() {
			return  {
                enableCellNavigation: false,
                enableColumnReorder: false,
                multiColumnSort: true,
            };
		},

		columnConfig: function(columns) {
			var cleanList = _.difference(columns, hide);
			var orderCols = _.intersection(order, cleanList);
			var otherCols = _.difference(cleanList,order);
			var wholeList = orderCols.concat(otherCols);
			return _.map(wholeList, function(col) {
				return {id: col, name: capitalize(col), field: col, sortable: true, resizable: true};
			});
		},

		afterInit: function(grid, matrixCollection) {
			grid.setSelectionModel(new Slick.RowSelectionModel());

			grid.onSort.subscribe(function (e, args) {
      			var cols = args.sortCols;

      		matrixCollection.comparator = function (dataRow1, dataRow2) {
		        for (var i = 0, l = cols.length; i < l; i++) {
		          var field = cols[i].sortCol.field;
		          var sign = cols[i].sortAsc ? 1 : -1;
		          var value1 = dataRow1.get(field), value2 = dataRow2.get(field);
		          var result = (value1 == value2 ? 0 : (value1 > value2 ? 1 : -1)) * sign;
		          if (result != 0) {
		            return result;
		          }
		        }
		        return 0;
		      };
		      matrixCollection.sort();
		      grid.invalidate();
		    });
		}

	};

	return SlickGridConfig;

});