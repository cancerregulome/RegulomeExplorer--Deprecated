module React from 'react/addons';

import {FilterHeader} from './FilterHeader.react.js';
import {FilterBody} from './FilterBody.react.js';

class _FilterView {
    getInitialState() {
        return {
            'collapsed' : false
        };
    }

    onCollapseClick(e) {
        this.setState({collapsed: !this.state.collapsed});
    }

    onDestroyClick(e) {
        this.setState({collapsed: !this.state.collapsed});
    }

    render() {
        return React.DOM.div({
            className: React.addons.classSet({
                        'filter-module': true,
                        'focus': this.props.isFocus
                    })
        }, [
            new FilterHeader({
                'config': this.props.config,
                'onCollapseClick' : this.onCollapseClick.bind(this),
                'onDestroyClick' : this.onDestroyClick.bind(this)
            }),
            this.state.collapsed ? null : new FilterBody({ 'config': this.props.config })
            ]
        );
    }
}


_FilterView.prototype.displayName = 'FilterView';

export const FilterView = React.createClass(_FilterView.prototype);