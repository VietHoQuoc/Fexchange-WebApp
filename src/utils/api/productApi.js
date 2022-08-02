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
    post: (product, token) => {
        const url = '/productposts';
        let formData = new FormData();
        Object.keys(product).map((key) => {
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
                Authorization: 'Bearer ' + token,
            },
        });
    },
    put: (product, token) => {
        const url = `/productposts/${product.id}`;
        let formData = new FormData();
        Object.keys(product).map((key) => {
            formData.append(
                key === 'files' || key === 'id'
                    ? key
                    : capitalizeFirstLetter(key),
                product[key]
            );
        });
        formData.set(
            'BoughtDate',
            convertToString(new Date(product.boughtDate))
        );
        return axiosClient.put(url, formData, {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,
            },
        });
    },
    put: (product, token) => {
        const url = `/productposts/${product.id}`;
        let formData = new FormData();
        Object.keys(product).map((key) => {
            formData.append(
                key === 'files' || key === 'id'
                    ? key
                    : capitalizeFirstLetter(key),
                product[key]
            );
        });
        formData.set(
            'BoughtDate',
            convertToString(new Date(product.boughtDate))
        );
        return axiosClient.put(url, formData, {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,
            },
        });
    },
    delete: (product, token) => {
        const url = `/productposts/${product.id}`;

        return axiosClient.delete(
            url,
            {},
            {
                headers: {
                    'Content-type': 'multipart/form-data',
                    Authorization: 'Bearer ' + token,
                },
            }
        );
    },
};

export default productApi;
