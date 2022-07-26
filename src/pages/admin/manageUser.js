import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import userApi from "../../utils/api/userApi";

const ManageUser = (props) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [form, setForm] = useState({});
  let userID = 0;
  console.log(props.userList);
  const renderRow = () => {
    console.log(props.userList);
    return props.userList.length > 0 ? (
      props.userList.map((user, idx) => {
        return (
          <tr
            key={user.id}
            role="button"
            class="data-row"
            onClick={() => {
              showModal();
              userID = idx;
            }}
          >
            <th scope="row" class="align-middle">
              {user.id}
            </th>
            <td class="align-middle">{user.fullName}</td>
            <td class="align-middle">{user.gmail}</td>
            <td class="align-middle">{user.role}</td>
            <td class="align-middle">{user.address}</td>
            <td class="align-middle">{user.phone}</td>
            <td class="align-middle">{user.status}</td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td>nothing</td>
      </tr>
    );
  };

  const showModal = () => {
    setIsShowModal(true);
    setForm(props.userList[userID]);
  };

  const hideModal = () => {
    setIsShowModal(false);
  };

  const confirmBan = () => {
    if (window.confirm("Are you sure to ban this user?") === true) {
      userApi.delete(userID);
      props.changeInfo();
      setIsShowModal(false);
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const submitChange = () => {
    userApi.put(userID, form);
    props.changeInfo();
    setIsShowModal(false);
  };

  return (
    <Fragment>
      <div className="admin-page">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Full Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Address</th>
              <th scope="col">Phone</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>{renderRow()}</tbody>
        </table>
      </div>
      <Modal show={isShowModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>ID: </Form.Label>
              <Form.Control
                value={props.userList[userID].id}
                disabled
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                onChange={handleFormChange}
                type="text"
                value={props.userList[userID].fullName}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={handleFormChange}
                type="email"
                value={props.userList[userID].gmail}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type="email"
                value={props.userList[userID].avatar}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                onChange={handleFormChange}
                type="phone"
                value={props.userList[userID].phone}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="address"
                value={props.userList[userID].address}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                onChange={handleFormChange}
                type="role"
                value={props.userList[userID].role}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Number of product posts</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={props.userList[userID].numberOfProductPosts}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Number of orders</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={props.userList[userID].numberOfOrders}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Number of notifications</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={props.userList[userID].numberOfNotifications}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                onChange={handleFormChange}
                type="text"
                value={props.userList[userID].status}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitChange}>Update</Button>
          {props.userList[userID].status === "Active" ? (
            <Button variant="danger" onClick={confirmBan}>
              Ban User
            </Button>
          ) : (
            ""
          )}
          <Button variant="secondary" onClick={hideModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.productData.products,
  };
};

export default connect(mapStateToProps)(ManageUser);
