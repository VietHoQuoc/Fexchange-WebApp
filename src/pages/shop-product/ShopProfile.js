import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect, useParams } from 'react';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import axios from 'axios';
import ProfileDescriptionTab from '../../wrappers/product/ProfileDescriptionTab';
import { useSelector } from 'react-redux';
function ShopProfile({ location, products }) {
    const [layout, setLayout] = useState('list');
    const { pathname } = location;
    const [account, setAccount] = useState({});
    const [posts, setPosts] = useState([]);
    const [rate, setRate] = useState(0);
    const [totalOrders, setTotalOrders]=useState(0);
    const [orders,setOrders]=useState([])
    const auth=useSelector((state)=>state.authData);

    useEffect(() => {
        axios
            .get(
                `https://fbuyexchange.azurewebsites.net/api/acounts/` +
                    location.pathname.substr(14)
            )
            .then((res) => {
                setAccount(res.data);
            })
            .catch((error) => console.log(error));

        axios
            .get(
                `https://fbuyexchange.azurewebsites.net/api/productposts/1/19?all=true`
            )
            .then((res) => {
                setPosts(res.data);
                console.log(posts);
            })
            .catch((error) => console.log(error));
        axios.get(`https://fbuyexchange.azurewebsites.net/api/orders/1/200?all=true`,{headers: {
            Authorization: 'Bearer ' + auth.user.tokenId,
        },})
        .then(res => {
            setOrders(res.data);
            
        })
        .catch(error => console.log(error));
    }, [account]);

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
                            <div className="col-lg-4">
                                <div className="card text-center card-box shadow-sm p-5 mb-4 bg-white rounded">
                                    <div className="member-card pt-2 pb-2">
                                        <div className="thumb-lg member-thumb mx-auto">
                                            <img
                                                src={account.avatar}
                                                alt={account.fullName}
                                                width="150px"
                                                height="150px"
                                                className="rounded-circle img-thumbnail mb-4"
                                            ></img>
                                        </div>
                                        <div className="">
                                            <h4>{account.fullName}</h4>
                                            <p className="text-primary text-center">
                                                User
                                            </p>
                                        </div>
                                        <ul className="social-links list-inline text-muted">
                                            <li className="list-inline-item col-lg-12 ">
                                                <a className="text-center">
                                                    <i className="pe-7s-mail mr-2 text-info" />
                                                    {account.gmail}
                                                </a>
                                            </li>
                                            <li className="list-inline-item col-lg-12">
                                                <a className="text-center">
                                                    <i className="pe-7s-call mr-2 text-info text-center" />
                                                    {account.phone
                                                        ? account.phone
                                                        : 'Not update phone'}
                                                </a>
                                            </li>

                                            <li className="list-inline-item col-lg-12">
                                                <a className="text-center">
                                                    <i className="pe-7s-map-marker mr-2 text-info text-center" />
                                                    {account.address
                                                        ? account.address
                                                        : 'Not update address'}
                                                </a>
                                            </li>
                                        </ul>

                                        <div className="mt-4">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="mt-3">
                                                        
                                                        <h4>{isNaN(rate)?0:rate.toFixed(2)}</h4>
                                                        <p className="mb-0 text-muted">
                                                            Rating
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="mt-3">
                                                        <h4>
                                                            
                                                                {orders.filter(o=>o.status==="Accepted"&&posts.filter(p=>p.id===o.productId).length==1).length} 
                                                            
                                                        </h4>
                                                        <p className="mb-0 text-muted">
                                                            Total of orders
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-8 order-1 order-lg-2">
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
                                                ) && i.goodsStatus===2
                                    )}
                                    postsSold={posts.filter(
                                        (i) =>
                                            i.accountId ==
                                                parseInt(
                                                    location.pathname.substr(14)
                                                )
                                    )}
                                    layout={layout}
                                    getRate={setRate}
                                    getTotalOrders={setTotalOrders}
                                    location={location}
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
