import React from 'react';
import { Card } from 'react-bootstrap';
import ProductRating from '../../../components/product/sub-components/ProductRating';
import { Button } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { setOrderId } from '../../../redux/actions/orderAction';
import { useSelector } from 'react-redux';
import ordersApi from './../../../utils/api/orderApi';
import { useToasts } from 'react-toast-notifications';
import productApi from './../../../utils/api/productApi';
import { post } from './../../../utils/api/notificationApi';
const Order = (props) => {
    const { order, setOrder } = props;
    const userData = useSelector((state) => state.authData);
    const history = useHistory();
    const dispatch = useDispatch();
    const { addToast } = useToasts();
    const onReview = (e) => {
        dispatch(setOrderId(order.id));
        history.push(`/rating?id=${order.id}`);
    };
    const onChangeStatus = async (status) => {
        const success = await ordersApi
            .changeStatus(order, userData.user.id, status, userData.tokenId)
            .then((res) => {
                setOrder((orders) =>
                    orders.map((item) => {
                        if (item.id === order.id) {
                            return {
                                ...item,
                                status: status,
                            };
                        }
                        return item;
                    })
                );
                addToast('Successfully ' + status, {
                    appearance: 'success',
                });
                return res;
                // history.go(0);
            })
            .catch((err) => console.log(err));
        if (success.data === 'OK') {
            await productApi.get(order.productId).then((res) => {
                const product = {
                    ...res,
                    goodsStatus: status === 'Accepted' ? 3 : 4,
                };
                post(
                    `/notifications`,
                    {
                        accountId: order.buyerId,
                        subject:
                            'response ' + status === 'Accepted'
                                ? 'accepted'
                                : 'rejected',
                        orderId: order.id,
                        product1Id: order.productId,
                        buyerId: order.buyerId,
                        createdDate: new Date().toISOString(),
                    },
                    {},
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + userData.tokenId,
                    }
                )
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => console.log(err));
                productApi
                    .put(product, userData.tokenId)
                    .catch((err) => console.log(err));
            });
        }
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
                        {order.status.toLowerCase() === 'pending' ? (
                            <div className="d-flex h-100 mb-10 justify-content-end align-items-end">
                                <Button
                                    className="btn-success mr-10"
                                    onClick={() => onChangeStatus('Accepted')}
                                >
                                    Accept
                                </Button>
                                <Button
                                    className="btn-danger"
                                    onClick={() => onChangeStatus('Declined')}
                                >
                                    Decline
                                </Button>
                            </div>
                        ) : (
                            <div className="d-flex justify-content-end align-items-end"></div>
                        )}
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default Order;
