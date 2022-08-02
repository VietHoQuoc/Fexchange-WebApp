import React, { Fragment, useState, useEffect } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ManageUser from './manageUser';
import ManageProduct from './manageProduct';
import { useSelector } from 'react-redux';
import MetaTags from 'react-meta-tags';
import { SectionsContainer, Section, Header } from 'react-fullpage';
import HeaderOne from '../../wrappers/header/HeaderOne';

import userApi from '../../utils/api/userApi';
import adminProduct from '../../utils/api/adminProduct';

import './admin.css';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

const Admin = ({ location }) => {
    const { pathname } = location;
    const [userList, setUserList] = useState([]);
    const [productList, setProductList] = useState([]);
    const user = useSelector((state) => state.authData.user);

    useEffect(() => {
        const getData = async () => {
            const response = await userApi.getAll(user.tokenId);
            setUserList(response.data);
        };
        getData();
    }, []);

    useEffect(() => {
        const getProductData = async () => {
            const response = await adminProduct.getAll(user.tokenId);
            setProductList(response.data);
        };
        getProductData();
    }, []);

    const changeInfo = async (obj) => {
        const success = await userApi.put(obj.id, obj, user.tokenId);
        const response = await userApi.getAll(user.tokenId);
        setUserList(response.data);
    };

    const changeProductInfo = async (obj) => {
        const success = await adminProduct.put(obj.id, obj, user.tokenId);
        const response = await adminProduct.getAll(user.tokenId);
        console.log(success);
        setProductList(response.data);
    };

    const deleteProduct = async (id) => {
        const success = await adminProduct.delete(id, user.tokenId);
        const response = await adminProduct.getAll(user.tokenId);
        setProductList(response.data);
    };

    return (
        <Fragment>
            <header>
                <nav
                    id="sidebarMenu"
                    class="collapse d-lg-block sidebar collapse bg-white"
                >
                    <div class="position-sticky">
                        {/* put a logo here */}
                        <div class="list-group list-group-flush mx-3">
                            <div
                                class="btn-group admin-nav"
                                role="group"
                                aria-label="Basic example"
                            >
                                <Link
                                    to={process.env.PUBLIC_URL + '/'}
                                    type="button"
                                    class="btn btn-success"
                                >
                                    Home
                                </Link>

                                <Link
                                    to={process.env.PUBLIC_URL + '/logout'}
                                    type="button"
                                    class="btn btn-danger"
                                >
                                    Logout
                                </Link>
                            </div>
                            <Link
                                role="button"
                                to={process.env.PUBLIC_URL + '/admin/user'}
                                class={`list-group-item list-group-item-action py-2 ripple ${
                                    location.pathname === '/admin/user'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                User Management
                            </Link>
                            <Link
                                to={process.env.PUBLIC_URL + '/admin/product'}
                                role="button"
                                class={`list-group-item list-group-item-action py-2 ripple ${
                                    location.pathname === '/admin/product'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Product Management
                            </Link>
                            <div></div>
                        </div>
                    </div>
                </nav>
            </header>
            <Redirect to={process.env.PUBLIC_URL + '/admin/user'} />
            <Route path={process.env.PUBLIC_URL + '/admin/user'}>
                {userList.length > 0 ? (
                    <ManageUser userList={userList} changeInfo={changeInfo} />
                ) : (
                    ''
                )}
            </Route>
            <Route path={process.env.PUBLIC_URL + '/admin/product'}>
                {productList.length > 0 ? (
                    <ManageProduct
                        productList={productList}
                        changeProductInfo={changeProductInfo}
                        deleteProduct={deleteProduct}
                    />
                ) : (
                    ''
                )}
            </Route>
        </Fragment>
    );
};

Admin.propTypes = {};

const mapStateToProps = (state) => {
    return {
        products: state.productData.products,
    };
};

export default connect(mapStateToProps)(Admin);
