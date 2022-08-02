import PropTypes from 'prop-types';
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
import axios from 'axios';
const ShopGridStandard = ({ location, products }) => {
    const [layout, setLayout] = useState('grid three-column');
    //cate
    const [sortType, setSortType] = useState('');
    const [sortValue, setSortValue] = useState('');
    //search
    const [searchType, setSearchType] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [filterSortType, setFilterSortType] = useState('');
    const [filterSortValue, setFilterSortValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);

    const pageLimit = 15;
    const { pathname } = location;
    const [posts, setPosts] = useState([]);
    const getLayout = (layout) => {
        setLayout(layout);
    };
    const getSearchParams = (searchType, searchValue) => {
        setSearchType(searchType);
        setSearchValue(searchValue);
    };
    const getSortParams = (sortType, sortValue) => {
        setSortType(sortType);
        setSortValue(sortValue);
    };

    const getFilterSortParams = (sortType, sortValue) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    };

    useEffect(() => {
        axios
            .get(
                `https://fbuyexchange.azurewebsites.net/api/productposts/1/100?all=true`
            )
            .then((res) => {
                setPosts(res.data);
            })
            .catch((error) => console.log(error));

        let searchedProducts = getSortedProducts(
            posts,
            searchType,
            searchValue
        );

        let sortedProducts = getSortedProducts(
            searchedProducts,
            sortType,
            sortValue
        );
        //flow: sẽ lấy post ứng với search và checkboxes -> sortedProducts
        //sau đây lấy sortedProducts filter theo giá
        const filterSortedProducts = getSortedProducts(
            sortedProducts,
            filterSortType,
            filterSortValue
        );

        sortedProducts = filterSortedProducts;
        setSortedProducts(sortedProducts);
        // setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    }, [
        offset,
        sortType,
        sortValue,
        filterSortType,
        filterSortValue,
        searchType,
        searchValue,
    ]);

    return (
        <Fragment>
            <MetaTags>
                <title>Flone | Shop Page</title>
                <meta
                    name="description"
                    content="Shop page of flone react minimalist eCommerce template."
                />
            </MetaTags>

            <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>
                Home
            </BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                Shop
            </BreadcrumbsItem>

            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb />

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 order-2 order-lg-1">
                                {/* shop sidebar */}
                                <ShopSidebar
                                    getSearchParams={getSearchParams}
                                    products={posts.filter(p=>p.goodsStatus===2)}
                                    getSortParams={getSortParams}
                                    sideSpaceClass="mr-30"
                                />
                            </div>
                            <div className="col-lg-9 order-1 order-lg-2">
                                {/* shop topbar default */}
                                <ShopTopbar
                                    getLayout={getLayout}
                                    getFilterSortParams={getFilterSortParams}
                                    productCount={
                                        sortedProducts.filter(p=>p.goodsStatus===2).length == 0 &&
                                        searchValue == ''
                                            ? posts.filter(p=>p.goodsStatus===2).length
                                            : sortedProducts.filter(p=>p.goodsStatus===2).length
                                    }
                                />

                                {/* shop page content default */}
                                {sortedProducts.filter(p=>p.goodsStatus===2).length !== 0 ||
                                searchValue !== '' ||sortValue!==''? (
                                    <ShopProducts
                                        layout={layout}
                                        products={sortedProducts.filter(p=>p.goodsStatus===2)}
                                    />
                                ) : (
                                    <ShopProducts
                                        layout={layout}
                                        products={posts.filter(p=>p.goodsStatus===2)}
                                    />
                                )}

                                {/* shop product pagination */}
                                {/* <div className="pro-pagination-style text-center mt-30">
                                    <Paginator
                                        totalRecords={sortValue===''?posts.length:sortedProducts.length}
                                        pageLimit={pageLimit}
                                        pageNeighbours={2}
                                        setOffset={setOffset}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pageContainerClass="mb-0 mt-0"
                                        pagePrevText="«"
                                        pageNextText="»"
                                    />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

ShopGridStandard.propTypes = {
    location: PropTypes.object,
    products: PropTypes.array,
};

const mapStateToProps = (state) => {
    return {
        products: state.productData.products,
    };
};

export default connect(mapStateToProps)(ShopGridStandard);
