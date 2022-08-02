import PropTypes from 'prop-types';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import ScrollToTop from './helpers/scroll-top';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { multilanguage, loadLanguages } from 'redux-multilanguage';
import { connect } from 'react-redux';
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';
import { gapi } from 'gapi-script';
import Logout from './pages/other/Logout';
import Admin from './pages/admin';
import { useSelector, useDispatch } from 'react-redux';
import { addToWishlist } from './redux/actions/wishlistActions';
import wishlistApi from './utils/api/wishlistApi';

// home pages
const HomeFashion = lazy(() => import('./pages/home/HomeFashion'));

// shop pages
const ShopGridStandard = lazy(() => import('./pages/shop/ShopGridStandard'));

// product pages
const Product = lazy(() => import('./pages/shop-product/Product'));
const ShopProfile = lazy(() => import('./pages/shop-product/ShopProfile'));

// other pages
const About = lazy(() => import('./pages/other/About'));
const Contact = lazy(() => import('./pages/other/Contact'));
const MyAccount = lazy(() => import('./pages/other/MyAccount'));
const LoginRegister = lazy(() => import('./pages/other/LoginRegister'));
const Post = lazy(() => import('./pages/other/Post'));
const Cart = lazy(() => import('./pages/other/Cart'));
const Wishlist = lazy(() => import('./pages/other/Wishlist'));
const Compare = lazy(() => import('./pages/other/Compare'));
const Checkout = lazy(() => import('./pages/other/Checkout'));
const Rating = lazy(() => import('./pages/other/Rating'));
const NotFound = lazy(() => import('./pages/other/NotFound'));
const OrderManagement = lazy(() => import('./pages/profile/OrdersManagement'));
const ProductManagement = lazy(() =>
    import('./pages/profile/ProductManagement')
);
const App = (props) => {
    const [wishlist, setWishlist] = useState([]);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.authData);
    useEffect(() => {
        const getData = async () => {
            const response = await wishlistApi.get(
                userData?.user?.id,
                userData?.tokenId
            );
            dispatch(addToWishlist(response.data));
            setWishlist(response.data);
        };
        if (userData !== null) {
            getData();
        }
    }, [setWishlist]);

    return (
        <ToastProvider
            placement="bottom-left"
            autoDismiss
            autoDismissTimeout={5000}
        >
            <BreadcrumbsProvider>
                <Router>
                    <ScrollToTop>
                        <Suspense
                            fallback={
                                <div className="flone-preloader-wrapper">
                                    <div className="flone-preloader">
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            }
                        >
                            <Switch>
                                <Route
                                    exact
                                    path={process.env.PUBLIC_URL + '/'}
                                    component={HomeFashion}
                                />

                                {/* Homepages */}
                                <Route
                                    path={
                                        process.env.PUBLIC_URL + '/home-fashion'
                                    }
                                    component={HomeFashion}
                                />

                                {/* Shop pages */}
                                <Route
                                    path={
                                        process.env.PUBLIC_URL +
                                        '/shop-grid-standard'
                                    }
                                    component={ShopGridStandard}
                                />
                                <Route
                                    path={
                                        process.env.PUBLIC_URL +
                                        '/shop-profile/:id'
                                    }
                                    render={(routeProps) => (
                                        <ShopProfile
                                            {...routeProps}
                                            key={routeProps.match.params.id}
                                        />
                                    )}
                                />

                                {/* Shop product pages */}
                                <Route
                                    path={
                                        process.env.PUBLIC_URL + '/product/:id'
                                    }
                                    render={(routeProps) => (
                                        <Product
                                            {...routeProps}
                                            key={routeProps.match.params.id}
                                        />
                                    )}
                                />

                                {/* Other pages */}
                                <Route
                                    path={process.env.PUBLIC_URL + '/about'}
                                    component={About}
                                />
                                <Route
                                    path={process.env.PUBLIC_URL + '/contact'}
                                    component={Contact}
                                />
                                <Route
                                    path={
                                        process.env.PUBLIC_URL + '/my-account'
                                    }
                                    component={MyAccount}
                                />
                                <Route
                                    path={
                                        process.env.PUBLIC_URL +
                                        '/login-register'
                                    }
                                    component={LoginRegister}
                                />
                                <Route
                                    path={process.env.PUBLIC_URL + '/post'}
                                    component={Post}
                                />
                                <Route
                                    path={process.env.PUBLIC_URL + '/logout'}
                                    component={Logout}
                                />
                                <Route
                                    path={process.env.PUBLIC_URL + '/rating'}
                                    component={Rating}
                                />
                                <Route
                                    path={process.env.PUBLIC_URL + '/cart'}
                                    component={Cart}
                                />
                                <Route
                                    path={process.env.PUBLIC_URL + '/wishlist'}
                                    component={Wishlist}
                                />
                                <Route
                                    path={process.env.PUBLIC_URL + '/compare'}
                                    component={Compare}
                                />
                                <Route
                                    path={process.env.PUBLIC_URL + '/post'}
                                    component={Post}
                                />
                                <Route
                                    path={process.env.PUBLIC_URL + '/checkout'}
                                    component={Checkout}
                                />
                                {userData.user?.role === 1 &&
                                    userData.tokenId !== '' && (
                                        <Route
                                            path={
                                                process.env.PUBLIC_URL +
                                                '/admin'
                                            }
                                            component={Admin}
                                        />
                                    )}
                                <Route
                                    path={
                                        process.env.PUBLIC_URL +
                                        '/product-management'
                                    }
                                    component={ProductManagement}
                                />
                                <Route
                                    path={
                                        process.env.PUBLIC_URL +
                                        '/orders-management'
                                    }
                                    component={OrderManagement}
                                />
                                <Route
                                    path={process.env.PUBLIC_URL + '/not-found'}
                                    component={NotFound}
                                />

                                <Route exact component={NotFound} />
                            </Switch>
                        </Suspense>
                    </ScrollToTop>
                </Router>
            </BreadcrumbsProvider>
        </ToastProvider>
    );
};

App.propTypes = {
    dispatch: PropTypes.func,
};

export default connect()(multilanguage(App));
