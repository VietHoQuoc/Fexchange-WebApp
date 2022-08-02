import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";

class Logout extends Component {
    componentWillMount() {
        this.props.logout();
    }

    componentDidMount() {
        //this.props.logout();
    }

    render() {
        return (
            <div>
                <Redirect
                    to={{
                        pathname: "/login-register",
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
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
