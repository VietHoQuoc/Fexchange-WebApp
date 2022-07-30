//DÙNG ĐỂ HIỆN SẢN PHẨM TRONG HOME/SHOP
//SEARCH VÀ FILTER THEO Ý MUỐN

import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import Paginator from 'react-hooks-paginator';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { getSortedProducts } from '../../helpers/product';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import ShopSidebar from '../../wrappers/product/ShopSidebar';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import ShopProducts from '../../wrappers/product/ShopProducts';
import ShopSideNavBar from "../../wrappers/product/ShopSideNavBar";
import ShopPageContent from "../../wrappers/product/ShopPageContent";
import axios from "axios";
//da lay duoc list va bien thanh const
//tim cach in ra theo mang filter va luu vao state
const getAllProductPost = async () => {
    
        let p =[]
        p = await fetch('https://fbuyexchange.azurewebsites.net/api/productposts/1/19?all=true')
        .then((res) => res.json())
        .then((res) => res);
    
    

    return p;


};
const getAllCategories = async () => {
    
    let c = [] 
    c = await fetch('https://fbuyexchange.azurewebsites.net/api/categories/1/30?all=true')
        .then((res) => res.json())
        .then((res) => res);
        return c;


};
const usePostData = () => {
    const [list, setList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            if (list.length == 0) {
                setList(await getAllProductPost());
            }

        };
        fetchData();
    }, [list]);
    return [list, setList];
};
const useCateData = () => {
    const [cate, setCate] = useState([]);
    useEffect(() => {
        const fetchCateData = async () => {
            if (cate.length == 0) {
                
                setCate(await getAllCategories());
            }

        };
        fetchCateData();
    }, [cate]);
    return [cate, setCate];
};
const ShopGridStandard1 = ({ location }) => {

    const { pathname } = location;
    const [_posts, setPosts] = usePostData();
    const [_categories, setCategories] = useCateData();


    useEffect(() => {


    }, [location]);


    return (
        <Fragment>
            <MetaTags>
                <title>Flone | Shop Page</title>
                <meta name="description" content="Shop page of flone react minimalist eCommerce template." />
            </MetaTags>

            <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>

            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Shop</BreadcrumbsItem>

            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb />

                <div className="shop-area pt-95 pb-100">

                    {/* shop topbar default */}
                    {/* shop page content default */}
                    <ShopPageContent posts={_posts} categories={_categories} />

                    {/* shop product pagination */}
                    <div className="pro-pagination-style text-center mt-30">
                        {/* phan trang bang cach nao?? */}
                    </div>



                </div>
            </LayoutOne>
        </Fragment>
    )
}



export default ShopGridStandard1;