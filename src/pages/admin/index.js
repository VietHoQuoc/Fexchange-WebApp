import React, { Fragment, useState, useEffect } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ManageUser from "./manageUser";
import ManageProduct from "./manageProduct";
import { useDispatch, useSelector } from "react-redux";

import userApi from "../../utils/api/userApi";

import "./admin.css";

const Admin = ({ location }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await userApi.get(3);
      setUserList([...userList, response]);
    };
    getData();
  }, []);

  const changeInfo = () => {
    const getData = async () => {
      const response = await userApi.get(3);
      setUserList([response]);
    };
    getData();
  };

  return (
    <Fragment>
      <header>
        <nav
          id="sidebarMenu"
          class="collapse d-lg-block sidebar collapse bg-white"
        >
          <div class="position-sticky">
            {/* put a logo here */}
            <div class="list-group list-group-flush mx-3">
              <div></div>
              <Link
                role="button"
                to={process.env.PUBLIC_URL + "/admin/user"}
                class={`list-group-item list-group-item-action py-2 ripple ${
                  location.pathname === "/admin/user" ? "active" : ""
                }`}
              >
                User Management
              </Link>
              <Link
                to={process.env.PUBLIC_URL + "/admin/product"}
                role="button"
                class={`list-group-item list-group-item-action py-2 ripple ${
                  location.pathname === "/admin/product" ? "active" : ""
                }`}
              >
                Product Management
              </Link>
              <div></div>
            </div>
          </div>
        </nav>
      </header>
      <Redirect to={process.env.PUBLIC_URL + "/admin/user"} />
      <Route path={process.env.PUBLIC_URL + "/admin/user"}>
        {userList.length > 0 ? (
          <ManageUser userList={userList} changeInfo={changeInfo} />
        ) : (
          ""
        )}
      </Route>
      <Route
        path={process.env.PUBLIC_URL + "/admin/product"}
        component={ManageProduct}
      />
    </Fragment>
  );
};

Admin.propTypes = {};

const mapStateToProps = (state) => {
  return {
    products: state.productData.products,
  };
};

export default connect(mapStateToProps)(Admin);
