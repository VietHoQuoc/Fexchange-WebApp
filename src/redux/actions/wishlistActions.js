import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import wishlistApi from "../../utils/api/wishlistApi";
export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const DELETE_FROM_WISHLIST = "DELETE_FROM_WISHLIST";
export const DELETE_ALL_FROM_WISHLIST = "DELETE_ALL_FROM_WISHLIST";

// add to wishlist

export const addToWishlist = (item, addToast) => {
  let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ikx1dSBIb25nIERvbmcgTXkgKEsxNl9IQ00pIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoibXlsaGRzZTE2MDkxM0BmcHQuZWR1LnZuIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MTY1ODY0MTYwNX0.ACe8OWgZ3bVSsUxYjMQma4pnE1_obJnCAkFx5CEub1E';
  axios.interceptors.request.use(
    config=>{
      config.headers.authorization=`Bearer ${token}`;
      return config;
    },
    error=>{
      return Promise.reject(error)
    }
  );
  let data={
    productPostId: item.id,
    accountId: 0,//lay tai khoan dang dang nhap
    productName: item.name,
    accountName: '',
    status: item.status,
    price: item.price,
    categoryName: item.categoryName,
    img: item.images[0].image
  }


  axios.post(`https://fbuyexchange.azurewebsites.net/api/wishlist`,data)
            .then((res) => {
                console.log(res);
                addToast('Success', { appearance: 'success' });
            })
            .catch((err) => {
                console.log(err);
                addToast('Some thing went wrong', {
                    appearance: 'error',
                });
            });
  return dispatch => {
    console.log(data)
    if (addToast) {
      addToast("Added To Wishlist", {
        appearance: "success",
        autoDismiss: true
      })
    }
    dispatch({ type: ADD_TO_WISHLIST, payload: item });
  };
};

// delete from wishlist
export const deleteFromWishlist = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Removed From Wishlist", {
        appearance: "error",
        autoDismiss: true
      });
    }
    dispatch({ type: DELETE_FROM_WISHLIST, payload: item });
  };
};

//delete all from wishlist
export const deleteAllFromWishlist = addToast => {
  return dispatch => {
    if (addToast) {
      addToast("Removed All From Wishlist", {
        appearance: "error",
        autoDismiss: true
      });
    }
    dispatch({ type: DELETE_ALL_FROM_WISHLIST });
  };
};
