define([
	'jquery',
	'underscore',
	'slickgrid',
	'helpers/sparkline_helper',
	'helpers/data_source_helper',
	'slickgrid_rowselectionmodel'
], function($, _, Slick, SparklineHelper, DataSourceHelper) {
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

	var columnConfigObj = {
		'chr' : { width: 40, defaultSortAsc: false },
		'source' : { width: 60 },
		'end' : { formatter:  prettifyChrEndFormatter }
	};

	function prettifyChrEndFormatter(row, cell, value, columnDef, dataContext) {
		return DataSourceHelper.formatChrEnd(value);
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

	var SlickGridConfig = function(selector, collection) {
		this.grid = undefined;
		this.columns = [];
		this.options = {};
		this.init(selector, collection);
	};

	SlickGridConfig.prototype.gridConfig = function() {
		return {
			enableCellNavigation: false,
			enableColumnReorder: false,
			multiColumnSort: true,
			disableHiddenCheck: true
		};
	},

	SlickGridConfig.prototype.columnConfig = function(columns) {
		var cleanList = _.difference(columns, hide);
		var orderCols = _.intersection(order, cleanList);
		var otherCols = _.difference(cleanList, order);
		var wholeList = orderCols.concat(otherCols);
		return _.map(wholeList, function(col) {
			return _.extend({
				id: col,
				name: capitalize(col),
				field: col,
				sortable: true,
				resizable: true
			}, columnConfigObj[col] || {} );
		});
	},

	// add a column to the grid that graphs an array of data.  The array of data is stored in the model's field
	SlickGridConfig.prototype.addGraphColumn = function(value_field_id, graph_column_id) {
		this.grid.setOptions({
			enableAsyncPostRender: true
		});
		var col_config = {
			id: graph_column_id,
			name: capitalize(graph_column_id),
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

		this.addGraphColumn('values', 'Graph');
		this.grid.setSelectionModel(new Slick.RowSelectionModel());

		matrixCollection.comparator = createComparator([{sortCol: {field: order[0]}, sortAsc: true}]);
		matrixCollection.sort();
		self.grid.setSortColumn(order[0],true);
		self.grid.invalidate();

		this.grid.onSort.subscribe(function(e, args) {
			var cols = args.sortCols;
			matrixCollection.comparator = createComparator(cols);
			matrixCollection.sort();
			self.grid.invalidate();
		});
	},

	SlickGridConfig.prototype.init = function(selector, collection) {
		this.options = this.gridConfig();
		this.columns = this.columnConfig(collection.getColumns());
		this.grid = new Slick.Grid(selector, collection, this.columns, this.options);
		this.afterInit(collection);
	},
	SlickGridConfig.prototype.update = function() {

	}

	return SlickGridConfig;

});