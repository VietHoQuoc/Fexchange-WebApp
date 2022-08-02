import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const ProductRating = ({ ratingValue }) => {
    let rating = [];

    for (let i = 0; i < 5; i++) {
        rating.push(<i className="fa fa-star-o" key={i}></i>);
    }
    if (ratingValue && ratingValue > 0) {
        const rate = ratingValue > 5 ? ratingValue / 2 : ratingValue;
        for (let i = 0; i <= Math.ceil(rate - 1); i++) {
            rating[i] = (
                <i
                    className="fa fa-star-o"
                    style={{ color: '#ffa900' }}
                    key={i}
                ></i>
            );
        }
    }
    return <Fragment>{rating}</Fragment>;
};

ProductRating.propTypes = {
    ratingValue: PropTypes.number,
};

export default ProductRating;
