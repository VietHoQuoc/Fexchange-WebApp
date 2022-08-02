import React, { Fragment } from 'react';
import MetaTags from 'react-meta-tags';
import LayoutOne from '../../layouts/LayoutOne';
import HeroSliderOne from '../../wrappers/hero-slider/HeroSliderOne';
import FeatureIcon from '../../wrappers/feature-icon/FeatureIcon';
import TabProduct from '../../wrappers/product/TabProduct';
import BlogFeatured from '../../wrappers/blog-featured/BlogFeatured';

const HomeFashion = () => {
    return (
        <Fragment>
            <MetaTags>
                <title>FExchange</title>
                <meta
                    name="description"
                    content="Fashion home of flone react minimalist eCommerce template."
                />
            </MetaTags>
            <LayoutOne
                headerContainerClass="container-fluid"
                headerPaddingClass="header-padding-1"
            >
                {/* hero slider */}
                <HeroSliderOne />

                {/* tab product */}
                <TabProduct spaceBottomClass="pb-100" category="fashion" />
            </LayoutOne>
        </Fragment>
    );
};

export default HomeFashion;
