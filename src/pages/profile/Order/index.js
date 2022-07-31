import React from "react";
import { Card } from "react-bootstrap";
import ProductRating from "../../../components/product/sub-components/ProductRating";

const Order = (props) => {
  const { order, statusStyle } = props;
  const STATUS_STYLE = {
    Declined: "text-danger",
    Pending: "text-info",
    "On-Sale": "text-primary",
    Bought: "text-success",
  };
  return (
    <Card className="w-100 mb-3">
      <Card.Title className="row p-3">
        <div className="col-12 col-md-6 mb-3">
          <p className="h4 text-capitalize"> {order.product1Name} </p>
          <p className="h5">
            <span>Your rate: </span>
            <ProductRating ratingValue={order.rate} />
          </p>
        </div>
        <div className="col-12 col-md-6 ">
          <p className={`h5 ${STATUS_STYLE[order.status]} text-md-right`}> {order.status} </p>
        </div>
      </Card.Title>
      <Card.Body className="row">
        <div className="col">
          <p className="h6">Price: {order.price} VNĐ</p>
          <p>
            <span className="h6">Feedback: </span>
            {order.feedback === "" || order.feedback === "string" ? "Not yet" : order.feedback}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Order;
