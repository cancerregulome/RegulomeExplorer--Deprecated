module React from 'react';

class _GridView {
    render() {
        return (
            new React.DOM.div({
                className: 'slickgrid-container'
            }, 
            new React.DOM.div({
                className: 'slickgrid'
            }, 'Grid')));
    }
}

export const GridView = React.createClass(_GridView.prototype);