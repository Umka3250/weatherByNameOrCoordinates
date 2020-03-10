import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Header from './components/header';

import './css/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import First from "./components/first";
import Second from "./components/second";
import Third from "./components/third";
import Fourth from "./components/fourth";


class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Router>
                    <Switch>
                        <Route exact path="/" component={First}/>
                        <Route exact path="/second" component={Second}/>
                        <Route exact path="/third" component={Third}/>
                        <Route exact path="/fourth" component={Fourth}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;