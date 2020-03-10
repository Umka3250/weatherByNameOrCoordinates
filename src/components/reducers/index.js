import {combineReducers} from "redux";
import CarsRedusers from "./cars";
import CarActive from "./car-active";

const AllRedussers = combineReducers({
    cars: CarsRedusers,
    active: CarActive
})

export default AllRedussers;