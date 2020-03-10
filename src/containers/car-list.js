import React from "react";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {select} from "../components/actions";

class CarList extends React.Component {
    listShow(){
        return this.props.cars.map((car) => {
            return (
                <li onClick={() => this.props.select(car)} key={car.id}>{car.name}</li>
            );
        });
    }
    render() {
        return (
            <ol>
                {this.listShow()}
            </ol>
        );
    }
}

function mapStateToProps(state) {
    return {
        cars: state.cars
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({select: select}, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(CarList);