import { SET_ORDER_ID } from './../actions/orderAction';

const orderReducer = (state = 0, action) => {
    switch (action.type) {
        case SET_ORDER_ID:
            state = action.payload;
            break;
        default:
    }
    return state;
};

export default orderReducer;
