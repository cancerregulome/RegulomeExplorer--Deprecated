module React from 'react/addons';

class _FilterButtonPanel {
    getInitialState() {
        return {};
    }

    getCollapseButtonElement(){
        return React.DOM.button({
            className: React.addons.classSet({
                'button' : true,
                'button-up-arrow' : !this.props.collapsed,
                'button-down-arrow' : this.props.collapsed
            }),
            onClick: this.props.onCollapseClick
        }, null);
    }

    getDestroyButtonElement(){
           return React.DOM.button({
            className: React.addons.classSet({
                'button' : true,
                'button-delete' : true
            })
        }, null);
    }

    render() {
        return React.DOM.div({
            className: React.addons.classSet({
                        'button-panel': true
          })
        }, [
            this.getCollapseButtonElement(),
            this.getDestroyButtonElement()
            ] 
        );
    }
}

_FilterButtonPanel.prototype.displayName = 'FilterButtonPanel';

export const FilterButtonPanel = React.createClass(_FilterButtonPanel.prototype);