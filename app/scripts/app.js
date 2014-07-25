module React from 'react';
import {
    GridView
}
from './components/GridView.react.js';

var data = [];
for (var i = 0; i < 500; i++) {
    data[i] = {
        title: 'Task ' + i,
        duration: '5 days',
        percentComplete: Math.round(Math.random() * 100),
        start: '01/01/2009',
        finish: '01/05/2009',
        effortDriven: (i % 5 === 0)
    };
}

const render = () => React.renderComponent(
    new GridView({
        data: data
    }),
    document.getElementById('content')
);


render();