import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";

const ManageProduct = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Admin</title>
        <meta name="description" content="Page for admin" />
      </MetaTags>
      <Fragment>
        <div className="admin-page">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Category ID</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Goods Status</th>
                <th scope="col">Account Name</th>
                <th scope="col">Status</th>
                <th scope="col">Number of exchanges</th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Fragment>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    products: state.productData.products,
  };
};

export default connect(mapStateToProps)(ManageProduct);
