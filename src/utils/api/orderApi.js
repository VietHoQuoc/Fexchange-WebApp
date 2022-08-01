import { put } from './apiCaller';
import axiosClient from './axiosClient';

const ordersApi = {
    rating: (orderId, feedback, rate, token) => {
        const url = '/orders/feedback/' + orderId;
        const order = {
            feedback: feedback,
            rate: rate,
        };
        return put(
            url,
            {
                rate,
                feedback,
            },
            {},
            {
                Authorization: `Bearer ${token}`,
            }
        );
    },
    getAll: (id, token) => {
        const url = `/orders/1/20?all=true&buyerId=${id}`;
        return axiosClient.get(url, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
    },
};

export default ordersApi;
