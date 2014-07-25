module React from 'react';

module _ from 'underscore';

class _GridRow {
    getInitialState() {
        return {
            columns: this.props.config.columns
        };
    }


    render() {
        var item = this.props.item;
        
        var cell = (x) => this.props.columns.map((c) => React.DOM.td(null, x[c]), this);

        return React.DOM.tr({
            key: item.id
        }, cell(item));

    }
}


export const GridRow = React.createClass(_GridRow.prototype);