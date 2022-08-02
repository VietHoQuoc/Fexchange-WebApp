import axiosClient from './axiosClient';
import { capitalizeFirstLetter } from '../helper';
import { convertToString } from './../helper';
import { remove } from './apiCaller';

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
        console.log(product);
        Object.keys(product).map((key) => {
            if (key !== 'files')
                formData.append(
                    key === 'id' ? key : capitalizeFirstLetter(key),
                    product[key]
                );
        });
        product.files.forEach((item) => {
            formData.append('files', item);
        });
        formData.set('BoughtDate', convertToString(product.boughtDate));
        return axiosClient.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,
            },
        });
    },
    put: (product, token) => {
        const url = `/productposts/${product.id}`;
        let formData = new FormData();
        Object.keys(product).map((key) => {
            formData.append(
                key === 'id' ? key : capitalizeFirstLetter(key),
                product[key]
            );
        });
        if (product.files) {
            product.files.forEach((item) => {
                formData.append('files', item);
            });
        }
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

        return remove(
            url,
            {},
            {},
            {
                Authorization: 'Bearer ' + token,
            }
        );
    },
};

export default productApi;
