import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { useSelector, useDispatch } from 'react-redux';

import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import adminUserApi from '../../utils/api/userApi';
import { updateProfile } from '../../redux/actions/authActions';

const MyAccount = ({ location }) => {

    const userData = useSelector((state) => state.authData);
    const { pathname } = location;
    //remove previous img when set new img
    const [data, setData] = useState({
        fullName: userData.user.fullName,
        address: userData.user.address,
        phone: userData.user.phone,
    });
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        await adminUserApi.put(userData.user.id, data, userData.tokenId);
        const response = await adminUserApi.get(
            userData.user.id,
            userData.tokenId
        );
        dispatch(updateProfile(response.data));
    };

    let result = userData.user.gmail.substr(-19, 8);
    let finalResult = result.toUpperCase();

    const callbackChangeFullname = (e) => {
        e.preventDefault();
        setData({
            ...data,
            fullName: e.target.value,
        });
    };
    const callbackChangePhoneNumber = (e) => {
        e.preventDefault();
        setData({
            ...data,
            phone: e.target.value,
        });
    };
    const callbackChangeAddress = (e) => {
        e.preventDefault();
        setData({
            ...data,
            address: e.target.value,
        });
    };

    // const callbackChangeFile = (avatar) => {
    //     const avatarFile = URL.createObjectURL(avatar);
    //     setAvatar(avatarFile);
    //     setData({ ...data, avatar: avatar });
    // };

    return (
        <Fragment>
            <MetaTags>
                <title>Flone | My Account</title>
                <meta
                    name="description"
                    content="Compare page of flone react minimalist eCommerce template."
                />
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>
                Home
            </BreadcrumbsItem>
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
                                <form
                                    className="row"
                                    onSubmit={(e) => onSubmit(e)}
                                >
                                    <div className="single-my-account mb-20">
                                        <div className="myaccount-info-wrapper">
                                            <div className=" mx-auto row">
                                                <img
                                                    src={userData.user.avatar}
                                                    className="mb-4"
                                                    referrerPolicy="no-referrer"
                                                    style={{
                                                        width: '150px',
                                                        height: '150px',
                                                    }}
                                                    alt="Avatar"
                                                />
                                                {/* <div className="col-lg-6">
                                                <FileInput
                                                    onChange={
                                                        callbackChangeFile
                                                    }
                                                />
                                            </div> */}
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-12 col-md-12">
                                                    <div className="billing-info">
                                                        <label>Full Name</label>
                                                        <input
                                                            type="text"
                                                            value={
                                                                data.fullName
                                                            }
                                                            onChange={
                                                                callbackChangeFullname
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 col-md-12">
                                                    <div className="billing-info">
                                                        <label>
                                                            Email Address
                                                        </label>
                                                        <input
                                                            className="disabled"
                                                            type="email"
                                                            placeholder={
                                                                userData.user
                                                                    .gmail
                                                            }
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="billing-info">
                                                        <label>
                                                            Phone Number
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            value={data.phone}
                                                            required
                                                            onChange={
                                                                callbackChangePhoneNumber
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="billing-info">
                                                        <label>
                                                            Student Code
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder={
                                                                finalResult
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-12 col-md-12">
                                                    <div className="billing-info">
                                                        <label>Address</label>
                                                        <input
                                                            type="text"
                                                            value={data.address}
                                                            required
                                                            onChange={
                                                                callbackChangeAddress
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="billing-back-btn">
                                                <div className="billing-btn">
                                                    <button type="submit">
                                                        Continue
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
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
