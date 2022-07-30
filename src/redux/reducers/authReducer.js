const authReducer = (
    state = {
        user: null,
        tokenId: null,
        isAuthenticated: false,
    },
    action
) => {
    switch (action.type) {
        case 'UPDATE_PROFILE':
            state = {
                ...state,
                user: action.payload,
            };
            break;
        case 'LOGIN':
            state = {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                tokenId: action.payload.tokenId,
            };
            break;
        case 'LOGOUT':
            state = { ...state, user: '', isAuthenticated: false, tokenId: '' };
            break;
        default:
            break;
    }
    return state;
};

export default authReducer;
