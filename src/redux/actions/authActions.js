//The login action passes the token as a payload to the reducer, but the logout action doesn’t.
export function updateProfile(response) {
    return (dispath) => {
        dispath({
            type: 'UPDATE_PROFILE',
            payload: response,
        });
    };
}
export function login(token) {

    return (dispath) => {
        dispath({
            type: 'LOGIN',
            payload: token,
        });
    };
}

export function logout() {
    console.log('Logging out');
    return (dispath) => {
        dispath({
            type: 'LOGOUT',
            payload: '',
        });
    };
}
