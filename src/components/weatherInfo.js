import React from 'react';
import {Tab, Nav, Row, Col, Card, CardDeck} from "react-bootstrap";
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
                            <CardDeck>
                                <Card className="card mt-5">
                                    <Card.Header className="card-header">Weather in {this.props.cityByName.nameOfCity}</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            Temperature { this.props.cityByName.temp }
                                        </Card.Text>
                                        <Card.Text>
                                            Sunrise { this.props.cityByName.sunrise }
                                        </Card.Text>
                                        <Card.Text>
                                            Wind speed { this.props.cityByName.wind }
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </CardDeck>
                        </Col>
                    </Row>
                }
                {
                    this.props.byCoordinates &&
                    <Row>
                        <Col>
                            <CardDeck>
                                <Card className="bg-transparent border-0 mt-5 mb-5">
                                    <Card.Header className="font-weight-bold text-center border-bottom-0">
                                        <Card.Text className="text-light">
                                            Weather in {this.props.cityByCoordinates.nameByCoordinates}
                                        </Card.Text>
                                        <Card.Text className="text-light">
                                            Today is {moment().format('L')}
                                        </Card.Text>
                                    </Card.Header>
                                    <Card.Body>
                                        <Tab.Container>
                                            <Row className="mt-5 mb-5 text-center">
                                                {this.props.cityByCoordinates.weatherArr.map((item, i) => {
                                                    return (
                                                        <Col className="mt-3" key={i}>
                                                            <Nav variant="pills" className="border-bottom-0">
                                                                <Nav.Link
                                                                    eventKey={item.dt.toString()}
                                                                    className="btn btn-outline-success font-weight-bold w-100"
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
                                                                <Tab.Pane key={i} eventKey={item.dt}>
                                                                    <Card className="bg-light">
                                                                        <Card.Header>
                                                                            {item.weather.map((item, i) => {
                                                                                return (
                                                                                    <img
                                                                                        key={i}
                                                                                        width="30px"
                                                                                        height="30px"
                                                                                        src={'https://openweathermap.org/img/wn/'+item.icon+'.png'}
                                                                                        alt="No PNG"
                                                                                        className="bg-secondary rounded-circle p-0 mr-1"
                                                                                    />
                                                                                );
                                                                            })}
                                                                            {this.props.cityByCoordinates.nameByCoordinates} - {item.dt_txt.substr(0,11)}
                                                                        </Card.Header>
                                                                        <Card.Body>
                                                                            <Card.Text>
                                                                                Temperature {Math.round(item.main.temp) + "°C"}
                                                                            </Card.Text>
                                                                            <Card.Text>
                                                                                Pressure {item.main.pressure + ' hpa'}
                                                                            </Card.Text>
                                                                            <Card.Text>
                                                                                Wind speed {item.wind.speed + " m/s"}
                                                                            </Card.Text>
                                                                        </Card.Body>
                                                                    </Card>
                                                                </Tab.Pane>
                                                            );
                                                        })}
                                                    </Tab.Content>
                                                </Col>
                                            </Row>
                                        </Tab.Container>
                                        <div className="container">
                                            <div className="row">
                                                <div className="pl-0 pr-0 col container-for-map">
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
                                    </Card.Body>
                                </Card>
                            </CardDeck>
                        </Col>
                    </Row>
                }
            </div>
        );
    }
}

export default WeatherInfo;