import React from 'react';
import {Card, CardDeck, Col, Container, Row} from "react-bootstrap";

const apiKey = "cd2d4d88f8fd3a3bffd9bcbf58dab9aa";

class WeatherByName extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            byName: false,
            cityByName: {
                nameOfCity: null,
                temp: null,
                sunrise: null,
                apiCityName: '',
                wind: null,
            },
            error: null,
        }
    }

    onChangeHandle = event => {
        this.setState({apiCityName: event.target.value});
    }

    getWeatherByName = async(event) => {
        event.preventDefault();

        const urlForWeatherByName = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.state.apiCityName}&appid=${apiKey}&units=metric`);
        const dataCityName = await urlForWeatherByName.json();

        this.setWeatherByName(dataCityName);
    }

    setWeatherByName = (dataCityName) => {
        if(this.state.apiCityName) {
            const sunrise = dataCityName.sys.sunrise;
            const date = new Date(sunrise);
            const sunriseTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

            this.setState({
                cityByName: {
                    nameOfCity: dataCityName.name,
                    temp: Math.round(dataCityName.main.temp) + "°C",
                    sunrise: sunriseTime,
                    wind: dataCityName.wind.speed + " m/s",
                },
                byName: true,
                error: false,
            });
        } else {
            this.setState({
                error: true,
            });
        }
    }

    render () {
        return (
            <>
                <Container className="text-center mt-5">
                    <Row>
                        <div className="col">
                            <form>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <label className="text-light">Enter your city</label>
                                        <input
                                            type="text"
                                            className="text-light bg-transparent form-control text-center w-50 mt-0 mb-0 mr-auto ml-auto"
                                            name="city"
                                            onChange={this.onChangeHandle}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-outline-success font-weight-bold"
                                    onClick={this.getWeatherByName}
                                >
                                    By name of city
                                </button>
                            </form>
                        </div>
                    </Row>
                    { this.state.error &&
                    <div className="alert alert-danger mt-5" role="alert">
                        You must enter something
                    </div>
                    }
                    {
                        this.state.byName &&
                        <Row>
                            <Col sm={4} className="mt-0 mb-0 mr-auto ml-auto">
                                <CardDeck>
                                    <Card className="card mt-5">
                                        <Card.Header className="card-header">
                                            Weather in {this.state.cityByName.nameOfCity}
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                Temperature { this.state.cityByName.temp }
                                            </Card.Text>
                                            <Card.Text>
                                                Sunrise { this.state.cityByName.sunrise }
                                            </Card.Text>
                                            <Card.Text>
                                                Wind speed { this.state.cityByName.wind }
                                            </Card.Text>
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

export default WeatherByName;