module React from 'react';
module addons from 'addons';
module _ from 'underscore';

class _FilterWidgets {
    getInitialState() {

    }

    render() {
        return React.DOM.div({
            className: addons.classSet({
                        'widget': true
                    })
        }, null);
    }
}


_FilterWidgets.prototype.displayName = 'FilterWidgets';

export const FilterWidgets = React.createClass(_FilterWidgets.prototype);