import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import {
    addToWishlist,
    deleteFromWishlist,
    deleteAllFromWishlist,
} from '../../redux/actions/wishlistActions';
import { addToCart } from '../../redux/actions/cartActions';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import NumberFormat from 'react-number-format';
import wishlistApi from '../../utils/api/wishlistApi';
const Wishlist = ({
    location,
    cartItems,
    currency,
    addToCart,
    wishlistItems,
    deleteFromWishlist,
    deleteAllFromWishlist,
    auth,
}) => {
    const { addToast } = useToasts();
    const { pathname } = location;

    const [wishlist, setWishlist] = useState();
    const [requestList, setRequestList] = useState(0);

    const wishlistItem = wishlistItems.map((item) => {
        return {
            productPostId: item.id,
            accountId: auth.user.id,
        };
    });

    useEffect(() => {
        wishlistItem.map(async (obj) => {
            await wishlistApi.post(obj, auth.tokenId);
            // console.log('this is response', response);
        });
    }, []);
    useEffect(() => {
        const getData = async () => {
            const response = await wishlistApi.get(auth.user.id, auth.tokenId);
            console.log('this is response', response.data);
            setWishlist(response.data);
        };
        getData();
    }, [requestList]);

    const deleteWishlist = async (productId) => {
        await wishlistApi.delete(auth.user.id, productId, auth.tokenId);
        setRequestList(requestList + 1);
        deleteFromWishlist(productId, addToast);
    };

    // console.log('get wishlist data from redux', wishlistItems);
    return (
        <Fragment>
            <MetaTags>
                <title>Flone | Wishlist</title>
                <meta
                    name="description"
                    content="Wishlist page of flone react minimalist eCommerce template."
                />
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>
                Home
            </BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                Wishlist
            </BreadcrumbsItem>
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb />
                <div className="cart-main-area pt-90 pb-100">
                    <div className="container">
                        {wishlist && wishlist.length >= 1 ? (
                            <Fragment>
                                <h3 className="cart-page-title">
                                    Your wishlist items
                                </h3>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="table-content table-responsive cart-table-content">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Image</th>
                                                        <th>Product Name</th>
                                                        <th>Unit Price</th>
                                                        <th>Add To Cart</th>
                                                        <th>action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {wishlist.map(
                                                        (wishlist, key) => {
                                                            return (
                                                                <tr key={key}>
                                                                    <td className="product-thumbnail">
                                                                        <Link
                                                                            to={
                                                                                process
                                                                                    .env
                                                                                    .PUBLIC_URL +
                                                                                '/product/' +
                                                                                wishlist.productPostId
                                                                            }
                                                                        >
                                                                            {wishlist.img ==
                                                                            null ? (
                                                                                <img
                                                                                    width="50px"
                                                                                    height="20px"
                                                                                    alt="default"
                                                                                    src="../../../public/assets/img/icon-img/13.png"
                                                                                />
                                                                            ) : (
                                                                                <img
                                                                                    width="100px"
                                                                                    height="130px"
                                                                                    alt=""
                                                                                    src={
                                                                                        wishlist.img
                                                                                    }
                                                                                />
                                                                            )}
                                                                        </Link>
                                                                    </td>

                                                                    <td className="product-name text-center">
                                                                        <Link
                                                                            to={
                                                                                process
                                                                                    .env
                                                                                    .PUBLIC_URL +
                                                                                '/product/' +
                                                                                wishlist.productPostId
                                                                            }
                                                                        >
                                                                            {
                                                                                wishlist.productName
                                                                            }
                                                                        </Link>
                                                                    </td>

                                                                    <td className="product-price-cart">
                                                                        <span>
                                                                            {
                                                                                currency.currencySymbol
                                                                            }
                                                                            <NumberFormat
                                                                                value={
                                                                                    wishlist.price
                                                                                }
                                                                                displayType={
                                                                                    'text'
                                                                                }
                                                                                thousandSeparator={
                                                                                    true
                                                                                }
                                                                                suffix={
                                                                                    ' đ'
                                                                                }
                                                                            />
                                                                        </span>
                                                                    </td>

                                                                    <td className="product-wishlist-cart">
                                                                        {wishlist.status ===
                                                                        'Active' ? (
                                                                            <button
                                                                                onClick={() =>
                                                                                    addToCart(
                                                                                        wishlist,
                                                                                        addToast
                                                                                    )
                                                                                }
                                                                                className="active"
                                                                                title="Add to cart"
                                                                            >
                                                                                Add
                                                                                to
                                                                                cart
                                                                            </button>
                                                                        ) : (
                                                                            <button
                                                                                disabled
                                                                                className="active"
                                                                            >
                                                                                Out
                                                                                of
                                                                                stock
                                                                            </button>
                                                                        )}
                                                                    </td>

                                                                    <td className="product-remove">
                                                                        <button
                                                                            onClick={() =>
                                                                                deleteWishlist(
                                                                                    wishlist.productPostId,
                                                                                    addToast
                                                                                )
                                                                            }
                                                                        >
                                                                            <i className="fa fa-times"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="cart-shiping-update-wrapper">
                                            <div className="cart-shiping-update">
                                                <Link
                                                    to={
                                                        process.env.PUBLIC_URL +
                                                        '/shop-grid-standard'
                                                    }
                                                >
                                                    Continue Shopping
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        ) : (
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="item-empty-area text-center">
                                        <div className="item-empty-area__text">
                                            No items found in wishlist <br />{' '}
                                            <Link
                                                to={
                                                    process.env.PUBLIC_URL +
                                                    '/shop-grid-standard'
                                                }
                                            >
                                                Add Items
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

Wishlist.propTypes = {
    addToCart: PropTypes.func,
    cartItems: PropTypes.array,
    currency: PropTypes.object,
    location: PropTypes.object,
    deleteAllFromWishlist: PropTypes.func,
    deleteFromWishlist: PropTypes.func,
    wishlistItems: PropTypes.array,
};

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartData,
        wishlistItems: state.wishlistData,
        currency: state.currencyData,
        auth: state.authData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (item, addToast, quantityCount) => {
            dispatch(addToCart(item, addToast, quantityCount));
        },
        addToWishlist: (item, addToast, quantityCount) => {
            dispatch(addToWishlist(item, addToast, quantityCount));
        },
        deleteFromWishlist: (item, addToast, quantityCount) => {
            dispatch(deleteFromWishlist(item, addToast, quantityCount));
        },
        deleteAllFromWishlist: (addToast) => {
            dispatch(deleteAllFromWishlist(addToast));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
