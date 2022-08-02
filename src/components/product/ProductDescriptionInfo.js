import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProductCartQuantity } from '../../helpers/product';
import { addToCart } from '../../redux/actions/cartActions';
import { addToWishlist } from '../../redux/actions/wishlistActions';
import { addToCompare } from '../../redux/actions/compareActions';
import Rating from './sub-components/ProductRating';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import buyApi from '../../utils/api/buyApi';

const ProductDescriptionInfo = ({
    product,
    discountedPrice,
    currency,
    finalDiscountedPrice,
    finalProductPrice,
    cartItems,
    wishlistItem,
    compareItem,
    addToast,
    addToCart,
    addToWishlist,
    addToCompare,
}) => {
    const [selectedProductColor, setSelectedProductColor] = useState(
        product.variation ? product.variation[0].color : ''
    );
    const [selectedProductSize, setSelectedProductSize] = useState(
        product.variation ? product.variation[0].size[0].name : ''
    );
    const [productStock, setProductStock] = useState(
        product.variation ? product.variation[0].size[0].stock : product.stock
    );
    const [quantityCount, setQuantityCount] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState(false);

    const productCartQty = getProductCartQuantity(
        cartItems,
        product,
        selectedProductColor,
        selectedProductSize
    );

    const user = useSelector((state) => state.authData.user);

    const handleBuy = async () => {
        const createOrder = await buyApi.createOrder(
            {
                buyerId: user.id,
                price: product.price,
                productId: product.id,
            },
            user.tokenId
        );
        if (createOrder.status === 200) {
            const orders = await buyApi.getAllOrder(user.tokenId);
            const notis = await buyApi.getAllNotifications(
                product.accountId,
                user.tokenId
            );
            const filteredOrders = orders.data.filter(
                (order) =>
                    order.buyerId === user.id && product.id === order.productId
            );
            console.log(filteredOrders);
            for (let i = 0; i < filteredOrders?.length; i++) {
                for (let j = 0; j < notis?.data.length; j++) {
                    if (filteredOrders[i]?.id === notis.data[j]?.orderId) {
                        break;
                    } else if (j === notis?.data.length - 1) {
                        const createNotification =
                            await buyApi.createNotification(
                                {
                                    accountId: product?.accountId,
                                    subject: 'request',
                                    fullName: product?.accountName,
                                    orderId: filteredOrders[i].orderId,
                                    product1Id: product?.id,
                                    buyerId: user?.id,
                                },
                                user.tokenId
                            );
                        console.log(createNotification);
                    }
                }
            }
            setMessage(true);
            setShowModal(true);
            return;
        } else {
            setMessage(false);
            setShowModal(true);
        }
    };
    return (
        <div className="product-details-content ml-70">
            <h2>{product.name}</h2>
            <div className="product-details-price">
                <span>
                    <NumberFormat
                        value={product.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' đ'}
                    />
                </span>
            </div>
            {product.rating && product.rating > 0 ? (
                <div className="pro-details-rating-wrap">
                    <div className="pro-details-rating">
                        <Rating ratingValue={product.rating} />
                    </div>
                </div>
            ) : (
                ''
            )}
            <div className="pro-details-list">
                <h4>
                    <Link
                        to={
                            process.env.PUBLIC_URL +
                            '/shop-profile/' +
                            product.accountId
                        }
                    >
                        Seller : {product.accountName}
                    </Link>
                </h4>
            </div>

            {product.goodsStatus === 2 ? (
                <div className="pro-details-quality">
                    <div className="pro-details-cart btn-hover ml-0">
                        <a
                            href="#"
                            rel="noopener noreferrer"
                            onClick={handleBuy}
                        >
                            Buy Now
                        </a>
                    </div>
                </div>
            ) : (
                <div className="pro-details-quality">
                    <div className="pro-details-cart btn-hover">
                        {productStock && productStock > 0 ? (
                            <button
                                onClick={() =>
                                    addToCart(
                                        product,
                                        addToast,
                                        quantityCount,
                                        selectedProductColor,
                                        selectedProductSize
                                    )
                                }
                                disabled={productCartQty >= productStock}
                            >
                                {' '}
                                Add To Cart{' '}
                            </button>
                        ) : (
                            <button disabled>Out of Stock</button>
                        )}
                    </div>
                    <div className="pro-details-wishlist">
                        <button
                            className={
                                wishlistItem !== undefined ? 'active' : ''
                            }
                            disabled={wishlistItem !== undefined}
                            title={
                                wishlistItem !== undefined
                                    ? 'Added to wishlist'
                                    : 'Add to wishlist'
                            }
                            onClick={() => addToWishlist(product, addToast)}
                        >
                            <i className="pe-7s-like" />
                        </button>
                    </div>
                    <div className="pro-details-compare">
                        <button
                            className={
                                compareItem !== undefined ? 'active' : ''
                            }
                            disabled={compareItem !== undefined}
                            title={
                                compareItem !== undefined
                                    ? 'Added to compare'
                                    : 'Add to compare'
                            }
                            onClick={() => addToCompare(product, addToast)}
                        >
                            <i className="pe-7s-shuffle" />
                        </button>
                    </div>
                </div>
            )}
            {product.categoryId ? (
                <div className="pro-details-meta">
                    <span>Categories :</span>

                    {product.categoryId !== null && (
                        <Link
                            to={process.env.PUBLIC_URL + '/shop-grid-standard'}
                        >
                            {product.categoryName}
                        </Link>
                    )}
                </div>
            ) : (
                ''
            )}
            {product.tag ? (
                <div className="pro-details-meta">
                    <span>Tags :</span>
                    <ul>
                        {product.tag.map((single, key) => {
                            return (
                                <li key={key}>
                                    <Link
                                        to={
                                            process.env.PUBLIC_URL +
                                            '/shop-grid-standard'
                                        }
                                    >
                                        {single}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                ''
            )}

            <div className="pro-details-social">
                <ul>
                    <li>
                        <a href="//facebook.com">
                            <i className="fa fa-facebook" />
                        </a>
                    </li>
                    <li>
                        <a href="//dribbble.com">
                            <i className="fa fa-dribbble" />
                        </a>
                    </li>
                    <li>
                        <a href="//pinterest.com">
                            <i className="fa fa-pinterest-p" />
                        </a>
                    </li>
                    <li>
                        <a href="//twitter.com">
                            <i className="fa fa-twitter" />
                        </a>
                    </li>
                    <li>
                        <a href="//linkedin.com">
                            <i className="fa fa-linkedin" />
                        </a>
                    </li>
                </ul>
            </div>
            <Modal
                show={showModal}
                onHide={() => {
                    setMessage(false);
                    setShowModal(false);
                }}
                size="sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="buy-success">
                        {message ? (
                            <h3>
                                SUCCESSFULLY ORDER <span>{product.name}</span>
                            </h3>
                        ) : (
                            <h3>SOMETHING WRONG HAPPENED</h3>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setMessage(false);
                            setShowModal(false);
                        }}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (
            item,
            addToast,
            quantityCount,
            selectedProductColor,
            selectedProductSize
        ) => {
            dispatch(
                addToCart(
                    item,
                    addToast,
                    quantityCount,
                    selectedProductColor,
                    selectedProductSize
                )
            );
        },
        addToWishlist: (item, addToast) => {
            dispatch(addToWishlist(item, addToast));
        },
        addToCompare: (item, addToast) => {
            dispatch(addToCompare(item, addToast));
        },
    };
};

export default connect(null, mapDispatchToProps)(ProductDescriptionInfo);
