import React from 'react';
import { Fragment } from 'react';
import { MetaTags } from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import LayoutOne from './../../layouts/LayoutOne';
import Breadcrumb from './../../wrappers/breadcrumb/Breadcrumb';
import Tab from './Tab';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import orderApi from './../../utils/api/orderApi';
import Order from './Order/index';
import productApi from './../../utils/api/productApi';

const OrderManagement = ({ location, history }) => {
    const { pathname } = location;
    const [orders, setOrder] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const userData = useSelector((state) => state.authData);
    const [accountId] = useState(userData.user.id);

    // check if the user is signed in or not
    if (!accountId) {
        history.push('/login-register');
    }
    useEffect(() => {
        const getSeller = async (item) => {
            const res = await productApi.get(item.productId).then((res) => res);
            return {
                id: res.accountId,
                name: res.accountName,
            };
        };
        const asyncFilter = async (arr, predicticate) => {
            const results = await Promise.all(arr.map(predicticate));
            return arr.filter((_v, index) => results[index]);
        };
        const fetchPost = async () => {
            if (orders.length === 0 && !isDataLoaded) {
                let tmp = await orderApi
                    .getAll(accountId, userData.user.tokenId)
                    .then((res) => {
                        return res;
                    })
                    .catch((err) => {
                        console.log(err);
                        return null;
                    });
                if (tmp !== null) {
                    const syncResFilter = await asyncFilter(
                        tmp,
                        async (item) => {
                            const seller = await getSeller(item)
                                .then((res) => res)
                                .catch((err) => err);
                            if (
                                seller.id === accountId ||
                                accountId === item.buyerId
                            ) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    );
                    setOrder(syncResFilter);
                }
            }
        };
        fetchPost();
    }, [accountId, isDataLoaded, userData, orders]);
    return (
        <Fragment>
            <MetaTags>
                <title>Flone | Product Management</title>
                <meta
                    name="description"
                    content="About page of flone react minimalist eCommerce template."
                />
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>
                Home
            </BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                Orders Management
            </BreadcrumbsItem>
            <LayoutOne>
                <Breadcrumb />
                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row d-flex flex-column">
                            <Tab orders={orders} setOrder={setOrder} />
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default OrderManagement;
