import React from 'react';
import {geolocated} from 'react-geolocated';

import {Container} from "react-bootstrap";
import WeatherForm from "./weatherForm";
import WeatherInfo from "./weatherInfo";

const apiKey = "cd2d4d88f8fd3a3bffd9bcbf58dab9aa";

class First extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            lat: null,
            lon: null,
            longitudeFromMap: null,
            latitudeFromMap: null,
            byName: false,
            byCoordinates: false,
            cityByName: {
                nameOfCity: null,
                temp: null,
                sunrise: null,
                apiCityName: '',
                wind: null,
            },
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

    onChangeHandle = event => {
        this.setState({apiCityName: event.target.value});
    }

    handleCoordinates = (handleLat, handlelong) => {
        console.log(handleLat, handlelong);
        this.updateByNewCoordinates(handleLat, handlelong);
    }

    requestForWeatherByName = async(event) => {
        event.preventDefault();

        const urlForWeatherByName = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.state.apiCityName}&appid=${apiKey}&units=metric`);
        const dataCityName = await urlForWeatherByName.json();

        this.getWeatherByName(dataCityName);
    }

    requestForWeatherByCoordinates = async(event) => {
        const longitude = this.props.coords.longitude;
        const latitude = this.props.coords.latitude;
        event.preventDefault();

        this.setState({
            lon: longitude,
            lat: latitude,
            isLoading: true,
        })

        const urlForWeatherByCoordinates = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        const dataCoordinates = await urlForWeatherByCoordinates.json();

        setTimeout(()=>{
            this.getWeatherByCoordinates(dataCoordinates);
            this.setState({
               isLoading: false,
            });
        },3000);

    }

    updateByNewCoordinates = async(handleLat, handlelong) => {
        const urlForWeatherByCoordinates = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${handleLat}&lon=${handlelong}&appid=${apiKey}&units=metric`);
        const dataCoordinates = await urlForWeatherByCoordinates.json();

        this.getWeatherByCoordinates(dataCoordinates);
    }

    getWeatherByName = (dataCityName) => {
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
                byCoordinates: false,
                error: false,
            });
        } else {
            this.setState({
                error: true,
            });
        }
    }

    getWeatherByCoordinates = (dataCoordinates) => {
        if(this.state.lat && this.state.lon) {
            const weatherArr = dataCoordinates.list;
            const filteredWeatherArr = weatherArr.filter((item, i) => i%8===0);
            this.setState({
                cityByCoordinates: {
                    nameByCoordinates: dataCoordinates.city.name,
                    weatherArr: filteredWeatherArr,
                },
                byName: false,
                byCoordinates: true,
                error: false,
            });
        }
    }
    render() {
        return (
            <Container className="text-center mt-5">
                <WeatherForm
                    isLoading={this.state.isLoading}
                    weatherByName={this.requestForWeatherByName}
                    weatherByCoordinates={this.requestForWeatherByCoordinates}
                    getValueName={this.onChangeHandle}
                />
                <WeatherInfo
                    handleCoordinates={this.handleCoordinates}
                    updateByNewCoordinates={this.updateByNewCoordinates}
                    longitudeFromMap={this.state.longitudeFromMap}
                    latitudeFromMap={this.state.latitudeFromMap}
                    byName={this.state.byName}
                    byCoordinates={this.state.byCoordinates}
                    cityByName={this.state.cityByName}
                    cityByCoordinates={this.state.cityByCoordinates}
                    latCoordinates={this.state.lat}
                    lonCoordinates={this.state.lon}
                    error={this.state.error}
                />
            </Container>
        )
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 1000,
})(First);