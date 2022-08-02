export const SET_ORDER_ID = 'SET_ORDER_ID';

export const setOrderId = (id) => {
    return (dispatch) => {
        dispatch({
            type: SET_ORDER_ID,
            payload: id,
        });
    };
};
