import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';

const MobileNavMenu = ({ strings }) => {
    return (
        <nav className="offcanvas-navigation" id="offcanvas-navigation">
            <ul>
                <li className="menu-item-has-children">
                    <Link to={process.env.PUBLIC_URL + '/'}>
                        {strings['home']}
                    </Link>
                </li>
                <li className="menu-item-has-children">
                    <Link to={process.env.PUBLIC_URL + '/shop-grid-standard'}>
                        {strings['shop']}
                    </Link>
                </li>
                <li className="menu-item-has-children">
                    <Link to={process.env.PUBLIC_URL + '/'}>
                        {strings['pages']}
                    </Link>
                    <ul className="sub-menu">
                        <li>
                            <Link to={process.env.PUBLIC_URL + '/wishlist'}>
                                {strings['wishlist']}
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
    );
};

MobileNavMenu.propTypes = {
    strings: PropTypes.object,
};

export default multilanguage(MobileNavMenu);
