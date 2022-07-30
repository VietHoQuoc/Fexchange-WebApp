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
                await orderApi.getAll(accountId, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IkRhdCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InRxZGF0cW4wMTIzMEBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiZXhwIjoxNjU5MTk2Njg0fQ.Njwm7ADiGV2z4drGshCrC0vul8lX3mgU9Ufk0z7DDbw")
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err))
            
                // setOrder(tmp);
            }
        }
        fetchPost();
    }, []);                             
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