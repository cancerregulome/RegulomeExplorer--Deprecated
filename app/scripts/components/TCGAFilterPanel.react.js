module React from 'react/addons';

import {FilterView} from './filters/FilterView.react.js';

import {GEXPFilterConfig} from '../configs/GEXP.filterview.js';

var filterConfigClasses = [ new GEXPFilterConfig() ];

class _TCGAFilterPanel {
    getInitialState() {
        return {
            'collapsed' : true
        };
    }

    render() {
        return React.DOM.div({
            className: React.addons.classSet({
                        'filter-panel': true
                    })
        }, filterConfigClasses.map( (configClass) => new FilterView({ 'config': configClass.getConfig(), 'collapsed' : false, 'isFocus': false }) )
        );
    }
}


_TCGAFilterPanel.prototype.displayName = 'TCGAFilterPanel';

export const TCGAFilterPanel = React.createClass(_TCGAFilterPanel.prototype);