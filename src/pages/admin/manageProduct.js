import React, { Fragment, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';

const ManageProduct = (props) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [form, setForm] = useState();
    let productID;
    const renderRow = () => {
        return props.productList.length > 0 ? (
            props.productList.map((product, idx) => {
                return (
                    <tr
                        key={idx}
                        role="button"
                        class="data-row"
                        onClick={() => {
                            productID = idx;
                            setForm(props.productList[productID]);
                            showModal();
                        }}
                    >
                        <th scope="row" class="align-middle">
                            {product.id}
                        </th>
                        <td class="align-middle">{product.categoryId}</td>
                        <td class="align-middle">{product.name}</td>
                        <td class="align-middle">{product.price}</td>
                        <td class="align-middle">{product.goodsStatus}</td>
                        <td class="align-middle">{product.accountName}</td>
                        <td class="align-middle">{product.status}</td>
                        <td class="align-middle">{product.numberOfExchange}</td>
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

    const confirmReject = () => {
        if (window.confirm('Are you sure to reject this product?') === true) {
            props.changeProductInfo({ ...form, goodsStatus: 1 });
            setIsShowModal(false);
        }
    };

    const confirmApprove = () => {
        if (window.confirm('Are you sure to approve this product?') === true) {
            props.changeProductInfo({ ...form, goodsStatus: 2 });
            setIsShowModal(false);
        }
    };

    const confirmDelete = () => {
        if (window.confirm('Are you sure to delete this product?') === true) {
            props.deleteProduct(form.id);
            setIsShowModal(false);
        }
    };

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const submitChange = () => {
        props.changeProductInfo(form);
        setIsShowModal(false);
    };

    return (
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
                            <th scope="col">Number of exchange</th>
                        </tr>
                    </thead>
                    <tbody>{renderRow()}</tbody>
                </table>
            </div>
            <Modal show={isShowModal} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {form === undefined ? (
                        ''
                    ) : (
                        <Form>
                            <Form.Group>
                                <Form.Label>ID: </Form.Label>
                                <Form.Control
                                    value={form.id}
                                    disabled
                                    readOnly
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Category ID</Form.Label>
                                <Form.Control
                                    id="categoryId"
                                    onChange={handleFormChange}
                                    type="text"
                                    value={form.categoryId}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    id="name"
                                    onChange={handleFormChange}
                                    type="text"
                                    value={form.name}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    id="price"
                                    onChange={handleFormChange}
                                    type="text"
                                    value={form.price}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Account Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={handleFormChange}
                                    id="accountName"
                                    value={form.accountName}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.status}
                                    id="status"
                                    onChange={handleFormChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Goods Status</Form.Label>
                                <Form.Control
                                    id="goodsStatus"
                                    onChange={handleFormChange}
                                    type="email"
                                    disable
                                    readOnly
                                    value={form.goodsStatus}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={submitChange}>Update</Button>
                    {form?.goodsStatus !== 1 ? (
                        <Button variant="danger" onClick={confirmReject}>
                            Reject
                        </Button>
                    ) : (
                        <Button variant="success" onClick={confirmApprove}>
                            Approve
                        </Button>
                    )}
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
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

export default connect(mapStateToProps)(ManageProduct);
