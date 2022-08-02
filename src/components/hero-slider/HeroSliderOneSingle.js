import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import homeIMG from '../../assets/home.jpeg';

const HeroSliderOneSingle = ({ data, sliderClassName }) => {
    return (
        <div
            className={`single-slider slider-height-1 bg-purple ${
                sliderClassName ? sliderClassName : ''
            }`}
        >
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
                        <div className="slider-content slider-animated-1">
                            <h3 className="animated">Welcome to </h3>
                            <h1 className="animated">FExchange</h1>
                            <h3
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 'normal',
                                }}
                                className="animated "
                            >
                                place to sell and buy products
                            </h3>
                            <h3
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 'normal',
                                    marginBottom: '20px',
                                }}
                                className="animated "
                            >
                                for FPT students
                            </h3>
                            <div className="slider-btn btn-hover">
                                <Link
                                    className="animated"
                                    to={process.env.PUBLIC_URL + data.url}
                                >
                                    SHOP NOW
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
                        <div className="slider-single-img slider-animated-1">
                            <img
                                className="animated"
                                style={{ width: '1000px' }}
                                src={homeIMG}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

HeroSliderOneSingle.propTypes = {
    data: PropTypes.object,
    sliderClassName: PropTypes.string,
};

export default HeroSliderOneSingle;
