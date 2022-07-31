import { get, put, post, remove } from './apiCaller';
const adminProduct = {
    getAll: (token) => {
        const url = '/productposts/1/1000';

        return get(url, { all: true }, { Authorization: 'Bearer ' + token });
    },
    get: (id, token) => {
        const url = `/productposts/${id}`;

        return get(url, { Authorization: 'Bearer ' + token });
    },
    put: (id, obj, token) => {
        const url = `/productposts/${id}`;

        return put(url, obj, {}, { Authorization: 'Bearer ' + token });
    },
    post: () => {},
    delete: (id, token) => {
        const url = `/productposts/${id}`;

        return remove(url, {}, {}, { Authorization: 'Bearer ' + token });
    },
};

export default adminProduct;
