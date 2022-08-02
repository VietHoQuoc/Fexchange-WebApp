import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';

const NavMenu = ({ strings, menuWhiteClass, sidebarMenu }) => {
    return (
        <div
            className={` ${
                sidebarMenu
                    ? 'sidebar-menu'
                    : `main-menu ${menuWhiteClass ? menuWhiteClass : ''}`
            } `}
        >
            <nav>
                <ul>
                    <li>
                        <Link to={process.env.PUBLIC_URL + '/'}>
                            {strings['home']}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={process.env.PUBLIC_URL + '/shop-grid-standard'}
                        >
                            {' '}
                            {strings['shop']}
                        </Link>
                    </li>
                    <li>
                        <Link to={process.env.PUBLIC_URL + '/'}>
                            {strings['pages']}
                            {sidebarMenu ? (
                                <span>
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            ) : (
                                <i className="fa fa-angle-down" />
                            )}
                        </Link>
                        <ul className="submenu">
                            <li>
                                <Link to={process.env.PUBLIC_URL + '/wishlist'}>
                                    {strings['wishlist']}
                                </Link>
                            </li>
                            <li>
                                <Link to={process.env.PUBLIC_URL + '/post'}>
                                    {strings['post']}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={
                                        process.env.PUBLIC_URL +
                                        '/product-management'
                                    }
                                >
                                    {strings['product_management']}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={
                                        process.env.PUBLIC_URL +
                                        '/orders-management'
                                    }
                                >
                                    {strings['orders-management']}
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

NavMenu.propTypes = {
    menuWhiteClass: PropTypes.string,
    sidebarMenu: PropTypes.bool,
    strings: PropTypes.object,
};

export default multilanguage(NavMenu);
