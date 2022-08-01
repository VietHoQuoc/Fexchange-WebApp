import axiosClient from './axiosClient';
const orderApi = {
    getAll: (id, token) => {
        const url = `/orders/1/20?all=true`;
        return axiosClient.get(url, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
    },
};

export default orderApi;
