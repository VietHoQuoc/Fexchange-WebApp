import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../helpers/product';
import ProductGridSingle from '../../components/product/ProductGridSingle';
import { addToCart } from '../../redux/actions/cartActions';
import { addToWishlist } from '../../redux/actions/wishlistActions';
import { addToCompare } from '../../redux/actions/compareActions';
import { useEffect, useState } from 'react';
import axios from 'axios';
const ProductGrid = ({
    products,
    currency,
    addToCart,
    addToWishlist,
    addToCompare,
    cartItems,
    wishlistItems,
    compareItems,
    sliderClassName,
    spaceBottomClass,
    currentId,
    category
}) => {
    const [posts, setPosts] = useState([]);
    const [count, setCount] = useState(0);
    useEffect(() => {
        //Runs only the first render
        axios
            .get(
                `https://fbuyexchange.azurewebsites.net/api/productposts/1/19?all=true`
            )
            .then((res) => {
                setPosts(res.data);
                console.log(res.data);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <Fragment>
            {category==='fashion' ?
            (<>
                {posts &&
                posts
                    .filter((post) => post.goodsStatus === 2  )
                    .sort((a, b) => Number(a.boughtDate) - Number(b.boughtDate))
                    .slice(0, 4)
                    .map((product) => {
                        return (
                            <ProductGridSingle
                                sliderClassName={sliderClassName}
                                spaceBottomClass={spaceBottomClass}
                                product={product}
                                currency={currency}
                                addToCart={addToCart}
                                addToWishlist={addToWishlist}
                                addToCompare={addToCompare}
                                cartItem={
                                    cartItems.filter(
                                        (cartItem) => cartItem.id === product.id
                                    )[0]
                                }
                                wishlistItem={
                                    wishlistItems.filter(
                                        (wishlistItem) =>
                                            wishlistItem.id === product.id
                                    )[0]
                                }
                                compareItem={
                                    compareItems.filter(
                                        (compareItem) =>
                                            compareItem.id === product.id
                                    )[0]
                                }
                                key={product.id}
                            />
                        );
                    })}
            </>)
            :
            (<>
                {posts &&
                posts
                    .filter((post) => post.goodsStatus === 2 &&category==post.categoryId )
                    .sort((a, b) => Number(a.boughtDate) - Number(b.boughtDate))
                    .slice(0, 4)
                    .map((product) => {
                        return (
                            <ProductGridSingle
                                sliderClassName={sliderClassName}
                                spaceBottomClass={spaceBottomClass}
                                product={product}
                                currency={currency}
                                addToCart={addToCart}
                                addToWishlist={addToWishlist}
                                addToCompare={addToCompare}
                                cartItem={
                                    cartItems.filter(
                                        (cartItem) => cartItem.id === product.id
                                    )[0]
                                }
                                wishlistItem={
                                    wishlistItems.filter(
                                        (wishlistItem) =>
                                            wishlistItem.id === product.id
                                    )[0]
                                }
                                compareItem={
                                    compareItems.filter(
                                        (compareItem) =>
                                            compareItem.id === product.id
                                    )[0]
                                }
                                key={product.id}
                            />
                        );
                    })}
            </>)
            }
            
        </Fragment>
    );
};

ProductGrid.propTypes = {
    addToCart: PropTypes.func,
    addToCompare: PropTypes.func,
    addToWishlist: PropTypes.func,
    cartItems: PropTypes.array,
    compareItems: PropTypes.array,
    currency: PropTypes.object,
    products: PropTypes.array,
    sliderClassName: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    wishlistItems: PropTypes.array,
};

const mapStateToProps = (state, ownProps) => {
    return {
        products: getProducts(
            state.productData.products,
            ownProps.category,
            ownProps.type,
            ownProps.limit
        ),
        currency: state.currencyData,
        cartItems: state.cartData,
        wishlistItems: state.wishlistData,
        compareItems: state.compareData,
    };
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
