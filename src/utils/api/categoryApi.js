import axiosClient from './axiosClient';

const categoryApi = {
    get: (id) => {
        const url = '/api/categories/' + id;
        return axiosClient.get(url);
    },
};

export default categoryApi;
