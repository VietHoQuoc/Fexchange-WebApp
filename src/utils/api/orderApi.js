import { put } from './apiCaller';
import axiosClient from './axiosClient';

const ordersApi = {
    rating: (orderId, feedback, rate, token) => {
        const url = '/orders/feedback/' + orderId;
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
    changeStatus: (order, id, status, token) => {
        const url = '/orders/' + order.id;
        return put(
            url,
            {
                buyerId: id,
                status: status,
                createdDate: order.createdDate,
                productId: order.productId,
            },
            {},
            {
                Authorization: `Bearer ${token}`,
            }
        );
    },
    getAll: (id, token) => {
        const url = `/orders/1/100?all=true`;
        return axiosClient.get(url, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
    },
};

export default ordersApi;
