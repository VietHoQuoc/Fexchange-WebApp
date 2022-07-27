import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect, useParams } from 'react';
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
import ProfileDescriptionTab from '../../wrappers/product/ProfileDescriptionTab';
function ShopProfile({ location, products }) {
    const [layout, setLayout] = useState('list');
    const { pathname } = location;
    const [account, setAccount] = useState({});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get(
                `https://fbuyexchange.azurewebsites.net/api/acounts/` +
                    location.pathname.substr(14)
            )
            .then((res) => {
                console.log('use effect run once response', res.data);
                setAccount(res.data);
            })
            .catch((error) => console.log(error));

        axios
            .get(
                `https://fbuyexchange.azurewebsites.net/api/productposts/1/19?all=true`
            )
            .then((res) => {
                console.log('use effect run once response data2', res.data);
                setPosts(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

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
                Shop Profile
            </BreadcrumbsItem>

            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb />

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 order-2 order-lg-1">
                                <div className="account">
                                    <div className="row">
                                        <div className="col-4">
                                            {account.avatar != null ? (
                                                <img
                                                    src={account.avatar}
                                                    alt={account.fullName}
                                                    width="30px"
                                                    height="35px"
                                                ></img>
                                            ) : (
                                                <img
                                                    src="../../../public/assets/img/avt.png"
                                                    alt={account.fullName}
                                                    width="30px"
                                                    height="35px"
                                                ></img>
                                            )}
                                        </div>
                                        <div className="col-8">
                                            <h2>
                                                <b>{account.fullName}</b>
                                            </h2>
                                            <h4>Rate</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div class="table-responsive-sm table-borderless">
                                            <table class="table">
                                                <tr>
                                                    <td className="p-2 pl-5 pr-5 bg-warning">
                                                        <h2>
                                                            <i className="pe-7s-star mr-2 " />
                                                        </h2>
                                                    </td>
                                                    <td className="p-2 pl-5 pr-5 bg-primary">
                                                        <h2>
                                                            <i className="pe-7s-note mr-2 " />
                                                        </h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className=" bg-warning text-center">
                                                        <h4>
                                                            <b>6.0</b>
                                                        </h4>
                                                    </td>
                                                    <td className=" bg-primary text-center">
                                                        <h4>
                                                            <b>
                                                                {
                                                                    account.numberOfOrders
                                                                }
                                                            </b>{' '}
                                                            sold
                                                        </h4>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {/* profile in4 */}
                                        <div className="col-12">
                                            <h4>
                                                <i className="pe-7s-call mr-2 text-info" />
                                                {account.phone}
                                            </h4>
                                        </div>
                                        <div className="col-12">
                                            <h4>
                                                <i className="pe-7s-map-marker mr-2 text-info" />
                                                {account.address}
                                            </h4>
                                        </div>
                                        <div className="col-12">
                                            <h4>
                                                <i className="pe-7s-mail mr-2 text-info" />
                                                {account.gmail}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-9 order-1 order-lg-2">
                                {/* shop topbar default */}

                                {/* shop page content default */}
                                {/* <ShopProducts layout={layout} products={currentData} /> */}
                                <ProfileDescriptionTab
                                    spaceBottomClass="pb-90"
                                    productFullDesc={'alo'}
                                    posts={posts.filter(
                                        (i) =>
                                            i.accountId ==
                                                parseInt(
                                                    location.pathname.substr(14)
                                                ) && i.status === 'Active'
                                    )}
                                    postsSold={posts.filter(
                                        (i) =>
                                            i.accountId ==
                                                parseInt(
                                                    location.pathname.substr(14)
                                                ) && i.status === 'Inactive'
                                    )}
                                    layout={layout}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
}

ShopProfile.propTypes = {
    location: PropTypes.object,
    products: PropTypes.array,
};

const mapStateToProps = (state) => {
    return {
        products: state.productData.products,
    };
};

export default connect(mapStateToProps)(ShopProfile);
