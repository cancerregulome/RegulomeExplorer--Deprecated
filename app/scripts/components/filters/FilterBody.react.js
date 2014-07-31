module React from 'react';
module addons from 'addons';
module _ from 'underscore';

import {FilterWidgets} from './FilterWidgets.react.js';

class _FilterBody {
    getInitialState() {

    }

    buildWidget(widgetDefinition){
        return React.DOM.div(null,null);
    }

    render() {
        return React.DOM.div({
            className: addons.classSet({
                        'filter-body': true,
                        'focus': this.props.isFocus
                    })
        }, [
            this.props.config.ui.map( (widgetDefinition) => buildWidget(widgetDefinition) )
           ]
        );
    }
}


_FilterBody.prototype.displayName = 'FilterBody';

export const FilterBody = React.createClass(_FilterBody.prototype);