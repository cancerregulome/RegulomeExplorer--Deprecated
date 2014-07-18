module React from 'react';
import {GridView} from './components/GridView.react.js';

const render = () => React.renderComponent(
    GridView(null),
    document.getElementById('content')
);

render();