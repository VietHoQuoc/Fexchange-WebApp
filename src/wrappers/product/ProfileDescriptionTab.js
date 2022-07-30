import PropTypes from "prop-types";
import React, { useEffect,useRef } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import ShopProducts from "./ShopProducts";
import Paginator from 'react-hooks-paginator';
import { useState } from "react";
import { Link } from "react-router-dom";

const ProfileDescriptionTab = ({ spaceBottomClass, productFullDesc, posts, layout, postsSold }) => {
  const pageLimit = 100;
  // const [offset, setOffset] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [currentData, setCurrentData] = useState([]);
  // const pageLimit2 = 3;
  // const [offset2, setOffset2] = useState(0);
  // const [currentPage2, setCurrentPage2] = useState(1);
  // const [currentData2, setCurrentData2] = useState([]);

  const imgRef=useRef();

  useEffect(() => {
    // setCurrentData(posts.slice(offset, offset + pageLimit));
    // setCurrentData2(postsSold.slice(offset2, offset2 + pageLimit2));

    const img = imgRef.current;

    const observer = new IntersectionObserver(entries=>{
      console.log(entries[0].isIntersecting)
    })

    //kich hoat observer len
    if(img) observer.observe(img)

    return()=>{
      if(img) observer.unobserve(img)

    }
  }, [])
  return (
    <div className={`description-review-area ${spaceBottomClass}`}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
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
                <Nav.Link eventKey="productReviews">Reviews</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
                {/* <div className="product-anotherinfo-wrapper">
                <ShopProducts layout={layout} products={posts} />
                <div className="pro-pagination-style text-center mt-30">
                                    <Paginator
                                        totalRecords={posts.length}
                                        pageLimit={pageLimit}
                                        pageNeighbours={2}
                                        setOffset={setOffset}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pageContainerClass="mb-0 mt-0"
                                        pagePrevText="«"
                                        pageNextText="»"
                                    />
                                </div>
                </div> */}
                {posts && posts.map((product) => <div>
                  <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                  {product.images !== null ? (
                      <img
                        className="default-img img-fluid"
                        src={product.images[0].image}
                        alt=""
                        width="255px"
                        height="340px"
                        style={{ objectFit: 'cover' }}
                        ref={imgRef}
                      />
                    ) : (
                      <img
                        className="default-img img-fluid"
                        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAHBg8SBw4NDQ0NEA0QDw4PEBAPDQ4NFhEWFxUSExMYKCggGBolGxUTITEhJSkrLi4uFx8zODMsNyg5LisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKcBLwMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAABAECAwcF/8QAMRABAAEDAQUFBwQDAAAAAAAAAAECAxEEEiExUXETFGGBkSIyNEFCkrEjoaLRUnLB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APs4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5uVbFEzxwknWTPu0x+8gtEO3dr4RMeWG9hcr9+fWcgrm5FPGYjzh51amiPnno8o0X+VXpD0p0lMccz5g4q1sfTEz1xDjvkzMYiIjPVVFmmnhTH5Ta6nGzMeMAsHNudq3E84h0AAAAAAAAAAAAAAAAAAAAAAAAAAAADK42qJjnEpNBO+qOkrEWn9jVzH+0A9tVem1jYxvzxeHea+Ueku9f9Pm29em1bo2PnAPPvVfKPSTvVfKPSXdFd2unNMRj8vOdVXE78egN71Xyj0lxdvVXacVR47olve6/D0b3uvw9AKNRVRTEREbvCXpZ1NVy7EVRG9ljU1V3YirGJ8HNv46etQLgAAAAAAAAAAAAAAAAAAAAAAAAAAAEV32NbE85iVqPXRiuJjkDdf9Pm51fuUdP6brZzFHjE/8c6v3KOgPSzqqabURVmJjdw4pLlW3XM85Kbc1R7MTOGU0zXVinfMg23RNyrFKu5pI7P2Pej93tYsxZo3cZ4y9AfnaWMaiPP8ADu38dPWpTNn9aKqd3HPjuTWvjp61AuAAAAAAAAAAAAAAAAAAAAAAAAAAAATa6P04nlKlxdt9pRidwIbtcVW6McYicq5sxdina4RHDmmv6fs8bGas5y2L1yI3RP2gtiNmMU7oZFERVmIjM/NH29zlP2ydvc5T9sguEPb3OU/bJ3i5y/jILkNr42etR3i5y/jLNPEzqc1RMZzPCQXgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3BsyAGDAAYMABhmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//2Q=="
                        alt=""
                        width="255px"
                        height="340px"
                        style={{ objectFit: 'cover' }}
                        ref={imgRef}
                      />

                    )}

                    {/* {product.images.length !== 0 ? (
                      <img
                        className="hover-img img-fluid"
                        src={product.images[0].image}
                        alt=""
                        width="255px"
                        height="340px"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div>ok</div>

                    )} */}
                    
                  </Link>
                  {product.name}
                </div>
                              )}

                
              </Tab.Pane>
              <Tab.Pane eventKey="productDescription">
                {/* <ShopProducts layout={layout} products={p} />
              <div className="pro-pagination-style text-center mt-30">
                                    <Paginator
                                        totalRecords={postsSold.length}
                                        pageLimit={pageLimit2}
                                        pageNeighbours={2}
                                        setOffset={setOffset2}
                                        currentPage={currentPage2}
                                        setCurrentPage={setCurrentPage2}
                                        pageContainerClass="mb-0 mt-0"
                                        pagePrevText="«"
                                        pageNextText="»"
                                    />
                                </div> */}
                alos2
              </Tab.Pane>
              <Tab.Pane eventKey="productReviews">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="review-wrapper">
                      <div className="single-review">
                        <div className="review-img">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/img/testimonial/1.jpg"
                            }
                            alt=""
                          />
                        </div>
                        <div className="review-content">
                          <div className="review-top-wrap">
                            <div className="review-left">
                              <div className="review-name">
                                <h4>White Lewis</h4>
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
                              <button>Reply</button>
                            </div>
                          </div>
                          <div className="review-bottom">
                            <p>
                              Vestibulum ante ipsum primis aucibus orci
                              luctustrices posuere cubilia Curae Suspendisse
                              viverra ed viverra. Mauris ullarper euismod
                              vehicula. Phasellus quam nisi, congue id nulla.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="single-review child-review">
                        <div className="review-img">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/img/testimonial/2.jpg"
                            }
                            alt=""
                          />
                        </div>
                        <div className="review-content">
                          <div className="review-top-wrap">
                            <div className="review-left">
                              <div className="review-name">
                                <h4>White Lewis</h4>
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
                              <button>Reply</button>
                            </div>
                          </div>
                          <div className="review-bottom">
                            <p>
                              Vestibulum ante ipsum primis aucibus orci
                              luctustrices posuere cubilia Curae Suspendisse
                              viverra ed viverra. Mauris ullarper euismod
                              vehicula. Phasellus quam nisi, congue id nulla.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
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
  spaceBottomClass: PropTypes.string
};

export default ProfileDescriptionTab;
