define([
		'underscore',
		'slickgrid',
		'slickgrid_rowselectionmodel'
	], function(_, Slick) {

		var order = [
			'label',
			'source',
			'chr',
			'start',
			'end',
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

		function waitingFormatter(value) {
			return "wait...";
		}

		function renderGraph(cellNode, row, dataContext, colDef) {

			console.log(colDef + ' ' + row);
		}

		function createComparator(cols) {
			return function(dataRow1, dataRow2) {
						for (var i = 0, l = cols.length; i < l; i++) {
							var field = cols[i].sortCol.field;
							var sign = cols[i].sortAsc ? 1 : -1;
							var value1 = dataRow1.get(field),
								value2 = dataRow2.get(field);
							var result = (value1 == value2 ? 0 : (value1 > value2 ? 1 : -1)) * sign;
							if (result != 0) {
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
				};
			},

		SlickGridConfig.prototype.columnConfig = function(columns) {
				var cleanList = _.difference(columns, hide);
				var orderCols = _.intersection(order, cleanList);
				var otherCols = _.difference(cleanList, order);
				var wholeList = orderCols.concat(otherCols);
				return _.map(wholeList, function(col) {
					return {
						id: col,
						name: capitalize(col),
						field: col,
						sortable: true,
						resizable: true
					};
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
						asyncPostRender: renderGraph,
						rerenderOnResize: true,
						formatter: waitingFormatter,
						sortable: false
					};
				var columnDefinitions = this.grid.getColumns();
				columnDefinitions.push(col_config);
				this.grid.setColumns(columnDefinitions)
			},

		SlickGridConfig.prototype.afterInit = function(matrixCollection) {
			var self = this;

				this.addGraphColumn(grid, 'values','Graph');
				this.grid.setSelectionModel(new Slick.RowSelectionModel());

				this.grid.onSort.subscribe(function(e, args) {
					var cols = args.sortCols;
					matrixCollection.comparator = createComparator(cols);
					matrixCollection.sort();
					self.grid.invalidate();
				});
			},

		SlickGridConfig.prototype.init  = function(selector, collection) {
				this.options = this.gridConfig();
	            this.columns = this.columnConfig(collection.getColumns());
	            this.grid = new Slick.Grid( selector, collection, this.columns, this.options);
	            this.afterInit(this.collection);
			},
		SlickGridConfig.prototype.update  = function() {

			}

			return SlickGridConfig;

		});