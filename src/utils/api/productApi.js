import axiosClient from './axiosClient';
import { capitalizeFirstLetter } from '../helper';
import { convertToString } from './../helper';

const productApi = {
    getAll: (params) => {
        const url = '/productposts';

        return axiosClient.get(url, { params });
    },
    get: (id) => {
        const url = `/productposts/${id}`;
        return axiosClient.get(url);
    },
    post: (product) => {
        const url = '/api/productposts';
        let formData = new FormData();
        Object.keys(product).map((key) => {
            console.log(capitalizeFirstLetter(key));
            formData.append(
                key === 'files' || key === 'id'
                    ? key
                    : capitalizeFirstLetter(key),
                product[key]
            );
        });
        formData.set('BoughtDate', convertToString(product.boughtDate));
        return axiosClient.post(url, formData, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        });
    },
};

export default productApi;
