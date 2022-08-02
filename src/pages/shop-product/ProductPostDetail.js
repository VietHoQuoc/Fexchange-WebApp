import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import RelatedProductSlider from '../../wrappers/product/RelatedProductSlider';
import ProductDescriptionTab from '../../wrappers/product/ProductDescriptionTab';
import ProductImageDescription from '../../wrappers/product/ProductImageDescription';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductPostDescription from '../../wrappers/product/ProductPostDescription';
import ProductPostRelatedList from '../../wrappers/product/ProductPostRelatedList';
import { useParams } from 'react-router-dom';
function ProductPostDetail({ location, product }) {
    const { pathname } = location;

    const [postID, setpostID] = useState(useParams().id);
    const [cateID, setCateID] = useState(0);
    const [post, setPost] = useState({});
    useEffect(() => {
        //Runs only the first render
        axios
            .get(
                'https://fbuyexchange.azurewebsites.net/api/productposts/' +
                    postID
            )
            .then((res) => {
                setPost(res.data);
            })
            .catch((error) => console.log(error));
        //set links from post
    });
    return (
        <Fragment>
            <MetaTags>
                <title>Flone | Product Page</title>
                <meta
                    name="description"
                    content="Product page of flone react minimalist eCommerce template."
                />
            </MetaTags>

            <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>
                Home
            </BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                Shop Product
            </BreadcrumbsItem>

            <LayoutOne>
                {/* breadcrumb */}
                <Breadcrumb />

                {/* product description with image:có id để lấy được post bằng api */}

                <ProductPostDescription id={postID} />

                {/* related product slider: có cateID và id của post detail để hiện lên những post cùng cateid */}
                <ProductPostRelatedList id={postID} cateID={cateID} />
            </LayoutOne>
        </Fragment>
    );
}

export default ProductPostDetail;
