module React from 'react';

class _GridView {
    render() {
        return (
        React.DOM.div({
            className: 'slickgrid-container'
        }, React.DOM.div({
            className: 'slickgrid'
        }, 'Grid')));
    }
}

export const GridView = React.createClass(_GridView.prototype);