import React, { useState } from 'react';
import { useEffect } from 'react';
import { get } from '../../utils/api/notificationApi';
import './SingleNotification.css';

const computeCreatedTime = (date) => {
    const now = new Date();
    const result = {
        value: 0,
        unit: '',
    };
    const secondValue = Math.floor(
        (now.getTime() - date.getTime()) / 1000 - 25200
    );
    if (secondValue < 60) {
        result.value = secondValue;
        result.unit = Math.floor(result.value) === 1 ? 'second' : 'seconds';
    } else if (secondValue < 3600) {
        result.value = Math.floor(secondValue / 60);
        result.unit = result.value === 1 ? 'minute' : 'minutes';
    } else if (secondValue < 3600 * 24) {
        result.value = Math.floor(secondValue / 3600);
        result.unit = result.value === 1 ? 'hour' : 'hours';
    } else {
        result.value = Math.floor(secondValue / (3600 * 24));
        result.unit = result.value === 1 ? 'day' : 'days';
    }

    return result;
};

const getModalMessage = (buyer, product, notification, dealer, currentUser) => {
    const modalPayload = {
        message: '',
        status: '',
    };

    console.log(notification);
    // Notification for buyer
    if (notification?.buyerId === notification?.accountId) {
        if (notification?.subject === 'response rejected') {
            modalPayload.message = <div>Your request has been rejected.</div>;
        } else if (notification?.subject === 'response accepted') {
            modalPayload.message = (
                <>
                    <strong>Information of the dealer:</strong> <br /> - Full
                    name: {dealer.fullName} - Phone number: {dealer.phone}
                </>
            );
        } else {
            modalPayload.message = <>Subject is empty</>;
        }
    } else {
        //Notification for dealer
        if (notification?.subject === 'request') {
            modalPayload.message = (
                <>
                    <strong>{buyer.fullName}</strong> requested exchange on{' '}
                    <strong>{product.name}</strong>.
                </>
            );
        } else if (notification?.subject === 'request accepted') {
            modalPayload.message = (
                <>
                    <strong>Information of the buyer:</strong> <br />- Full
                    name: {buyer.fullName}- Phone number: {buyer.phone}
                </>
            );
        } else if (notification?.subject === 'request rejected') {
            modalPayload.message = (
                <>You have rejected this exchange request.</>
            );
        } else {
            modalPayload.message = <>Subject is empty</>;
        }
    }
    modalPayload.status = notification?.subject;
    return modalPayload;
};

const getNotificationMessage = (buyer, product, notification, currentUser) => {
    console.log(notification);
    if (notification?.buyerId === notification?.accountId) {
        if (notification?.subject === 'response accepted') {
            return (
                <>
                    Your request to exchange <strong>{product?.name}</strong>{' '}
                    has been accepted.
                </>
            );
        } else if (notification?.subject === 'response rejected') {
            return (
                <>
                    Your request to exchange <strong>{product?.name}</strong>{' '}
                    has been rejected.
                </>
            );
        }
    } else {
        if (notification?.subject.includes('request')) {
            return (
                <>
                    <strong>{buyer.fullName}</strong> requested exchange on{' '}
                    <strong>{product.name}</strong>.
                </>
            );
        }
    }
};

const SingleNotification = ({
    notification,
    currentUser,
    toggleModal,
    setModalMessage,
}) => {
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [product, setProduct] = useState({});
    const [buyer, setBuyer] = useState({});
    const [innerModalMessage, setInnerModalMessage] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [dealer, setDealer] = useState({});
    const time = computeCreatedTime(new Date(notification?.createdDate));

    useEffect(() => {
        const fetchNotificationRelatedData = async () => {
            let innerProduct = {};
            let buyer = {};
            let dealer = {};
            await get(
                `/productposts/${notification?.product1Id}`,
                {},
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + currentUser?.tokenId,
                }
            ).then((response) => {
                setProduct(response.data);
                innerProduct = response.data;
            });
            console.log(notification);
            if (notification?.buyerId === currentUser?.id) {
                await get(
                    `/acounts/${notification?.buyerId}`,
                    {},
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + currentUser?.tokenId,
                    }
                ).then((response) => {
                    setBuyer(response.data);
                    buyer = response.data;
                    setNotificationMessage(
                        getNotificationMessage(
                            response.data,
                            innerProduct,
                            notification,
                            currentUser
                        )
                    );
                });

                await get(
                    `/productposts/${notification?.product1Id}`,
                    {},
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + currentUser?.tokenId,
                    }
                ).then((response) => {
                    get(
                        `/acounts/${response.data.accountId}`,
                        {},
                        {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + currentUser?.tokenId,
                        }
                    ).then((response) => {
                        setDealer(response.data);
                        setInnerModalMessage(
                            getModalMessage(
                                buyer,
                                innerProduct,
                                notification,
                                response.data,
                                currentUser
                            )
                        );
                    });
                });
            } else {
                setBuyer(currentUser);
            }

            setIsDataLoaded(true);
        };
        if (!isDataLoaded) {
            fetchNotificationRelatedData();
        }
    }, [isDataLoaded, notification, currentUser]);
    return (
        <>
            {isDataLoaded ? (
                <li>
                    <div
                        className="p-2 mb-2 notification-hover"
                        onClick={() => {
                            toggleModal();
                            setModalMessage(innerModalMessage);
                        }}
                    >
                        <div>{notificationMessage}</div>
                        <div className="notification-time">
                            {time.value} {time.unit} ago
                        </div>
                    </div>
                </li>
            ) : (
                ''
            )}
        </>
    );
};

export default SingleNotification;
