module React from 'react';

import _ from 'underscore';


// TableSorter Config
const CONFIG = {
    sort: {
        column: 'col2',
        order: 'desc'
    },
    columns: {
        col1: {
            name: 'Col1',
            filterText: '',
            defaultSortOrder: 'desc'
        },
        col2: {
            name: 'Col2',
            filterText: '>= 30',
            defaultSortOrder: 'desc'
        },
        col3: {
            name: 'Col3',
            filterText: 's',
            defaultSortOrder: 'desc'
        }
    }
};

// Inequality function map for the filtering
const operators = {
    '<': (x, y) => x < y,
    '<=': (x, y) => x <= y,
    '>': (x, y) => x > y,
    '>=': (x, y) => x >= y,
    '==': (x, y) => x === y
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
        // Load new data when the dataSource property changes.
        if (nextProps.dataSource !== this.props.dataSource) {
            this.loadData(nextProps.dataSource);
        }
    }

    componentWillMount() {
        this.loadData(this.props.dataSource);
    }

    loadData(dataSource) {

        if (!dataSource) {
            return;
        }

        $.get(dataSource).done((data) => {
            console.log('Received data');
            this.setState({
                items: data
            });
        }).fail((error, a, b) => console.log('Error loading JSON'));
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

        var operandRegex = /^((?:(?:[<>]=?)|==))\s?([-]?\d+(?:\.\d+)?)$/;

        columnNames.forEach((column) => {
            var filterText = this.state.columns[column].filterText;
            filters[column] = null;

            if (filterText.length > 0) {
                var operandMatch = operandRegex.exec(filterText);
                if (operandMatch && operandMatch.length === 3) {
                    //filters[column] = Function.apply(null, ['x', 'return x ' + operandMatch[1] + ' ' + operandMatch[2]]);
                    filters[column] = (function(match) {
                        return function(x) {
                            return operators[match[1]](x, match[2]);
                        };
                    })(operandMatch);
                } else {
                    filters[column] = (x) => (x.toString().toLowerCase().indexOf(filterText.toLowerCase()) > -1);
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

        var headerExtra = () => columnNames.map((c) => React.dom.th({
            className: 'header-extra'
        }, this.state.columns[c].name), this);

        var cell = (x) => columnNames.map((c) => React.dom.td(null, x[c]), this);

        sortedItems.forEach((item, idx) => {
            var headerRepeat = parseInt(this.props.headerRepeat, 10);
            if ((this.props.headerRepeat > 0) &&
                (idx > 0) &&
                (idx % this.props.headerRepeat === 0)) {

                rows.push(React.dom.tr(null, headerExtra()));
            }

            rows.push(React.dom.tr({
                key: item.id
            }, cell(item)));
        });

        var filterLink = (column) => {
            return {
                value: this.state.columns[column].filterText,
                requestChange: this.handleFilterTextChange(column)
            };
        };

        var header = columnNames.map((c) =>
            React.dom.th({
                onClick: this.sortColumn(c),
                className: 'header ' + this.sortClass(c)
            }, this.state.columns[c].name), this);

        var filterInputs = columnNames.map((c) =>
            React.dom.td(null, React.dom.input({
                type: 'text',
                valueLink: filterLink(c)
            }, null)), this);

        return React.dom.table({
            cellSpacing: 0,
            className: 'tablesorter'
        }, [
            React.dom.thead(null, [
                React.dom.tr(null, header),
                React.dom.tr(null, filterInputs)
            ]),
            React.dom.tbody(null, rows)
        ]);
    }
}


export
const GridView = React.createClass(_GridView.prototype);