define([
	'jquery',
	'underscore',
	'slickgrid',
	'backbone',
	'helpers/data_source_helper',
	'slickgrid_rowselectionmodel'
], function($, _, Slick, Backbone, DataSourceHelper) {
'use strict';

//initialize (assuming this is imported as SlickHelper):
// var grid = new SlickHelper('selector', modifiedCollection, options);

// modifiedCollection - a modified Backbone collection.  Includes the methods "getItemMetadata(index)", "getItem(index)", "getLength()"

// options - SlickHelper expects a configuration object to be passed in. see the defaults below.
// config is the individual column configuration object. specified at https://github.com/mleibman/SlickGrid/wiki/Column-Options
// {
// 	columns: {
// 		order: ['prop1', 'prop2', ...],
// 		sortedColumn: ['prop1'],
// 		sortedColumnAsc: true,
//		config: {
//			'prop1' : { width: 105 },
//			'prop2' : { width: 35, defaultSortAsc: true },
//			'prop3' : { width: 60, formatter:  prettifyProp3 },
//			...
//		}
// }

	// defaults
	var order = [
		'value',
		'label',
		// 'gene',
		// 'source'
		'chr',
		'start',
		'end'
	];

	var columnConfigObj = {
		'gene' : { width: 105 },
		'chr' : { width: 35, defaultSortAsc: true },
		'source' : { width: 60 },
		'end' : { formatter:  prettifyChrEndFormatter },
		'value' : { width: 105 }
	};

	function prettifyChrEndFormatter(row, cell, value, columnDef, dataContext) {
		return DataSourceHelper.formatChrEnd(value);
	}

	function labelize(term) {
		var label = window[window.app].FFHelper.idToLabel(term);
		if (label !== term) {
			return label;
		} else {
			return capitalize(term);
		}
	}

	// capitalize - utility function
	// trim and split whitespace, capitalize each token, join with whitespace
	function capitalize(term) {
		var tokens = term.replace(/^\s\s*/, '').replace(/\s\s*$/, '').split(' ');
		return tokens.map(function(token) {
			return token[0].toUpperCase() + token.substring(1).toLowerCase(0);
		}).join(' ');
	}

	function waitingFormatter(value) {
		return 'loading...';
	}

	// create the rendering function. a closure to 
	function createRenderGraph(valuesIdField) {
	
		return function renderGraph(cellNode, row, dataContext, colDef) {
			// pass Sparkline.render 3 parameters
			// target DOM element/selector
			// array of data
			// optional parameters (order of data and labels for bar chart)
			var data = _.values( dataContext[valuesIdField] ).sort(ascNumericalSort);
			var options = {};
			var cardinality = _.uniq(data, true).length;
			if (cardinality <= 3) {
				var counts = _.countBy(data, function(val) {
					return val;
				});
				// TODO re-order by Value (eg. Wildtype, Mutated, NA)
				var formattedCounts = DataSourceHelper.decorateDataArray(dataContext['source'], counts);
				data = formattedCounts.data;
				options.offset = formattedCounts.offset;
			}
			SparklineHelper.render(cellNode, data, options);
		};
	}

	function ascNumericalSort(num1,num2) {
		return (num1 === num2 ? 0 : (num1 > num2 ? 1 : -1));
	}

	function numericalSort(num1, num2, isAsc) {
		var sign = isAsc ? 1 : -1;
		return ascNumericalSort(num1, num2) * sign;
	}

	//cols is object passed to SlickGrid onSort
	function createComparator(cols) {
		return function(dataRow1, dataRow2) {
			for (var i = 0, l = cols.length; i < l; i++) {
				var field = cols[i].sortCol.field;
				var value1 = dataRow1.get(field),
					value2 = dataRow2.get(field);
				var result = numericalSort(value1, value2, cols[i].sortAsc);
				if (result !== 0) {
					return result;
				}
			}
			return 0;
		};
	}

	var SlickGridConfig = function(selector, collection, options) {
		this.grid = undefined;
		this.columns = [];
		this.options = {};
		this.init(selector, collection, options);
	};

	_.extend(SlickGridConfig.prototype, Backbone.Events);

	SlickGridConfig.prototype.gridConfig = function() {
		return {
			enableCellNavigation: true,
			enableColumnReorder: false,
			multiColumnSort: true,
			disableHiddenCheck: true,
			forceFitColumns: true
		};
	},

	SlickGridConfig.prototype.columnConfig = function(columns, options) {
		var self = this;
		var _order = this.columnOptions.order;
		var orderCols = _.intersection(_order, columns );
		var columnConfig = self.columnOptions.config || {}
		return _.map(orderCols, function(col) {
			return _.extend({
				id: col,
				name: labelize(col),
				field: col,
				sortable: true,
				resizable: true
			}, columnConfig[col] || {} );
		});
	},

	// add a column to the grid that graphs an array of data.  The array of data is stored in the model's field
	SlickGridConfig.prototype.addGraphColumn = function(value_field_id, graph_column_id) {
		this.grid.setOptions({
			enableAsyncPostRender: true
		});
		var col_config = {
			id: graph_column_id,
			name: labelize(graph_column_id),
			field: graph_column_id,
			asyncPostRender: createRenderGraph(value_field_id),
			rerenderOnResize: true,
			formatter: waitingFormatter,
			sortable: false,
			width: 150
		};
		var columnDefinitions = this.grid.getColumns();
		columnDefinitions.push(col_config);
		this.grid.setColumns(columnDefinitions);
	},

	SlickGridConfig.prototype.afterInit = function(matrixCollection) {
		var self = this;

		// this.addGraphColumn('values', 'Graph');
		this.grid.setSelectionModel(new Slick.RowSelectionModel());

		matrixCollection.comparator = createComparator([
			{
				sortCol: {
					field: this.columnOptions.sortedColumn || order[0]
				}, 
				sortAsc: this.columnOptions.sortedColumnAsc || false
			}
		]);
		matrixCollection.sort();
		self.grid.setSortColumn( this.columnOptions.sortedColumn || order[0], true);
		self.grid.invalidate();

		this.grid.onSort.subscribe(function(e, args) {
			var cols = args.sortCols;
			matrixCollection.comparator = createComparator(cols);
			matrixCollection.sort();
			self.grid.invalidate();
		});
		 this.grid.onSelectedRowsChanged.subscribe(function() {
               var row_ids = self.grid.getSelectedRows();
               self.trigger('select', row_ids.map(function(id) { return matrixCollection.at(id);} ));
            });
	},

	SlickGridConfig.prototype.init = function(selector, collection, options) {
		$(selector).empty();
		options = options || {};
		this.options = this.gridConfig();
		this.columnOptions = options.columns || { order: order, config: columnConfigObj };
		this.columns = this.columnConfig(collection.getColumns());
		this.grid = new Slick.Grid(selector, collection, this.columns, this.options);
		this.afterInit(collection);
	},


	SlickGridConfig.prototype.update = function() {

	}

	return SlickGridConfig;

});