import React from 'react';
import {Route} from "react-router-dom";

import Header from './components/header';
import First from "./components/first";
import Second from "./components/second";
import Third from "./components/third";
import Fourth from "./components/fourth";

import './css/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Route exact path="/" component={First}/>
                <Route exact path="/second" component={Second}/>
                <Route exact path="/third" component={Third}/>
                <Route exact path="/fourth" component={Fourth}/>
            </div>
        );
    }
}

export default App;