import React from 'react';
import {Tab, Nav, Row, Col} from "react-bootstrap";
import MapReactGl from "./mapReactGl";

class WeatherInfo extends React.Component {
    render() {
        return (
            <div>
                { this.props.error &&
                <div className="alert alert-danger mt-5" role="alert">
                    You must enter something
                </div>
                }
                {
                    this.props.byName &&
                    <Row>
                        <div className="card col-5 offset-3 mt-5">
                            <div className="card-body">
                                <h1 className="card-title text-center">Weather in {this.props.cityByName.nameOfCity}</h1>
                                <div className="form-row">
                                    <label className="col-form-label col-4">Temperature:</label>
                                    <input
                                        className="form-control-plaintext col-8"
                                        type="text"
                                        value={ this.props.cityByName.temp }
                                        readOnly
                                    />
                                </div>
                                <div className="form-row">
                                    <label className="col-form-label col-4">Sunrise at:</label>
                                    <input
                                        className="form-control-plaintext col-8"
                                        type="text"
                                        value={ this.props.cityByName.sunrise }
                                        readOnly
                                    />
                                </div>
                                <div className="form-row">
                                    <label className="col-form-label col-4">Wind speed:</label>
                                    <input
                                        className="form-control-plaintext col-8"
                                        type="text"
                                        value={ this.props.cityByName.wind }
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </Row>
                }
                {
                    this.props.byCoordinates &&
                    <Row>
                        <div className="row mb-5">
                            <div className="card text-white bg-secondary col mt-5">
                                <div className="card-body">
                                    <h1 className="card-title text-center">Weather in {this.props.cityByCoordinates.nameByCoordinates}</h1>
                                    <Tab.Container>
                                            <Row className="mb-5">
                                                {this.props.cityByCoordinates.weatherArr.map((item, i) => {
                                                    return (
                                                        <Col>
                                                            <Nav variant="tabs" className="border-bottom-0">
                                                                <Nav.Link
                                                                    eventKey={item.dt}
                                                                    className="btn-secondary"
                                                                >
                                                                    {item.dt_txt}
                                                                </Nav.Link>
                                                            </Nav>
                                                        </Col>
                                                    );
                                                })}
                                            </Row>
                                            <Row className="mb-5">
                                                <Col>
                                                    <Tab.Content>
                                                        {this.props.cityByCoordinates.weatherArr.map((item, i) => {
                                                            return (
                                                                <Tab.Pane eventKey={item.dt}>
                                                                    <div className="card text-white bg-primary">
                                                                        <div className="card-header">
                                                                            {this.props.cityByCoordinates.nameByCoordinates}
                                                                        </div>
                                                                        <div className="card-body">
                                                                            <p className="card-text">
                                                                                Temperature {Math.round(item.main.temp) + "°C"}
                                                                            </p>
                                                                            <p className="card-text">
                                                                                Pressure {item.main.pressure + ' hpa'}
                                                                            </p>
                                                                            <p className="card-text">
                                                                                Wind speed {item.wind.speed + " m/s"}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </Tab.Pane>
                                                            );
                                                        })}
                                                    </Tab.Content>
                                                </Col>
                                            </Row>
                                        </Tab.Container>
                                        <MapReactGl
                                            long = {this.props.lonCoordinates}
                                            lat={this.props.latCoordinates}
                                            longitudeFromMap={this.props.longitudeFromMap}
                                            latitudeFromMap={this.props.latitudeFromMap}
                                            handleCoordinates={this.props.handleCoordinates}
                                        />
                                </div>
                            </div>
                        </div>
                    </Row>
                }
            </div>
        );
    }
}

export default WeatherInfo;