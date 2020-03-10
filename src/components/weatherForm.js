import React from 'react';
import {Row} from "react-bootstrap";

class WeatherForm extends React.Component {
    render() {
        return (
            <Row>
                <div className="col">
                    <form>
                        <div className="form-row">
                            <div className="form-group col">
                                <label>Enter your city</label>
                                <input type="text" className="form-control text-center" name="city" onChange={this.props.getValueName}/>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={this.props.weatherByName}
                        >By name of city
                        </button>
                        <div className="form-row mt-3">
                            <div className="col">
                                <label>Or by coordinates</label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={this.props.weatherByCoordinates}
                        >By coordinates
                        </button>
                    </form>
                </div>
            </Row>
        );
    }
}

export default WeatherForm;