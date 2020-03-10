import React, {PureComponent} from 'react';

const eventNames = ['onDrag'];

function round5(value) {
    return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

export default class ControlPanel extends PureComponent {
    renderEvent = eventName => {
        const {events = {}} = this.props;
        const lngLat = events[eventName];
        return (
            <div>
                <strong>Your coordinates:</strong> {lngLat ? lngLat.map(round5).join(', ') : <em>null</em>}
            </div>
        );

    };

    render() {
        return (
            <div className="control-panel">
                <h3>Choose your location</h3>
                <p>Drag the marker to your location, where you want to see weather.</p>
                <div>{eventNames.map(this.renderEvent)}</div>
            </div>
        );
    }
}