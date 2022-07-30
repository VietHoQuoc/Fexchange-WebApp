import axios from 'axios';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const DELETE_FROM_WISHLIST = 'DELETE_FROM_WISHLIST';
export const DELETE_ALL_FROM_WISHLIST = 'DELETE_ALL_FROM_WISHLIST';

export const addToWishlist = (item, addToast, user) => {
    let data = {
        productPostId: item.id,
        accountId: 9, //lay tai khoan dang dang nhap
        productName: item.name,
        accountName: '',
        status: item.status,
        price: item.price,
        categoryName: item.categoryName,
        img: item.images[0].image,
    };

    return (dispatch) => {
        console.log(data);
        console.log(user);
        if (addToast) {
            addToast('Added To Wishlist', {
                appearance: 'success',
                autoDismiss: true,
            });
        }
        dispatch({ type: ADD_TO_WISHLIST, payload: item });
    };
};

// delete from wishlist
export const deleteFromWishlist = (item, addToast) => {
    return (dispatch) => {
        if (addToast) {
            addToast('Removed From Wishlist', {
                appearance: 'error',
                autoDismiss: true,
            });
        }
        dispatch({ type: DELETE_FROM_WISHLIST, payload: item });
    };
};

//delete all from wishlist
export const deleteAllFromWishlist = (addToast) => {
    return (dispatch) => {
        if (addToast) {
            addToast('Removed All From Wishlist', {
                appearance: 'error',
                autoDismiss: true,
            });
        }
        dispatch({ type: DELETE_ALL_FROM_WISHLIST });
    };
};
