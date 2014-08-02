module React from 'react/addons';

import {FilterWidget} from './FilterWidget.react.js';

class _FilterBody {
    getInitialState() {
        return {};
    }

    buildWidget(widgetDefinition){
        return new FilterWidget(widgetDefinition);
    }

    render() {
        return React.DOM.div({
            className: React.addons.classSet({
                        'filter-body': true,
                        'focus': this.props.isFocus
                    })
        }, [
            this.props.config.widgets.map( (widgetDefinition) => this.buildWidget(widgetDefinition) )
           ]
        );
    }
}

_FilterBody.prototype.displayName = 'FilterBody';

export const FilterBody = React.createClass(_FilterBody.prototype);