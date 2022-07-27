import { sign } from "jsonwebtoken";
import PropTypes from "prop-types";
import React from "react";
import ProductGridSingle from "./ProductGridSingle";

const ProductImageFixed = ({ product }) => {
  return (
    <div className="product-large-image-wrapper">
      {product.images || product.new ? (
        <div className="product-img-badges">
          {product.images!==null ? (
            <span className="pink">{product.images.length}</span>
          ) : (
            ""
          )}
          {product.new ? <span className="purple">New</span> : ""}
        </div>
      ) : (
        ""
      )}

      <div className="product-fixed-image">
        {product.images ? (
          <img
            src={product.images[0].image}
            alt=""
            className="img-fluid"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

ProductImageFixed.propTypes = {
  product: PropTypes.object
};

export default ProductImageFixed;
