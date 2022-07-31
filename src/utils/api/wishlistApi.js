import axiosClient from './axiosClient';

import { get, remove, post } from './apiCaller';
const wishlistApi = {
    get: (id, token) => {
        const url = `/wishlist/${id}`;

        return get(url, {}, { Authorization: 'Bearer ' + token });
    },
    delete: (accountId, productId, token) => {
        const url = `/wishlist/${accountId}/${productId}`;

        return remove(url, {}, {}, { Authorization: 'Bearer ' + token });
    },
    post: (wishlistData, token) => {
        const url = `/wishlist`;

        return post(
            url,
            wishlistData,
            {},
            { Authorization: 'Bearer ' + token }
        );
    },
};

export default wishlistApi;
