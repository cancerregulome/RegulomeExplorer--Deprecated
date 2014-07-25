module React from 'react';
import {
    GridView
}
from './components/grid/GridView.react.js';

import {GenomicGridConfig} from './configs/Genomic.grid.js';

var data = [];
for (var i = 0; i < 500; i++) {
    data[i] = {
        Gene: 'gene ' + i,
        Chr: Math.round(Math.random() * 21 + 1)  +'',
        Position: Math.round(Math.random() * 90000000)
    };
}

const render = () => React.renderComponent(
    new GridView({
        initialItems: data,
        config: GenomicGridConfig.getConfig()
    }),
    document.getElementById('content')
);


render();