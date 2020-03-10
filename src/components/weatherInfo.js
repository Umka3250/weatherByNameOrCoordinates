import React from 'react';
import {Tab, Nav, Row, Col} from "react-bootstrap";
import MapReactGl from "./mapReactGl";
import moment from "moment";

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
                        <Col>
                            <div className="card mt-5">
                                <div className="card-header">Weather in {this.props.cityByName.nameOfCity}</div>
                                <div className="card-body">
                                    <p className="card-text">
                                        Temperature { this.props.cityByName.temp }
                                    </p>
                                    <p className="card-text">
                                        Sunrise { this.props.cityByName.sunrise }
                                    </p>
                                    <p className="card-text">
                                        Wind speed { this.props.cityByName.wind }
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                }
                {
                    this.props.byCoordinates &&
                    <Row>
                        <div className="row mb-5">
                            <div className="card bg-light col mt-5">
                                <div className="card-body">
                                    <h1 className="card-title text-center">
                                        Weather in {this.props.cityByCoordinates.nameByCoordinates} <br/>
                                        Today is {moment().format('L')}
                                    </h1>
                                    <Tab.Container>
                                            <Row className="mt-5 mb-5 text-center">
                                                {this.props.cityByCoordinates.weatherArr.map((item, i) => {
                                                    return (
                                                        <Col>
                                                            <Nav variant="tabs" className="border-bottom-0">
                                                                <Nav.Link
                                                                    eventKey={item.dt}
                                                                    className="btn-primary w-100"
                                                                >
                                                                    {item.dt_txt.substr(0,11)}
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
                                                                    <div className="card bg-light">
                                                                        <div className="card-header">
                                                                            {this.props.cityByCoordinates.nameByCoordinates} - {item.dt_txt.substr(0,11)}
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