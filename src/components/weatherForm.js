import React from 'react';
import {Row} from "react-bootstrap";

export const WeatherForm = (props) => {
    return (
        <Row>
            <div className="col">
                <form>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Enter your city</label>
                            <input type="text" className="form-control text-center" name="city" onChange={props.getValueName}/>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-outline-primary"
                        onClick={props.weatherByName}
                    >
                        By name of city
                    </button>
                    <div className="form-row mt-3">
                        <div className="col">
                            <label>Or by coordinates</label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-outline-primary"
                        onClick={props.weatherByCoordinates}
                        disabled={props.isLoading}
                    >
                        { props.isLoading &&
                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true">

                            </span>
                        }
                        By coordinates
                    </button>
                </form>
            </div>
        </Row>
    );
}

export default WeatherForm;