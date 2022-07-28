import React, { Component, Fragment } from 'react';
import MetaTags from 'react-meta-tags';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import config from '../../config.json';
import { withRouter, Redirect } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import Axios from 'axios';

class Login extends Component {
    onFailure = (error) => {
        alert(error);
    };

    googleResponse = async (response) => {
        console.log(response);
        if (!response.tokenId) {
            console.error('Unable to get tokenId from Google', response);
            return;
        } else {
            console.log('This is google token id: ' + response.tokenId);
        }

        await Axios({
            method: 'POST',
            url: process.env.REACT_APP_API_URL + '/login/google',
            headers: {
                'Content-Type': 'application/json',
            },
            data: { tokenId: response.tokenId },
        }).then((res) => {
            if (res.data.id !== 0) {
                this.props.login(res.data); // dispatch to redux login
                console.log('>>this is web token id', res.data.tokenId); // delete when review
                return res.data.tokenId;
            }
            alert(
                'This account has been deactivated due to the violation of the terms of use.'
            );

            // dispatch google response data to redux
        });
    };

    render() {
        console.log('>>check props', this.props);
        let content = !!this.props.auth.isAuthenticated ? (
            <Redirect to="/" />
        ) : (
            <div>
                <GoogleLogin
                    clientId={config.GOOGLE_CLIENT_ID}
                    buttonText="Google Login"
                    onSuccess={this.googleResponse}
                    onFailure={this.googleResponse}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        );
        return (
            <Fragment>
                <MetaTags>
                    <title>FExchange | Login</title>
                    <meta
                        name="description"
                        content="Compare page of flone react minimalist eCommerce template."
                    />
                </MetaTags>
                <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>
                    Home
                </BreadcrumbsItem>

                <LayoutOne headerTop="visible">
                    {/* breadcrumb */}
                    <Breadcrumb />

                    <div className="login-register-area pt-100 pb-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                                    <div className="login-register-wrapper">
                                        <Tab.Container defaultActiveKey="login">
                                            <Nav
                                                variant="pills"
                                                className="login-register-tab-list"
                                            >
                                                <Nav.Item>
                                                    <Nav.Link eventKey="login">
                                                        <h4>Login</h4>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="login">
                                                    <div className="login-form-container">
                                                        <div className="login-register-form text-center">
                                                            <h4>
                                                                Login with
                                                                google
                                                            </h4>
                                                            {content}
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Tab.Container>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </LayoutOne>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (token) => {
            dispatch(login(token));
        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
