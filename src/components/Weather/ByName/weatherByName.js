import React, {useState} from 'react';
import {Card, CardDeck, Col, Container, Row} from "react-bootstrap";

const apiKey = "cd2d4d88f8fd3a3bffd9bcbf58dab9aa";

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
        error: null,
    });
    console.log(byName)

    const onChangeHandle = event => {
        setByName({
            cityByName: {
                apiCityName: event.target.value
            }
        });
        console.log(byName.cityByName.apiCityName)
    }

    const getWeatherByName = async(event) => {
        event.preventDefault();

        const urlForWeatherByName = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${byName.cityByName.apiCityName}&appid=${apiKey}&units=metric`);
        const dataCityName = await urlForWeatherByName.json();

        setWeatherByName(dataCityName);
    }

    const setWeatherByName = (dataCityName) => {
        if(byName.cityByName.apiCityName) {
            const sunrise = dataCityName.sys.sunrise;
            const date = new Date(sunrise);
            const sunriseTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

            setByName({
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
            setByName({
                error: true,
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
                { byName.error &&
                <div className="alert alert-danger mt-5" role="alert">
                    You must enter something
                </div>
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
                                            Temperature { byName.cityByName.temp }
                                        </Card.Text>
                                        <Card.Text>
                                            Sunrise { byName.cityByName.sunrise }
                                        </Card.Text>
                                        <Card.Text>
                                            Wind speed { byName.cityByName.wind }
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