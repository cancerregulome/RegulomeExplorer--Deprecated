module React from 'react/addons';

import {FilterButtonPanel} from './FilterButtonPanel.react.js';

class _FilterHeader {
    getInitialState() {
        return {};
    }

    getHeaderElement(){
        return React.DOM.span({className:'title'}, this.props.label );
    }

    render() {
        return React.DOM.div({
            className: React.addons.classSet({
                        'header': true
          })
        }, [
            this.getHeaderElement(),
            new FilterButtonPanel({config: this.props.config})
            ]
        );
    }
}

_FilterHeader.prototype.displayName = 'FilterHeader';

export const FilterHeader = React.createClass(_FilterHeader.prototype);