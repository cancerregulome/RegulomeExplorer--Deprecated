module React from 'react';

module _ from 'underscore';

import {
    GridCell
}
from './GridCell.react.js';

import {
    GridCellSparkline
}
from './GridCell.Sparkline.react.js';

class _GridRow {
    getInitialState() {
        return {
            hover: false
        };
    }

    renderCell(columnConfig, cellContent, cellId) {
        if (columnConfig.graph) {
            return new GridCellSparkline( { key: cellId, content: cellContent, config: columnConfig }, null );
        }
        return new GridCell( { key: cellId, content: cellContent, config: columnConfig }, null );
    }

    __onClick(e) {
        if (this.props.onClick) {
            this.props.onClick(e, this.props.item);
        }
    }

    __onMouseEnter(e) {
        this.setState({ hover : true });
    }

    __onMouseLeave(e) {
        this.setState({ hover : false });
    }

    render() {
        var item = this.props.item;
        
        var cell = (x) => this.props.columns.filter( (c) => !c.hidden ).map( (c) => this.renderCell(c, x[c.id], c.id) );

        return React.DOM.tr({
            key: this.props.key,
            onClick: this.__onClick,
            onMouseEnter: this.__onMouseEnter,
            onMouseLeave: this.__onMouseLeave
        }, cell(item));

    }
}

export const GridRow = React.createClass(_GridRow.prototype);