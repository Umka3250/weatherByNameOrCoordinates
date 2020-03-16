import React, {useState} from 'react';
import {Card, CardDeck, Col, Container, Row} from "react-bootstrap";
import {apiKey} from "../getWeather/utils";

export default function WeatherByName() {

    const [byName, setByName] = useState({
        byName: false,
        cityByName: {
            nameOfCity: null,
            temp: null,
            sunrise: null,
            apiCityName: '',
            wind: null,
        },
        error: {
            code: '',
            message: '',
        },
    });

    const onChangeHandle = event => {
        setByName({
            cityByName: {
                apiCityName: event.target.value
            }
        });
    }

    const getWeatherByName = async (event) => {
        event.preventDefault();

        const urlForWeatherByName = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${byName.cityByName.apiCityName}&appid=${apiKey}&units=metric`);
        const dataCityName = await urlForWeatherByName.json();

        setWeatherByName(dataCityName);
    }

    const setWeatherByName = (dataCityName) => {
        if (dataCityName.cod.toString() === '200') {

            setByName({
                cityByName: {
                    nameOfCity: dataCityName.name,
                    temp: Math.round(dataCityName.main.temp) + "°C",
                    sunrise: Math.round(dataCityName.main.feels_like) + "°C",
                    wind: dataCityName.wind.speed + " m/s",
                },
                byName: true,
                badRequest: false,
                error: {
                    code: dataCityName.cod,
                    message: dataCityName.message,
                },
            });
        } else if (dataCityName.cod.toString() === '404' || '400'){
            setByName({
                badRequest: true,
                error: {
                    code: dataCityName.cod,
                    message: 'You must enter something, ' + dataCityName.message.toLowerCase() + '.',
                },
            });
        }
    }

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
                                        onChange={onChangeHandle}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-outline-success font-weight-bold"
                                onClick={getWeatherByName}
                            >
                                By name of city
                            </button>
                        </form>
                    </div>
                </Row>
                {byName.badRequest &&
                <Row>
                    <Col sm={6} className="mt-0 mb-0 mr-auto ml-auto">
                        <div className="alert alert-danger mt-5" role="alert">
                            {byName.error.message}
                        </div>
                    </Col>
                </Row>
                }
                {
                    byName.byName &&
                    <Row>
                        <Col sm={4} className="mt-0 mb-0 mr-auto ml-auto">
                            <CardDeck>
                                <Card className="card mt-5">
                                    <Card.Header className="card-header">
                                        Weather in {byName.cityByName.nameOfCity}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            Temperature {byName.cityByName.temp}
                                        </Card.Text>
                                        <Card.Text>
                                            Sunrise {byName.cityByName.sunrise}
                                        </Card.Text>
                                        <Card.Text>
                                            Wind speed {byName.cityByName.wind}
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