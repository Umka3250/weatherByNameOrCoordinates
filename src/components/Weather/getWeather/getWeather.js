import {apiKey} from "./utils";

export const getWeatherByName = async(event) => {
    event.preventDefault();

    const urlForWeatherByName = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${byName.cityByName.apiCityName}&appid=${apiKey}&units=metric`);
    const dataCityName = await urlForWeatherByName.json();

    setWeatherByName(dataCityName);
}

export const setWeatherByName = (dataCityName) => {
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