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
import orderApi from './../../utils/api/ordersApi';


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
                const tmp = await orderApi.getAll(accountId, userData.user.tokenId)
                    .then((res) => res)
                    .catch((err) => {
                        console.log(err);
                        return null;
                    })
                if (tmp !== null) {
                    setOrder(tmp);
                }
            }
        }
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
            <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                Orders Management
            </BreadcrumbsItem>
            <LayoutOne headerTop="visible">
                <Breadcrumb />

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row d-flex flex-column">
                            <Tab orders={orders}/>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default OrderManagement;