import React from 'react';
import {Route, Redirect, Switch} from "react-router-dom";

import Header from './components/Header/header';
import WeatherByName from "./components/Weather/ByName/weatherByName";
import WeatherByCoordinates from "./components/Weather/ByCoordinates/weatherByCoordinates";
import Second from "./components/second";
import Third from "./components/third";
import Fourth from "./components/fourth";

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.scss';

function App() {
        return (
            <>
                <Header />
                <Switch>
                    <Route path="/byName" component={WeatherByName}/>
                    <Route path="/byCoordinates" component={WeatherByCoordinates}/>
                    <Route path="/second" component={Second}/>
                    <Route path="/third" component={Third}/>
                    <Route path="/fourth" component={Fourth}/>
                    <Redirect to="/byName"/>
                </Switch>
            </>
        );
    }

export default App;