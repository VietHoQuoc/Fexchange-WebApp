import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { MetaTags } from 'react-meta-tags';
import StarRatings from 'react-star-ratings';
import LayoutOne from './../../layouts/LayoutOne';
import Breadcrumb from './../../wrappers/breadcrumb/Breadcrumb';
import { useState } from 'react';
import Divider from './Divider/index';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import orderApi from './../../utils/api/orderApi';
import { useSelector } from 'react-redux';

const Rating = (props) => {
    //TODO: import order id as orderId attribute when using this component
    const orderId = useSelector((state) => state.orderId);
    const userData = useSelector((state) => state.authData);
    const { pathname, history } = props; // TODO: may be you need to delete the default value of orderID in the destructure
    const [star, setStar] = new useState(0);
    const [ratingDescription, setRatingDescription] = new useState('');
    const toast = useToasts();
    const changeRating = (newRating, name) => {
        console.log(name);
        setStar(newRating);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        await orderApi
            .rating(orderId, ratingDescription, star, userData.tokenId)
            .then((res) => {
                toast.addToast('Success', { appearance: 'success' });
                history.push('/');
            })
            .catch((err) => {
                toast.addToast('SomeThing went wrong', { appearance: 'error' });
            });
    };
    return (
        <Fragment>
            <MetaTags>
                <title>FEX| Rating product</title>
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>
                home
            </BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                rating
            </BreadcrumbsItem>
            <LayoutOne>
                <Breadcrumb />
                <div className="p-3 rating-box">
                    <div className="rating-header p-3">
                        <p className="text-center h2">
                            How do you think about it?
                        </p>
                    </div>
                    <div className="h-100 d-flex flex-column align-items-center rating-body">
                        <StarRatings
                            className="mb-3"
                            rating={star}
                            changeRating={changeRating}
                            numberOfStars={5}
                            starRatedColor="#f1d045"
                            starHoverColor="#f1b345"
                            name="product rating"
                        />
                        <Divider />
                        <form className="post-form" onSubmit={onSubmit}>
                            <div className="form-floating mb-3">
                                <textarea
                                    className="rating-textarea form-control"
                                    placeholder="Tell us about your feel"
                                    value={ratingDescription}
                                    onChange={(e) =>
                                        setRatingDescription(e.target.value)
                                    }
                                    cols={80}
                                    rows={8}
                                ></textarea>
                            </div>
                            <div className="form-group d-flex justify-content-end">
                                <input
                                    className="btn btn-primary submit-button"
                                    type="submit"
                                    value="Submit"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};
export default Rating;
