import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import ShopProducts from './ShopProducts';
import Paginator from 'react-hooks-paginator';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { addToWishlist } from '../../redux/actions/wishlistActions';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import axios from 'axios';
import axiosClient from '../../utils/api/axiosClient';
const ProfileDescriptionTab = ({
    spaceBottomClass,
    productFullDesc,
    posts,
    layout,
    postsSold,
    addToWishlist,
    getRate,
    getTotalOrders
}) => {
    const pageLimit = 100;
    const { addToast } = useToasts();
    const wishlistItems = useSelector((state) => state.wishlistData);
    const [wishlistItem, setWishlistItem] = useState(0);
    const auth=useSelector((state)=>state.authData);
    const [orders,setOrders]=useState([])
    const [total,setTotal]=useState(0)
    useEffect(() => {
        axios.get(`https://fbuyexchange.azurewebsites.net/api/orders/1/200?all=true`,{headers: {
            Authorization: 'Bearer ' + auth.user.tokenId,
        },})
        .then(res => {
            setOrders(res.data);
            
        })
        .catch(error => console.log(error));
    }, []);
    
    return (
        <div className={`description-review-area ${spaceBottomClass}`}>
            <div className="container">
                <div className="description-review-wrapper">
                    <Tab.Container defaultActiveKey="additionalInfo">
                        <Nav
                            variant="pills"
                            className="description-review-topbar"
                        >
                            <Nav.Item>
                                <Nav.Link eventKey="additionalInfo">
                                    Product Posts
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="productDescription">
                                    Sold
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="productReviews">
                                    Reviews
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content className="description-review-bottom">
                            <Tab.Pane eventKey="additionalInfo">
                                
                                <h4 className="text-secondary text-right">
                                    {posts.length > 0 ? (
                                        <span>{posts.length} posts</span>
                                    ) : (
                                        <span>0 posts</span>
                                    )}
                                </h4>
                                {posts.length < 1 ? (
                                    <div>Saler haven't posted anything</div>
                                ) : (
                                    posts.map((product) => (
                                        //danh sach san pham hien theo layout list

                                        <div className="card mb-4 shadow-sm p-1 bg-white rounded">
                                            <div className="shop-list-wrap mb-30 card-body">
                                                <div className="row">
                                                    <div className="col-xl-4 col-md-5 col-sm-6">
                                                        <div className="product-list-image-wrap">
                                                            <div className="product-img">
                                                                <Link
                                                                    to={
                                                                        process
                                                                            .env
                                                                            .PUBLIC_URL +
                                                                        '/product/' +
                                                                        product.id
                                                                    }
                                                                >
                                                                    <LazyLoadImage
                                                                        effect="blur"
                                                                        key={
                                                                            product.id
                                                                        }
                                                                        className="default-img img-fluid"
                                                                        src={
                                                                            product
                                                                                .images[0]
                                                                                .image
                                                                        }
                                                                        alt={
                                                                            product
                                                                                .images[0]
                                                                                .image
                                                                        }
                                                                        width="200px"
                                                                        // height="340px"
                                                                        style={{
                                                                            objectFit:
                                                                                'cover',
                                                                        }}
                                                                        placeholderSrc="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAHBg8SBw4NDQ0NEA0QDw4PEBAPDQ4NFhEWFxUSExMYKCggGBolGxUTITEhJSkrLi4uFx8zODMsNyg5LisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKcBLwMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAABAECAwcF/8QAMRABAAEDAQUFBwQDAAAAAAAAAAECAxEEEiExUXETFGGBkSIyNEFCkrEjoaLRUnLB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APs4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5uVbFEzxwknWTPu0x+8gtEO3dr4RMeWG9hcr9+fWcgrm5FPGYjzh51amiPnno8o0X+VXpD0p0lMccz5g4q1sfTEz1xDjvkzMYiIjPVVFmmnhTH5Ta6nGzMeMAsHNudq3E84h0AAAAAAAAAAAAAAAAAAAAAAAAAAAADK42qJjnEpNBO+qOkrEWn9jVzH+0A9tVem1jYxvzxeHea+Ueku9f9Pm29em1bo2PnAPPvVfKPSTvVfKPSXdFd2unNMRj8vOdVXE78egN71Xyj0lxdvVXacVR47olve6/D0b3uvw9AKNRVRTEREbvCXpZ1NVy7EVRG9ljU1V3YirGJ8HNv46etQLgAAAAAAAAAAAAAAAAAAAAAAAAAAAEV32NbE85iVqPXRiuJjkDdf9Pm51fuUdP6brZzFHjE/8c6v3KOgPSzqqabURVmJjdw4pLlW3XM85Kbc1R7MTOGU0zXVinfMg23RNyrFKu5pI7P2Pej93tYsxZo3cZ4y9AfnaWMaiPP8ADu38dPWpTNn9aKqd3HPjuTWvjp61AuAAAAAAAAAAAAAAAAAAAAAAAAAAAATa6P04nlKlxdt9pRidwIbtcVW6McYicq5sxdina4RHDmmv6fs8bGas5y2L1yI3RP2gtiNmMU7oZFERVmIjM/NH29zlP2ydvc5T9sguEPb3OU/bJ3i5y/jILkNr42etR3i5y/jLNPEzqc1RMZzPCQXgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3BsyAGDAAYMABhmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//2Q=="
                                                                    />
                                                                </Link>

                                                                {product.images ||
                                                                product.new ? (
                                                                    <div className="product-img-badges ">
                                                                        {product.images !==
                                                                        null ? (
                                                                            <span className="pink">
                                                                                {
                                                                                    product
                                                                                        .images
                                                                                        .length
                                                                                }
                                                                            </span>
                                                                        ) : (
                                                                            ''
                                                                        )}
                                                                        {product.new ? (
                                                                            <span className="purple">
                                                                                New
                                                                            </span>
                                                                        ) : (
                                                                            ''
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-8 col-md-7 col-sm-6">
                                                        <div className="shop-list-content ">
                                                            <h3>
                                                                <Link
                                                                    to={
                                                                        process
                                                                            .env
                                                                            .PUBLIC_URL +
                                                                        '/product/' +
                                                                        product.id
                                                                    }
                                                                >
                                                                    {
                                                                        product.name
                                                                    }
                                                                </Link>
                                                            </h3>
                                                            <div className="product-list-price">
                                                                <span>
                                                                    <NumberFormat
                                                                        value={
                                                                            product.price
                                                                        }
                                                                        displayType={
                                                                            'text'
                                                                        }
                                                                        thousandSeparator={
                                                                            true
                                                                        }
                                                                        suffix={
                                                                            ' đ'
                                                                        }
                                                                    />
                                                                </span>
                                                            </div>

                                                            {product.shortDescription ? (
                                                                <p>
                                                                    {
                                                                        product.shortDescription
                                                                    }
                                                                </p>
                                                            ) : (
                                                                ''
                                                            )}

                                                            <div className="shop-list-actions d-flex align-items-center">
                                                                <div className="shop-list-wishlist ml-10">
                                                                    {/* <button
                                    className={wishlistItem !== undefined ? "active" : ""}
                                    disabled={wishlistItem !== undefined}
                                    title={
                                      wishlistItem !== undefined
                                        ? "Added to wishlist"
                                        : "Add to wishlist"
                                    }
                                    onClick={() => addToWishlist(product, addToast)}
                                  >
                                    <i className="pe-7s-like" />
                                  </button> */}
                                                                    <button
                                                                        className={
                                                                            wishlistItems.filter(
                                                                                (
                                                                                    i
                                                                                ) =>
                                                                                    i.id ==
                                                                                    product.id
                                                                            )
                                                                                .length >
                                                                            0
                                                                                ? 'active'
                                                                                : ''
                                                                        }
                                                                        disabled={
                                                                            wishlistItems.filter(
                                                                                (
                                                                                    i
                                                                                ) =>
                                                                                    i.id ==
                                                                                    product.id
                                                                            )
                                                                                .length >
                                                                            0
                                                                        }
                                                                        title={
                                                                            wishlistItems.filter(
                                                                                (
                                                                                    i
                                                                                ) =>
                                                                                    i.id ==
                                                                                    product.id
                                                                            )
                                                                                .length >
                                                                            0
                                                                                ? 'Added to wishlist'
                                                                                : 'Add to wishlist'
                                                                        }
                                                                        onClick={() =>
                                                                            addToWishlist(
                                                                                product,
                                                                                addToast
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="pe-7s-like" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="productDescription">
                                <h4 className="text-secondary text-right">
                                {getRate(orders&&orders.filter(o=>o.status==="Accepted"&&posts.map(p=>p.id===o.productId)).map((item) => item.rate).reduce((acc, value) => acc + value, 0)
                                /orders.filter(o=>o.status==="Accepted"&&posts.map(p=>p.id===o.productId)).length
                                )}
                                
                                {orders&&orders.filter(o=>o.status==="Accepted"&&posts.map(p=>p.id===o.productId)).map((item) => item.rate).reduce((acc, value) => acc + value, 0)/10}
                                    {orders&&orders.filter(o=>o.status==="Accepted"&&posts.map(p=>p.id===o.productId)).length>0 ? (
                                        <span>Sold: {orders.filter(o=>o.status==="Accepted"&&posts.map(p=>p.id===o.productId)).length} 
                                        
                                        </span>
                                        
                                    ) : (
                                        <span>Sold nothing</span>
                                    )}
                                </h4>
                                {orders&&orders.filter(o=>o.status==="Accepted"&&posts.map(p=>p.id===o.productId)).length < 0
                                    ? ''
                                    : orders.filter(o=>o.status==="Accepted"&&posts.map(p=>p.id===o.productId)).map((product) => (
                                          <div className="card mb-4 shadow-sm p-1 bg-white rounded">
                                              <div className="card-body">
                                                  Sucessfully sold{' '}
                                                  <b>"{product.product1Name}"</b>
                                              </div>
                                          </div>
                                      ))}
                            </Tab.Pane>
                            <Tab.Pane eventKey="productReviews">
                                <div className="row">
                                
                                    <div className="col-lg-7">
                                    {orders&&orders.filter(o=>o.feedback!==null&&o.status==="Accepted"&&posts.map(p=>p.id===o.productId)).map(o=><div>
                                    <div className="review-wrapper">
                                            <div className="single-review">
                                                <div className="review-img">
                                                    <img
                                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrpGMzCk6bk1x-SDgwlg3Y6HxzQav_RsOSCQ&usqp=CAU"
                                                        alt="ok"
                                                        width="50px"
                                                    />
                                                </div>
                                                <div className="review-content">
                                                    <div className="review-top-wrap">
                                                        <div className="review-left">
                                                            <div className="review-name">
                                                                <h4>{o.buyerName}
                                                                </h4>
                                                            </div>
                                                            <div className="review-rating">
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                            </div>
                                                        </div>
                                                        <div className="review-left ml-2">
                                                            {o.rate}
                                                        </div>
                                                    </div>
                                                    <div className="review-bottom">
                                                        <p>
                                                            {o.feedback!==''?o.feedback:'not yet'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>

                                </div>)}

                                    </div>
                                    <div className="col-lg-5">
                                        {/* <div className="ratting-form-wrapper pl-50">
                                            <h3>Add a Review</h3>
                                            <div className="ratting-form">
                                                <form action="#">
                                                    <div className="star-box">
                                                        <span>
                                                            Your rating:
                                                        </span>
                                                        <div className="ratting-star">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="rating-form-style mb-10">
                                                                <input
                                                                    placeholder="Name"
                                                                    type="text"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="rating-form-style mb-10">
                                                                <input
                                                                    placeholder="Email"
                                                                    type="email"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="rating-form-style form-submit">
                                                                <textarea
                                                                    name="Your Review"
                                                                    placeholder="Message"
                                                                    defaultValue={
                                                                        ''
                                                                    }
                                                                />
                                                                <input
                                                                    type="submit"
                                                                    defaultValue="Submit"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>
        </div>
    );
};

ProfileDescriptionTab.propTypes = {
    productFullDesc: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    addToWishlist: PropTypes.func,
    wishlistItems: PropTypes.array,
};

const mapStateToProps = (state) => {
    return {
        wishlistItems: state.wishlistData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToWishlist: (item, addToast) => {
            dispatch(addToWishlist(item, addToast));
        },
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileDescriptionTab);
