export default function (state=null, action) {
    switch (action.type) {
        case "SELECTED_CAR":
            return action.payload
        default:
            return state;
    }
}