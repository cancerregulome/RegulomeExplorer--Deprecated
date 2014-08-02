module React from 'react/addons';

class _FilterWidget {
    getInitialState() {
        return {};
    }

    getLabelElement(label) {
        return new React.DOM.span({className:'label'}, label);
    }

    render() {
        return React.DOM.div({
            className: React.addons.classSet({
                        'widget': true
                    })
        }, [
            this.getLabelElement(this.props.name),
            this.props.render()
            ]
        );
    }
}

_FilterWidget.prototype.displayName = 'FilterWidget';

export const FilterWidget = React.createClass(_FilterWidget.prototype);