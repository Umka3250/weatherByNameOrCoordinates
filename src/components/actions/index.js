export const select = (car) => {
    return {
        type: "SELECTED_CAR",
        payload: car
    }
}