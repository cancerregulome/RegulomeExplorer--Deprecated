module React from 'react';
module addons from 'addons';
module _ from 'underscore';


class _FilterHeader {
    getInitialState() {

    }

    render() {
        return React.DOM.div({
            className: addons.classSet({
                        'header': true,
                        'focus': this.props.isFocus
          null);
    }
}


_FilterHeader.prototype.displayName = 'FilterHeader';

export const FilterHeader = React.createClass(_FilterHeader.prototype);