module React from 'react';
module addons from 'addons';
module _ from 'underscore';

import {FilterHeader} from './FilterHeader.react.js';
import {FilterBody} from './FilterBody.react.js';

class _FilterView {
    getInitialState() {

    }

    render() {
        return React.DOM.div({
            className: addons.classSet({
                        'filter-module': true,
                        'focus': this.props.isFocus
                    })
        }, [
            new FilterHeader({
                config: this.props.config
            }),
            new FilterBody({
                config: this.props.config
            })
        ]);
    }
}


_FilterView.prototype.displayName = 'FilterView';

export const FilterView = React.createClass(_FilterView.prototype);