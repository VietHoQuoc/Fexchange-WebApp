import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Card, CardImg } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = ({ product, sliderClassName, spaceBottomClass }) => {
  return (
    <Fragment>
      <div
        className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 mb-3 ${
          sliderClassName ? sliderClassName : ''
        }`}
      >
        <div
          className={`product-wrap h-100 d-flex flex-column justify-content-between ${
            spaceBottomClass ? spaceBottomClass : ''
          }`}
        >
          <Card className="product-img w-full overflow-hidden flex-grow-1 position-relative">
            <Link to={process.env.PUBLIC_URL + '/product/' + product.id}>
              <CardImg
                width="300px"
                height="250px"
                variant="top"
                className="default-img"
                src={product?.images[0]?.image}
                alt=""
              />
              {product?.images.length > 1 ? (
                <img
                  className="hover-img"
                  src={product?.images[1]?.image}
                  alt=""
                />
              ) : (
                ''
              )}
            </Link>
          </Card>
          <div className="product-content text-center flex-shrink-0">
            <h3 className="font-weight-bold">
              <Link to={process.env.PUBLIC_URL + '/product/' + product.id}>
                {product.name}
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Product.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object,
};

export default Product;
