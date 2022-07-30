import { put } from "./apiCaller";
import axiosClient from "./axiosClient";

const orderApi = {
    rating: (orderId, feedback, rate, token) => {
        const url = "/orders/feedback/" + orderId;
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
};

export default orderApi;
