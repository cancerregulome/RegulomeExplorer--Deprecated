module React from 'react';

module _ from 'underscore';

import {
    GridRow
}
from './GridRow.react.js';

import {
    GridHeader
}
from './GridHeader.react.js';

// Inequality function map for the filtering
const operators = {
    '<': (x, y) => x < y,
    '<=': (x, y) => x <= y,
    '>': (x, y) => x > y,
    '>=': (x, y) => x >= y,
    '==': (x, y) => x === y,
    'abs >=': (x,y) => Math.abs(x) >= y
};

class _GridView {
    getInitialState() {
        return {
            items: this.props.initialItems || [],
            sort: this.props.config.sort || {
                column: '',
                order: ''
            },
            columns: this.props.config.columns
        };
    }

    componentWillReceiveProps(nextProps) {
        // Load new data when the data property changes.
        if (nextProps.data !== this.props.data) {
            this.setState({
                items: nextProps.data
            });
        }
    }

    handleFilterTextChange(column) {
        return (newValue) => {
            var obj = this.state.columns;
            obj[column].filterText = newValue;

            // Since we have already mutated the state, just call forceUpdate().
            // Ideally we'd copy and setState or use an immutable data structure.
            this.forceUpdate();
        };
    }

    columnNames() {
        return Object.keys(this.state.columns);
    }

    sortColumn(column) {
        return (event) => {
            var newSortOrder = (this.state.sort.order === 'asc') ? 'desc' : 'asc';

            if (this.state.sort.column !== column) {
                newSortOrder = this.state.columns[column].defaultSortOrder;
            }

            this.setState({
                sort: {
                    column: column,
                    order: newSortOrder
                }
            });
        };
    }

    sortClass(column) {
        var ascOrDesc = (this.state.sort.order === 'asc') ? 'headerSortAsc' : 'headerSortDesc';
        return (this.state.sort.column === column) ? ascOrDesc : '';
    }

    render() {
        var rows = [];

        var columnNames = this.columnNames();
        var filters = {};

        var operandRegex = /^((?:(?:[<>]=?)|==))\s*([-]?\d+(?:\.\d+)?)$/;

        columnNames.forEach((column) => {
            var filterText = this.state.columns[column].filterText;
            filters[column] = null;

            if (filterText.length > 0) {
                var operandMatch = operandRegex.exec(filterText);
                if (operandMatch && operandMatch.length === 3) {
                    //filters[column] = Function.apply(null, ['x', 'return x ' + operandMatch[1] + ' ' + operandMatch[2]]);
                    filters[column] = (function(match) {
                        return (x) => operators[match[1]](x, match[2]);
                    })(operandMatch);
                } else {
                    filters[column] = (x) => (x !== null ? x.toString().toLowerCase().indexOf(filterText.toLowerCase()) > -1 : false);
                }
            }
        }, this);

        var filteredItems = _.filter(this.state.items, (item) =>
            _.every(columnNames, (c) => (!filters[c] || filters[c](item[c])))
        );

        var sortedItems = _.sortBy(filteredItems, this.state.sort.column);

        if (this.state.sort.order === 'desc') {
            sortedItems.reverse();
        }

        var filterLink = (column) => {
            return {
                value: this.state.columns[column].filterText,
                requestChange: this.handleFilterTextChange(column).bind(this)
            };
        };

        var columnConfig = columnNames.map((c) => {
            return {
                id: c,
                name: this.state.columns[c].name,
                sortFn: this.sortColumn(c).bind(this),
                sortClass: this.sortClass(c),
                filterLink: filterLink(c)
            };
        });


        var visibleColumnProps = columnConfig.filter( (c) => !this.state.columns[c.id].hidden );

        var visibleColumnNames = visibleColumnProps.map((c) => c.id);

        var visibleColumnConfig = visibleColumnNames.map( (c) => {
            return _.extend( {id: c}, this.state.columns[c] );
            });

        sortedItems.forEach((item, idx) => {
            //render repeat header at requested interval
            var headerRepeat = parseInt(this.props.headerRepeat, 10);
            if ((this.props.headerRepeat > 0) &&
                (idx > 0) &&
                (idx % this.props.headerRepeat === 0)) {

                rows.push(new GridHeader({
                    config: visibleColumnProps,
                    extra: true
                }));
            }
            //render row of values
            rows.push(new GridRow({
                item: item,
                columns: visibleColumnConfig,
                onClick: (e, item) => console.info(item)
            }));
        });

        return React.DOM.table({
            cellSpacing: 0,
            className: 'table-sortable'
        }, [
            new GridHeader({
                config: visibleColumnProps
            }),
            React.DOM.tbody(null, rows)
        ]);
    }
}


export
const GridView = React.createClass(_GridView.prototype);