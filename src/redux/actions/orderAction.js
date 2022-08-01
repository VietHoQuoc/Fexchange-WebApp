export const SET_ORDER_ID = 'SET_ORDER_ID';

export const setOrderId = (id) => {
    return (dispatch) => {
        dispatch((id) => id);
    };
};
