import React, {Component} from 'react';
import {Card, CardDeck, Col, Container, Nav, Row, Tab} from "react-bootstrap";
import moment from "moment";
import MapReactGl from "./Map/mapReactGl";
import {geolocated} from "react-geolocated";

const apiKey = "cd2d4d88f8fd3a3bffd9bcbf58dab9aa";

class WeatherByCoordinates extends Component {
    constructor(props){
        super(props)

        this.state = {
            lat: null,
            lon: null,
            longitudeFromMap: null,
            latitudeFromMap: null,
            byCoordinates: false,
            cityByCoordinates: {
                nameByCoordinates: null,
                weatherArr: [],
            },
            placeCoordinates: null,
            error: null,
            isLoading: false,
            events: {},
        }
    }

    handleCoordinates = (handleLat, handlelong) => {
        console.log(handleLat, handlelong);
        this.updateByNewCoordinates(handleLat, handlelong);
    }

    getWeatherByCoordinates = async(event) => {
        event.preventDefault();
        const longitude = this.props.coords.longitude;
        const latitude = this.props.coords.latitude;

        this.setState({
            lon: longitude,
            lat: latitude,
            isLoading: true,
        })

        if (latitude && longitude) {
            const urlForWeatherByCoordinates = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
            const dataCoordinates = await urlForWeatherByCoordinates.json();

            this.setWeatherByCoordinates(dataCoordinates);
            this.setState({
                isLoading: false,
            });
        }
    }

    updateByNewCoordinates = async(handleLat, handlelong) => {
        const urlForWeatherByCoordinates = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${handleLat}&lon=${handlelong}&appid=${apiKey}&units=metric`);
        const dataCoordinates = await urlForWeatherByCoordinates.json();

        this.setWeatherByCoordinates(dataCoordinates);
    }

    setWeatherByCoordinates = (dataCoordinates) => {
        if(this.state.lat && this.state.lon) {
            const weatherArr = dataCoordinates.list;
            const filteredWeatherArr = weatherArr.filter((item, i) => i%8===0);
            this.setState({
                cityByCoordinates: {
                    nameByCoordinates: dataCoordinates.city.name,
                    weatherArr: filteredWeatherArr,
                },
                byCoordinates: true,
                error: false,
            });
        }
    }

    render() {
        return (
            <>
                <Container className="text-center mt-5">
                    <Row>
                        <div className="col">
                            <form>
                                <button
                                    type="submit"
                                    className="btn btn-outline-success font-weight-bold"
                                    onClick={this.getWeatherByCoordinates}
                                    disabled={this.state.isLoading}
                                >
                                    { this.state.isLoading &&
                                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true">

                            </span>
                                    }
                                    By coordinates
                                </button>
                            </form>
                        </div>
                    </Row>
                    {
                        this.state.byCoordinates &&
                        <Row>
                            <Col>
                                <CardDeck>
                                    <Card className="bg-transparent border-0 mt-5 mb-5">
                                        <Card.Header className="font-weight-bold text-center border-bottom-0">
                                            <Card.Text className="text-light">
                                                Weather in {this.state.cityByCoordinates.nameByCoordinates}
                                            </Card.Text>
                                            <Card.Text className="text-light">
                                                Today is {moment().format('L')}
                                            </Card.Text>
                                        </Card.Header>
                                        <Card.Body>
                                            <Tab.Container>
                                                <Row className="mt-5 mb-5 text-center">
                                                    {this.state.cityByCoordinates.weatherArr.map((item, i) => {
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
                                                    <Col sm={4} className="mt-0 mb-0 mr-auto ml-auto">
                                                        <Tab.Content>
                                                            {this.state.cityByCoordinates.weatherArr.map((item, i) => {
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
                                                                                {this.state.cityByCoordinates.nameByCoordinates} - {item.dt_txt.substr(0,11)}
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
                                                            long = {this.state.lon}
                                                            lat={this.state.lat}
                                                            longitudeFromMap={this.state.longitudeFromMap}
                                                            latitudeFromMap={this.state.latitudeFromMap}
                                                            handleCoordinates={this.handleCoordinates}
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
                </Container>
            </>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 1000,
})(WeatherByCoordinates);