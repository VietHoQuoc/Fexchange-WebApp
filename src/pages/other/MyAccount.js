import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState, useCallback } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import { connect, useSelector } from "react-redux";

import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import FileInput from "../../components/input/FileInput";

const MyAccount = ({ location }) => {
  const userData = useSelector((state) => state.authData);
  const { pathname } = location;
  //remove previous img when set new img
  const [avatar, setAvatar] = useState();
  const [data, setData] = useState({
    fullName: userData.user.fullName,
    address: "",
    phone: "",
    avatar: userData.user.avatar,
  });

  const callbackChangeFile = (avatar) => {
    const avatarFile = URL.createObjectURL(avatar);
    console.log(userData.user.tokenId)
    setAvatar(avatarFile);
    setData({ ...data, avatar: avatar });
  };
  const defaultImg = userData.user.avatar;

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | My Account</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        My Account
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-30 pt-50">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="d-flex align-items-center justify-content-center mb-5">
                  <p className="h2">View my account</p>
                </div>
                <div className="container pd-80 pt-30"></div>
                <div className="single-my-account mb-20">
                  <div className="myaccount-info-wrapper">
                    <div className=" mx-auto row">
                      <img
                        src={avatar ? avatar : defaultImg}
                        className="mb-4"
                        style={{
                          width: "150px",
                          height: "150px",
                        }}
                        alt="Avatar"
                      />
                      <div className="col-lg-6">
                        <FileInput onChange={callbackChangeFile} />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                          <label>Full Name</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                          <label>Email Address</label>
                          <input
                            className="disabled"
                            type="email"
                            placeholder={userData.user.gmail}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info">
                          <label>Phone Number</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info">
                          <label>Student Code</label>
                          <input type="text" />
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                          <label>Address</label>
                          <input type="email" />
                        </div>
                      </div>
                    </div>
                    <div className="billing-back-btn">
                      <div className="billing-btn">
                        <button type="submit">Continue</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object,
};

export default MyAccount;
