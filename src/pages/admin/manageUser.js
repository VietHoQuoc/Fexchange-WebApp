import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";

const ManageUser = (props) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [form, setForm] = useState();
  let userID;
  const renderRow = () => {
    return props.userList.length > 0 ? (
      props.userList.map((user, idx) => {
        return (
          <tr
            key={idx}
            role="button"
            class="data-row"
            onClick={() => {
              userID = idx;
              setForm(props.userList[userID]);
              showModal();
            }}
          >
            <th scope="row" class="align-middle">
              {user.id}
            </th>
            <td class="align-middle">{user.fullName}</td>
            <td class="align-middle">{user.gmail}</td>
            <td class="align-middle">{user.role1}</td>
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
  };

  const hideModal = () => {
    setIsShowModal(false);
  };

  const confirmBan = () => {
    if (window.confirm("Are you sure to ban this user?") === true) {
      props.changeInfo({ ...form, status: "Inactive" });
      setIsShowModal(false);
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const submitChange = () => {
    props.changeInfo(form);
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
          {form === undefined ? (
            ""
          ) : (
            <Form>
              <Form.Group>
                <Form.Label>ID: </Form.Label>
                <Form.Control value={form.id} disabled readOnly></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  id="fullName"
                  onChange={handleFormChange}
                  type="text"
                  value={form.fullName}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  id="gmail"
                  onChange={handleFormChange}
                  type="email"
                  value={form.gmail}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                  id="avatar"
                  type="text"
                  value={form.avatar}
                  onchange={handleFormChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  onChange={handleFormChange}
                  type="phone"
                  value={form.phone}
                  id="phone"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control type="address" value={form.address} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  onChange={handleFormChange}
                  type="text"
                  value={form.role1}
                  id="role1"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Number of product posts</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  disabled
                  value={form.numberOfProductPosts}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Number of orders</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  disabled
                  value={form.numberOfOrders}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Number of notifications</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  disabled
                  value={form.numberOfNotifications}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  onChange={handleFormChange}
                  type="text"
                  value={form.status}
                  id="status"
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitChange}>Update</Button>
          {form?.status === "Active" ? (
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
