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
        const fetchPost = async () => {
            if (orders.length === 0 && !isDataLoaded) {
                let tmp = await orderApi
                    .getAll(accountId, userData.user.tokenId)
                    .then((res) => {
                        // TODO: check if seller also recieve
                        const data = res.map(async (item) => {
                            const getSellerId = async (item) => {
                                const product = await productApi
                                    .get(item.productId)
                                    .then((res) => res);
                                return {
                                    id: product.accountId,
                                    name: product.accountName,
                                };
                            };
                            return null;
                        });
                        return data;
                    })
                    .catch((err) => {
                        console.log(err);
                        return null;
                    });
                if (tmp !== null) {
                    setOrder(
                        tmp.map((item) => {
                            return item.then((res) => res);
                        })
                    );
                }
            }
        };
        fetchPost();
    }, [accountId, isDataLoaded, orders, userData]);
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
            <LayoutOne headerTop="visible">
                <Breadcrumb />
                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <p className="h2 text-center mb-6">Your orders</p>
                        <div className="row d-flex flex-column p-3">
                            {orders.map((order, index) => {
                                return (
                                    <Order
                                        key={index + 'order'}
                                        order={order}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default OrderManagement;
