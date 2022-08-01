import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import orderApi from "../../utils/api/ordersApi";

import axios from "axios";
const ProfileDescriptionTab = ({
  spaceBottomClass,
  productFullDesc,
  posts,
  layout,
  postsSold,
  addToWishlist,
  getRate
}) => {
  const pageLimit = 100;
  const { addToast } = useToasts();
  const wishlistItems = useSelector((state) => state.wishlistData);
  const auth = useSelector((state)=>state.authData);
  const [orderList,setOrderList]=useState();
  const [totalRate,setTotalRate]=useState(0)
  const getTotalRate = (items) => items
    .map((item) => item.rate)
    .reduce((acc, value) => acc + value, 0)
  
  useEffect(() => {
    axios.get(`https://fbuyexchange.azurewebsites.net/api/orders/1/20?BuyerID=1&all=true`,{
      headers: {
        Authorization: 'Bearer ' + auth.user.tokenId,
    }
    }
    )
            .then(res => {
                setOrderList(res.data);
            })
            .catch(error => console.log(error));
 
  }, [])
  return (
    <div className={`description-review-area ${spaceBottomClass}`}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="additionalInfo">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="additionalInfo">
                  Product Posts
                  
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Sold</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productReviews">Reviews
                {orderList&&orderList.filter(p=>postsSold.filter(s=>s.id===p.productId)[0]&&p.feedback!==null).length>0?
                (<span>-{orderList.filter(p=>postsSold.filter(s=>s.id===p.productId)[0]&&p.feedback!==null).length}</span>)
              :
              ("-0")}
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
                <h4 className="text-secondary text-right">{posts.length > 0 ? <span>{posts.length} posts</span> : <span>0 posts</span>}</h4>
                {
                  posts.length < 1 ? <div>Saler haven't post anything</div> : posts.map((product) =>
                    //danh sach san pham hien theo layout list

                    <div className="card mb-4 shadow-sm p-1 bg-white rounded" >


                      <div className="shop-list-wrap card-body">
                        <div className="row">
                          <div className="col-xl-4 col-md-5 col-sm-6">
                            <div className="product-list-image-wrap">
                              <div className="product-img">
                                <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>

                                  <LazyLoadImage
                                    effect="blur"
                                    key={product.id}
                                    className="default-img"
                                    src={product.images[0].image}
                                    alt={product.images[0].image}
                                    width="200px"
                                    height="130px"
                                    style={{ objectFit: 'cover' }}
                                    placeholderSrc="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAHBg8SBw4NDQ0NEA0QDw4PEBAPDQ4NFhEWFxUSExMYKCggGBolGxUTITEhJSkrLi4uFx8zODMsNyg5LisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKcBLwMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAABAECAwcF/8QAMRABAAEDAQUFBwQDAAAAAAAAAAECAxEEEiExUXETFGGBkSIyNEFCkrEjoaLRUnLB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APs4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5uVbFEzxwknWTPu0x+8gtEO3dr4RMeWG9hcr9+fWcgrm5FPGYjzh51amiPnno8o0X+VXpD0p0lMccz5g4q1sfTEz1xDjvkzMYiIjPVVFmmnhTH5Ta6nGzMeMAsHNudq3E84h0AAAAAAAAAAAAAAAAAAAAAAAAAAAADK42qJjnEpNBO+qOkrEWn9jVzH+0A9tVem1jYxvzxeHea+Ueku9f9Pm29em1bo2PnAPPvVfKPSTvVfKPSXdFd2unNMRj8vOdVXE78egN71Xyj0lxdvVXacVR47olve6/D0b3uvw9AKNRVRTEREbvCXpZ1NVy7EVRG9ljU1V3YirGJ8HNv46etQLgAAAAAAAAAAAAAAAAAAAAAAAAAAAEV32NbE85iVqPXRiuJjkDdf9Pm51fuUdP6brZzFHjE/8c6v3KOgPSzqqabURVmJjdw4pLlW3XM85Kbc1R7MTOGU0zXVinfMg23RNyrFKu5pI7P2Pej93tYsxZo3cZ4y9AfnaWMaiPP8ADu38dPWpTNn9aKqd3HPjuTWvjp61AuAAAAAAAAAAAAAAAAAAAAAAAAAAAATa6P04nlKlxdt9pRidwIbtcVW6McYicq5sxdina4RHDmmv6fs8bGas5y2L1yI3RP2gtiNmMU7oZFERVmIjM/NH29zlP2ydvc5T9sguEPb3OU/bJ3i5y/jILkNr42etR3i5y/jLNPEzqc1RMZzPCQXgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3BsyAGDAAYMABhmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//2Q=="

                                  />


                                </Link>

                                {product.images || product.new ? (
                                  <div className="product-img-badges ">
                                    {product.images !== null ? (
                                      <span className="pink">{product.images.length}</span>
                                    ) : (
                                      ""
                                    )}
                                    {product.new ? <span className="purple">New</span> : ""}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-8 col-md-7 col-sm-6">
                            <div className="shop-list-content ">
                              <h3>
                                <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                                  {product.name}
                                </Link>

                              </h3>
                              <div className="product-list-price">
                                <span><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                                </span>
                              </div>

                              {product.shortDescription ? (
                                <p>{product.shortDescription}</p>
                              ) : (
                                ""
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
                                    className={wishlistItems.filter(i => i.id == product.id).length > 0 ? "active" : ""}
                                    disabled={wishlistItems.filter(i => i.id == product.id).length > 0}
                                    title={
                                      wishlistItems.filter(i => i.id == product.id).length > 0
                                        ? "Added to wishlist"
                                        : "Add to wishlist"
                                    }
                                    onClick={() => addToWishlist(product, addToast)}
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
                  )
                }
              </Tab.Pane>
              <Tab.Pane eventKey="productDescription">
                <h4 className="text-secondary text-right">{postsSold.length > 0 ? <span>Sold: {postsSold.length} </span> : <span>Sold nothing</span>}</h4>
                {postsSold.length < 0 ? "" : postsSold.map(product =>
                  <div className="card mb-4 shadow-sm p-1 bg-white rounded" >
                    <div className="card-body">
                      Sucessfully sold <b>"{product.name}"</b> 
                    </div>
                  </div>

                )}

              </Tab.Pane>
              <Tab.Pane eventKey="productReviews">
                
                <div className="row">
                  <div className="col-lg-7">
                  {getRate(orderList&&orderList
                    .filter(p=>postsSold.filter(s=>s.id===p.productId)[0]&&p.feedback!==null)
                    .map(o=> o.rate
                    ).reduce((order, value) => order + value, 0)/(orderList.filter(a=>postsSold.filter(b=>b.id===a.productId)[0]&&a.feedback!==null)).length
                    )}
                  {orderList&&orderList.filter(p=>postsSold.filter(s=>s.id===p.productId)[0]&&p.feedback!==null).map(o=>
                    <div>
                      
<div className="review-wrapper">
                      <div className="single-review">
                        <div className="review-img">
                          <img
                            src="data:image/png;base64,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"
                            alt="feedback"
                            width="50px"
                          />
                        </div>
                        
                        <div className="review-content">
                          <div className="review-top-wrap">
                            <div className="review-left">
                              <div className="review-name">
                                <h4>{o.buyerName}</h4>
                              </div>
                              <div className="review-rating">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                              </div>
                            </div>
                            <div className="review-left">
                              <button>{o.rate}/10</button>
                            </div>
                          </div>
                          <div className="review-bottom">
                            <h5 className="text-secondary"> {o.createdDate==null?'':<span>{o.createdDate.substr(0,10)}</span>}</h5>
                            {o.feedback}
                          </div>
                        </div>
                      </div>
                      
                    </div>
                    </div>
                    
                    )}
                    
                  </div>
                  <div className="col-lg-5">
                    {orderList&&orderList.filter(p=>p.feedback==null&&p.buyerId===auth.user.id)[0]?
                    (
                      <div className="ratting-form-wrapper pl-50">
                    
                      <h3>Add a Review</h3>
                      <div className="ratting-form">
                        <form action="#">
                          <div className="star-box">
                            <span>Your rating:</span>
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
                                <input placeholder="Name" type="text" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="rating-form-style mb-10">
                                <input placeholder="Email" type="email" />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="rating-form-style form-submit">
                                <textarea
                                  name="Your Review"
                                  placeholder="Message"
                                  defaultValue={""}
                                />
                                <input type="submit" defaultValue="Submit" />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    ):("You have to buy before submitting a feedback")}
                    
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
  wishlistItems: PropTypes.array
};


const mapStateToProps = state => {
  return {
    wishlistItems: state.wishlistData,
  };
};

const mapDispatchToProps = dispatch => {
  return {

    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDescriptionTab);