import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import { connect, useSelector } from 'react-redux';
import MenuCart from './sub-components/MenuCart';
import { deleteFromCart } from '../../redux/actions/cartActions';
import NotificationCenter from '../notification';
import { useState } from 'react';

const IconGroup = ({
    currency,
    cartData,
    wishlistData,
    compareData,
    deleteFromCart,
    iconWhiteClass,
}) => {
    const defaultImg =
        'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg';
    const userData = useSelector((state) => state.authData);
    const wishlist = useSelector((state) => state.wishlistData);
    console.log('this is wishlist', wishlist);
    const handleClick = (e) => {
        e.currentTarget.nextSibling.classList.toggle('active');
    };

    const triggerMobileMenu = () => {
        const offcanvasMobileMenu = document.querySelector(
            '#offcanvas-mobile-menu'
        );
        offcanvasMobileMenu.classList.add('active');
    };

    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const toggleNotification = () => {
        setIsNotificationOpen((prev) => !prev);
    };

    return (
        <div
            className={`header-right-wrap ${
                iconWhiteClass ? iconWhiteClass : ''
            }`}
        >
            <div className="same-style header-search d-none d-lg-block">
                <button
                    className="notification-active"
                    onClick={toggleNotification}
                >
                    <i className="pe-7s-bell" />
                </button>
                <div className="notification-content position-relative">
                    <NotificationCenter isOpen={isNotificationOpen} />
                </div>
            </div>
            <div className="same-style account-setting d-none d-lg-block">
                <button
                    className="account-setting-active"
                    onClick={(e) => handleClick(e)}
                >
                    <img
                        src={
                            userData.isAuthenticated
                                ? userData.user.avatar
                                : defaultImg
                        }
                        referrerPolicy="no-referrer"
                        class="rounded-circle"
                        height="25"
                        width="25"
                        alt="Avatar"
                        loading="lazy"
                    />
                </button>
                <div className="account-dropdown">
                    <ul>
                        {(userData.isAuthenticated === true && (
                            <>
                                <li>
                                    <Link
                                        to={
                                            process.env.PUBLIC_URL +
                                            '/my-account'
                                        }
                                    >
                                        My Account
                                    </Link>
                                </li>
                                {userData.user.role1 === 'AD' ? (
                                    <li>
                                        <Link
                                            to={
                                                process.env.PUBLIC_URL +
                                                '/admin'
                                            }
                                        >
                                            Admin Page
                                        </Link>
                                    </li>
                                ) : (
                                    ''
                                )}
                                <li>
                                    <Link
                                        to={process.env.PUBLIC_URL + '/logout'}
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </>
                        )) || (
                            <li>
                                <Link
                                    to={
                                        process.env.PUBLIC_URL +
                                        '/login-register'
                                    }
                                >
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="same-style header-wishlist">
                <Link to={process.env.PUBLIC_URL + '/wishlist'}>
                    <i className="pe-7s-like" />
                </Link>
            </div>

            <div className="same-style cart-wrap d-block d-lg-none">
                <Link
                    className="icon-cart"
                    to={process.env.PUBLIC_URL + '/cart'}
                >
                    <i className="pe-7s-shopbag" />
                    <span className="count-style">
                        {cartData && cartData.length ? cartData.length : 0}
                    </span>
                </Link>
            </div>
            <div className="same-style mobile-off-canvas d-block d-lg-none">
                <button
                    className="mobile-aside-button"
                    onClick={() => triggerMobileMenu()}
                >
                    <i className="pe-7s-menu" />
                </button>
            </div>
        </div>
    );
};

IconGroup.propTypes = {
    cartData: PropTypes.array,
    compareData: PropTypes.array,
    currency: PropTypes.object,
    iconWhiteClass: PropTypes.string,
    deleteFromCart: PropTypes.func,
    wishlistData: PropTypes.array,
};

const mapStateToProps = (state) => {
    return {
        currency: state.currencyData,
        cartData: state.cartData,
        wishlistData: state.wishlistData,
        compareData: state.compareData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteFromCart: (item, addToast) => {
            dispatch(deleteFromCart(item, addToast));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
