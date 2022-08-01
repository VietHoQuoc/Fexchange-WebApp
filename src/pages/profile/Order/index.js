import React from 'react';
import { Card } from 'react-bootstrap';
import ProductRating from '../../../components/product/sub-components/ProductRating';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { setOrderId } from '../../../redux/actions/orderAction';
const Order = (props) => {
    const { order, statusStyle } = props;
    const history = useHistory();
    const STATUS_STYLE = {
        Declined: 'text-danger',
        Pending: 'text-info',
        'On-Sale': 'text-primary',
        Bought: 'text-success',
    };
    const onReview = (e) => {
        history.push(`/rating?id=${order.id}`);
    };
    return (
        <Card className="w-100 mb-3">
            <Card.Title className="row p-3">
                <div className="col-12 col-md-6 mb-3">
                    <p className="h4 text-capitalize"> {order.product1Name} </p>
                    <span>Your rate: </span>
                    <p className="h5 product-rating d-sm-inline">
                        <ProductRating ratingValue={order.rate} />
                    </p>
                </div>
            </Card.Title>
            <Card.Body className="row">
                <div className="col-12 col-md-6 mb-3">
                    <p className="h6">Price: {order.price} VNĐ</p>
                    <p>
                        <span className="h6">Feedback: </span>
                        {order.feedback === '' || order.feedback === 'string'
                            ? 'Not yet'
                            : order.feedback}
                    </p>
                </div>
                <div className="col-12 col-md-6">
                    <div className="d-flex justify-content-end align-items-end">
                        <Button onClick={onReview}>Edit review</Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

const mapStateToProps = (state) => {
    return {
        orderId: state.orderId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setOrderId: (id) => {
            dispatch(setOrderId(id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
