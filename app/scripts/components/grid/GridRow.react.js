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

    renderCell(columnConfig, cellContent) {
        if (columnConfig.graph) {
            return new GridCellSparkline( { content: cellContent, config: columnConfig }, null );
        }
        return new GridCell( { content: cellContent, config: columnConfig }, null );
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
        
        var cell = (x) => this.props.columns.filter( (c) => !c.hidden ).map( (c) => this.renderCell(c, x[c.id]) );

        return React.DOM.tr({
            key: item.id,
            onClick: this.__onClick,
            onMouseEnter: this.__onMouseEnter,
            onMouseLeave: this.__onMouseLeave
        }, cell(item));

    }
}

export const GridRow = React.createClass(_GridRow.prototype);