import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';
import { deleteAllFromWishlist } from '../../redux/actions/wishlistActions';

class Logout extends Component {
    componentWillMount() {
        this.props.logout();
        this.props.deleteWishlist();
    }

    componentDidMount() {
        //this.props.logout();
    }

    render() {
        return (
            <div>
                <Redirect
                    to={{
                        pathname: '/login-register',
                    }}
                />
            </div>
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
        logout: () => {
            dispatch(logout());
        },
        deleteWishlist: () => {
            dispatch(deleteAllFromWishlist());
        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
