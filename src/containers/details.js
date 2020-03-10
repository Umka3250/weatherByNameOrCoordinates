import React from 'react';
import {connect} from 'react-redux';

class Details extends React.Component {
    render() {
        if (!this.props.car) {
            return (<p>Choose your auto!</p>);
        }
        return (
            <div>
                <h1>{this.props.car.name}</h1>
                <img alt="" height="100" width="100" src={this.props.car.img} />
                <p>{this.props.car.description}</p>
                <p>{this.props.car.speed} & {this.props.car.weight}</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        car: state.active
    }
}

export default connect (mapStateToProps)(Details);