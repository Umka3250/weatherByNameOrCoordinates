import React from 'react';
import ReactMapGL, {Marker, NavigationControl} from 'react-map-gl';
import ControlPanel from './control-panel';
import Pin from './pin';

const TOKEN = 'pk.eyJ1IjoidW1rYTMyNTAiLCJhIjoiY2s3a2E4bTNwMHl5bTNlcGV0aWxoNmd4aiJ9.5WNajUpPVMIq3mJqlpT_cQ';

const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
};

class MapReactGl extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: this.props.lat,
                longitude: this.props.long,
                zoom: 14,
                bearing: 0,
                pitch: 0
            },marker: {
                longitude: this.props.long,
                latitude: this.props.lat,
            },
            longitudeFromMap: this.props.longitudeFromMap,
            latitudeFromMap: this.props.latitudeFromMap,
        };

        if (!this.props.lat && !this.props.long) {
            this.setState({
                marker: {
                    latitude: 30,
                    longitude: 50,
                }
            })
        }
    }

    _updateViewport = viewport => {
        this.setState({viewport});
    };

    _logDragEvent(name, event) {
        this.setState({
            events: {
                ...this.state.events,
                [name]: event.lngLat
            }
        });
    }

    _onMarkerDrag = event => {
        this._logDragEvent('onDrag', event);
        this.setState({
            marker: {
                longitude: event.lngLat[0],
                latitude: event.lngLat[1],
            },
            longitudeFromMap: event.lngLat[0],
            latitudeFromMap: event.lngLat[1],
        })
        let handleLat = this.state.latitudeFromMap;
        let handlelong = this.state.longitudeFromMap;
        this.props.handleCoordinates(handleLat, handlelong);
    };

    render() {
        return (
            <ReactMapGL
                {...this.state.viewport}
                width="60vw"
                height="50vh"
                mapStyle="mapbox://styles/umka3250/ck7m7v3w70sbv1imt846gxo74"
                onViewportChange={this._updateViewport}
                mapboxApiAccessToken={TOKEN}
            >
                <Marker
                    longitude={this.state.marker.longitude}
                    latitude={this.state.marker.latitude}
                    draggable
                    onDragEnd={this._onMarkerDrag}
                >
                    <Pin size={20} />
                </Marker>

                <div className="nav" style={navStyle}>
                    <NavigationControl onViewportChange={this._updateViewport} />
                </div>

                <ControlPanel
                    containerComponent={this.props.containerComponent}
                    events={this.state.events}
                />
            </ReactMapGL>
        );
    }
}
export default MapReactGl;