import React from 'react';
import { Card } from 'react-bootstrap';
import ProductRating from '../../../components/product/sub-components/ProductRating';
import { Button } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { setOrderId } from '../../../redux/actions/orderAction';
import { useSelector } from 'react-redux';
import ordersApi from './../../../utils/api/orderApi';
const Order = (props) => {
    const { order } = props;
    const userData = useSelector((state) => state.authData);
    const history = useHistory();
    const dispatch = useDispatch();
    const onReview = (e) => {
        dispatch(setOrderId(order.id));
        history.push(`/rating?id=${order.id}`);
    };
    const onChangeStatus = async () => {
        await ordersApi
            .changeStatus(order, 'Accepted', userData.tokenId)
            .then((res) => {
                console.log(res);
            })
            .then((err) => console.log(err));
        // history.push('/orders-management');
    };

    return (
        <Card className="w-100 mb-3">
            <Card.Title className="row p-3">
                <div className="col-12 col-md-6 mb-3">
                    <p className="h4 text-capitalize"> {order.product1Name} </p>
                    <span>Rate: </span>
                    <div className="h5 product-rating d-sm-inline">
                        <ProductRating ratingValue={order.rate} />
                    </div>
                </div>
            </Card.Title>

            <Card.Body className="row">
                <div className="col-12 col-md-6 mb-3">
                    <p className="h6">Price: {order.price} VNĐ</p>
                    {order.buyerId !== userData.user.id ? (
                        <p className="h6">Buyer name: {order.buyerName}</p>
                    ) : (
                        <></>
                    )}
                    <p>
                        <span className="h6">Feedback: </span>
                        {order.feedback === '' || order.feedback === 'string'
                            ? 'Not yet'
                            : order.feedback}
                    </p>
                </div>

                {userData.user.id === order.buyerId ? (
                    <div className="col-12 col-md-6">
                        {order.status.toLowerCase() === 'pending' ? (
                            <></>
                        ) : (
                            <div className="d-flex  justify-content-end align-items-end">
                                <Button onClick={onReview}>Edit review</Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="col-12 col-md-6">
                        <div className="d-flex h-100 mb-10 justify-content-end align-items-end">
                            <Button
                                className="btn-success mr-10"
                                onClick={() => onChangeStatus('Accepted')}
                            >
                                Accept
                            </Button>
                            <Button
                                className="btn-danger"
                                onClick={onChangeStatus}
                            >
                                Decline
                            </Button>
                        </div>
                        <div className="d-flex justify-content-end align-items-end"></div>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default Order;
