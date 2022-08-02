import { get, put, post, remove } from './apiCaller';
const buyApi = {
    createOrder: (obj, token) => {
        const url = '/orders';

        return post(
            url,
            obj,
            {},
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            }
        );
    },
    getAllOrder: (token) => {
        const url = '/orders/1/1000000';

        return get(url, { all: true }, { Authorization: 'Bearer ' + token });
    },

    createNotification: (obj, token) => {
        const url = '/notifications';

        return post(url, obj, {}, { Authorization: 'Bearer ' + token });
    },

    getAllNotifications: (id, token) => {
        const url = '/notifications/1000000/1';

        return get(
            url,
            { accountID: id },
            { Authorization: 'Bearer ' + token }
        );
    },
};

export default buyApi;
