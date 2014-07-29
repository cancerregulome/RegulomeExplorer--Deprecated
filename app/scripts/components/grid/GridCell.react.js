module React from 'react';

module _ from 'underscore';

class _GridCell {
    getInitialState() {
        return {
            hover: false
        };
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
        var content = this.props.content;

        return React.DOM.td({
            key: this.props.key,
            onClick: this.__onClick,
            onMouseEnter: this.__onMouseEnter,
            onMouseLeave: this.__onMouseLeave,
        }, this.props.content);

    }
}

export const GridCell = React.createClass(_GridCell.prototype);