import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { get, post, put } from '../../utils/api/notificationApi';
import SingleNotification from './SingleNotification';

const NotificationCenter = ({ isOpen }) => {
  const [notifications, setNotifications] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState({});
  const [modalMessage, setModalMessage] = useState('');
  const toggleModal = (notification) => () => {
    setSelectedNotification(notification);
    setIsModalOpen((prev) => !prev);
  };
  const currentUser = useSelector((state) => state?.authData?.user);
  useEffect(() => {
    const fetchNotification = async () => {
      const response = await get(
        '/notifications/10/1',
        {
          accountId: 4,
        },
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + currentUser?.tokenId,
        }
      );
      setNotifications(response.data);
      setIsDataLoaded(true);
    };
    if (notifications.length === 0 && !isDataLoaded) {
      fetchNotification();
    }
  });

  return (
    <>
      {isOpen ? (
        <div
          className="bg-white position-absolute p-4 shadow-sm rounded"
          style={{
            zIndex: 9999,
            height: '400px',
            width: '300px',
            transform: 'translate(-50%, 6%)',
          }}
        >
          <h4 className="font-weight-bold">Notification Center</h4>
          <ul>
            {notifications.map((notification) => (
              <SingleNotification
                key={`notification-${notification?.id}`}
                notification={notification}
                currentUser={currentUser}
                toggleModal={toggleModal(notification)}
                setModalMessage={setModalMessage}
              />
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
      {isModalOpen ? (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: 'block', zIndex: 9999 }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Notification Details</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setIsModalOpen(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{modalMessage.message}</p>
              </div>
              <div className="modal-footer">
                {modalMessage.status === 'request' ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        put(
                          `/notifications/${selectedNotification?.id}`,
                          {
                            subject: 'request accepted',
                          },
                          {},
                          {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + currentUser?.tokenId,
                          }
                        ).catch((err) => console.error(err));

                        post(
                          `/notifications`,
                          {
                            accountId: selectedNotification?.buyerId,
                            subject: 'response accepted',
                            orderId: selectedNotification?.orderId,
                            product1Id: selectedNotification?.product1Id,
                            buyerId: selectedNotification?.buyerId,
                            createdDate: new Date().toISOString(),
                          },
                          {},
                          {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + currentUser?.tokenId,
                          }
                        ).catch((err) => console.error(err));
                        setIsModalOpen(false);
                      }}
                      style={{ fontSize: '1rem' }}
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={() => {
                        put(
                          `/notifications/${selectedNotification?.id}`,
                          {
                            subject: 'request rejected',
                          },
                          {},
                          {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + currentUser?.tokenId,
                          }
                        )
                          .then(() =>
                            console.log('Put notification successfully')
                          )
                          .catch((err) => console.error(err));

                        post(
                          `/notifications`,
                          {
                            accountId: selectedNotification?.buyerId,
                            subject: 'response rejected',
                            orderId: selectedNotification?.orderId,
                            product1Id: selectedNotification?.product1Id,
                            buyerId: selectedNotification?.buyerId,
                            createdDate: new Date().toISOString(),
                          },
                          {},
                          {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + currentUser?.tokenId,
                          }
                        )
                          .then(() => console.log('Post new noti successfully'))
                          .catch((err) => console.error(err));
                        setIsModalOpen(false);
                      }}
                      style={{ fontSize: '1rem' }}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setIsModalOpen(false)}
                    style={{ fontSize: '1rem' }}
                  >
                    OK
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default NotificationCenter;
