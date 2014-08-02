module React from 'react/addons';

const CONFIG = {
    widgets: [
        {
            name: 'Gene',
            render: function() { return new React.DOM.input({type:'text', className: 'gene'}); }
        },
        {
            name: 'Chr',
            render: function() { return new React.DOM.input({type:'text', className: 'gene'}) }
        },
        {
            name: 'Position',
            render: function() { return new React.DOM.div( {
                    className: 'position'
                }, [
                    new React.DOM.input({type:'text', className: 'start'}),
                    ' - ',
                    new React.DOM.input({type:'text', className: 'end'}),
                ]
                );
            }
        }
    ]
};
// Genomic Grid Config
export class GEXPFilterConfig {

    getConfig() {
        return CONFIG;
    }
}