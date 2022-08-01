import { SET_ORDER_ID } from './../actions/orderAction';

const initState = 0;

const orderReducer = (state = initState, type) => {
    switch (type) {
        case SET_ORDER_ID:
            return state;
        default:
    }
    return state;
};

export default orderReducer;
