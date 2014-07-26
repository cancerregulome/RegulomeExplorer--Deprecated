module React from 'react';

const sparkline = function(canvas, data, endpoint, requestedColor, requestedStyle) {
    if (window.HTMLCanvasElement) {
            var ctx = canvas.getContext('2d'),
            color = (requestedColor ? requestedColor : 'rgba(0,0,0,0.5)'),
            style = (requestedStyle === 'bar' ? 'bar' : 'line'),
            height = canvas.height - 2,
            width = canvas.width,
            total = data.length,
            max = Math.max.apply(Math, data),
            xstep = width/total,
            ystep = max/height,
            x = 0,
            y = height - data[0]/ystep,
            i;
            ctx.fillStyle = color;
        if (style === 'line') {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(x, y);
    }
        for (i = 1; i < total; i = i + 1) {
            x = x + xstep;
            y = height - data[i]/ystep + 1;
            if (style === 'bar') { 
                ctx.fillRect(x, height, xstep/2, - data[i]/ystep + 1); 
            }
            else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        if (endpoint && style === 'line') {
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255,0,0,0.5)';
            ctx.arc(x, y, 1.5, 0, Math.PI*2);
            ctx.fill();
        }
    }
};

class _GridCellSparkline {

    componentDidMount() {
        if (this.props.content) {
            sparkline(this.getDOMNode().firstChild, this.props.content, true, 'rgba(255, 0, 0, 0.5)', this.props.config.graphType);
        }
    }

    render() {
        return React.DOM.td( null, React.DOM.canvas({height:20, width: 200}, null) );
    }
}

export const GridCellSparkline = React.createClass(_GridCellSparkline.prototype);