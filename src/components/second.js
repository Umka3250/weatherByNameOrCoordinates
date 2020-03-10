import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import AllRedussers from "./reducers";
import CarsList from '../containers/car-list';

import {Container, Row} from "react-bootstrap";
import Details from "../containers/details";

const store = createStore(AllRedussers);

class Second extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container>
                    <Row>
                        <div className="col-sm-12">
                            <h2>List of Cars:</h2>
                            <CarsList/>
                        </div>
                        <div><hr/></div>
                        <div className="col-sm-12">
                            <h2>Details:</h2>
                            <Details/>
                        </div>
                    </Row>
                </Container>

            </Provider>
        );
    }
}

export default Second;