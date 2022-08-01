/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { MetaTags } from 'react-meta-tags';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import { useReducer } from 'react';
import Product from './Product';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const TabLink = ({ tabIndex, onClick, children, active }) => {
    return (
        <li class="nav-item" role="presentation">
            <a
                className={`nav-link ${
                    active ? 'active font-weight-bold' : ''
                }`}
                id={`tab-${tabIndex}`}
                data-mdb-toggle="tab"
                role="tab"
                onClick={() => onClick(tabIndex)}
                aria-controls="ex3-tabs-3"
                aria-selected={active}
                href="#"
            >
                {children}
            </a>
        </li>
    );
};

const TabContent = ({ products }) => {
    return (
        <div class="tab-content" id="ex2-content">
            <div
                class="tab-pane fade show active d-flex flex-wrap"
                id="ex3-tabs-1"
                role="tabpanel"
                aria-labelledby="ex3-tab-1"
            >
                {products?.map((product) => (
                    <Product key={`product-${product.id}`} product={product} />
                ))}
            </div>
        </div>
    );
};

const Tab = ({ products }) => {
    const currentTabDataReducer = (state, action) => {
        const TABS_FILTER = {
            0: function (product) {
                return product?.goodsStatus === 1;
            },
            1: function (product) {
                return product?.goodsStatus === 2;
            },
            2: function (product) {
                return product?.goodsStatus === 3;
            },
            3: function (product) {
                return product?.goodsStatus === 4;
            },
        };
        const { type } = action;

        switch (type) {
            case 0:
            case 1:
            case 2:
            case 3:
                return products.filter(TABS_FILTER[type]);
            default:
                throw new Error();
        }
    };

    const [currentTab, setCurrentTab] = useState(0);
    const [currentTabData, dispatchCurrentTabData] = useReducer(
        currentTabDataReducer,
        []
    );
    useEffect(() => {
        dispatchCurrentTabData({ type: currentTab });
    }, [currentTab, products]);

    const onChangeTab = (tabIndex) => {
        setCurrentTab(tabIndex);
        dispatchCurrentTabData({ type: tabIndex, products: products });
    };

    return (
        <div>
            <ul class="nav nav-tabs nav-justified mb-3" id="ex1" role="tablist">
                <TabLink
                    tabIndex={0}
                    onClick={onChangeTab}
                    active={currentTab === 0}
                >
                    Pending
                </TabLink>
                <TabLink
                    tabIndex={1}
                    onClick={onChangeTab}
                    active={currentTab === 1}
                >
                    On-sale
                </TabLink>
                <TabLink
                    tabIndex={2}
                    onClick={onChangeTab}
                    active={currentTab === 2}
                >
                    Sold
                </TabLink>
                <TabLink
                    tabIndex={3}
                    onClick={onChangeTab}
                    active={currentTab === 3}
                >
                    Rejected
                </TabLink>
            </ul>
            <TabContent products={currentTabData} />
        </div>
    );
};

const ProductManagement = ({ location }) => {
    const { pathname } = location;
    const [products, setProducts] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const tempId = useSelector((state) => state.authData.user?.id);
    const [accountId] = useState(tempId);

    useEffect(() => {
        const fetchPost = async () => {
            if (products.length === 0 && !isDataLoaded) {
                setProducts(
                    await fetch(
                        'https://fbuyexchange.azurewebsites.net/api/productposts/1/20?all=true'
                    )
                        .then((res) => res.json())
                        .then((res) =>
                            res.filter(
                                (product) => product.accountId === accountId
                            )
                        )
                        .then((res) => {
                            setIsDataLoaded(true);
                            return res;
                        })
                        .catch((err) => console.error(err))
                );
            }
        };
        fetchPost();
    }, [products, accountId, isDataLoaded]);

    return accountId !== undefined ? (
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
                Product Management
            </BreadcrumbsItem>
            <LayoutOne headerTop="visible">
                <Breadcrumb />

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row d-flex flex-column">
                            <Tab products={products} />
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    ) : (
        <Redirect to="/login-register" />
    );
};

export default ProductManagement;
