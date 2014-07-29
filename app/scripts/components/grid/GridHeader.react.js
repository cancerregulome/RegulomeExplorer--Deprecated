module React from 'react';

module _ from 'underscore';

class _GridHeader {

    renderFilterInput(c) {
        return React.DOM.td(null, React.DOM.input({
                key: c.id,
                type: 'text',
                valueLink: c.filterLink
            }, null) );
    }

    renderTopHeader(c) {
        return React.DOM.th({
                key: c.id,
                onClick: c.sortFn,
                className: 'header ' + c.sortClass
            }, c.name);
    }

    renderExtraHeader(c) {
        return React.DOM.th({
            key: c.id,
            className: 'header-extra'
        }, c.name);
    }

    render() {

        if (this.props.extra === true) {
            return React.DOM.tr({key: this.props.key}, this.props.config.map( (c) => this.renderExtraHeader(c) ) );
        }
        return  React.DOM.thead(null, [
                React.DOM.tr({key: this.props.key}, this.props.config.map( (c) => this.renderTopHeader(c) ) ),
                React.DOM.tr({key: 'filter-' + this.props.key}, this.props.config.map( (c) => this.renderFilterInput(c) ) )
            ]);
    }
}


export const GridHeader = React.createClass(_GridHeader.prototype);