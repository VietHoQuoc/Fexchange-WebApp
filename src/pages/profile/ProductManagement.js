/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { MetaTags } from 'react-meta-tags';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import { useReducer } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import Product from './Product';
import DateInput from '../../components/input/DatePicker';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import categoryApi from '../../utils/api/categoryApi';
import ImageUploader from '../../components/input/ImageUploader';
import productApi from '../../utils/api/productApi';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';

const TabLink = ({ tabIndex, onClick, children, active }) => {
    return (
        <li class="nav-item" role="presentation">
            <a
                className={`nav-link ${
                    active ? 'active font-weight-bold' : ''
                }`}
                id={`tab-${tabIndex}`}
                data-mdb-toggle="tab"
                role="tab"
                onClick={() => onClick(tabIndex)}
                aria-controls="ex3-tabs-3"
                aria-selected={active}
                href="#"
            >
                {children}
            </a>
        </li>
    );
};

const TabContent = ({ products, onChange, onDelete }) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [form, setForm] = useState();
    const [categoriesDataShow, setCategoriesDataShow] = useState([]);
    const [images, setImages] = useState();

    useEffect(() => {
        const getCategories = async () => {
            let tmpShowCategories = [];
            let data = '';
            let i = 1;
            do {
                data = await categoryApi
                    .get(i++)
                    .then((res) => res)
                    .catch((err) => err);
                tmpShowCategories.push({
                    value: data.id || 0,
                    label: data.category1 || 'other',
                });
            } while (data.data !== '');
            tmpShowCategories.pop();
            setCategoriesDataShow(tmpShowCategories);
        };
        getCategories();
    }, [form]);

    const addImageFromDB = (form) => {
        if (form) {
            let imageArray = [];
            form.images.map((item) => {
                imageArray.push({
                    data_url: item.image,
                });
            });
            setImages(imageArray);
        }
    };

    const onImageUpload = (imagesList, addUpdateIndex) => {
        setImages(imagesList);
        const tmpFile = imagesList.map((item) => item.file);
        setForm({
            ...form,
            files: tmpFile,
        });
    };

    const showModal = () => {
        setIsShowModal(true);
    };

    const hideModal = () => {
        setIsShowModal(false);
    };

    const submitChange = () => {
        onChange(form);
        setIsShowModal(false);
    };

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const RenderSwitch = (goodsStatus) => {
        switch (goodsStatus) {
            case 1:
                return 'Pending';
                break;
            case 2:
                return 'On-sale';
                break;
            case 3:
                return 'Sold';
                break;
            case 4:
                return 'Rejected';
                break;

            default:
                break;
        }
    };
    const confirmDelete = () => {
        if (window.confirm('Are you sure to delete this product?') === true) {
            setIsShowModal(false);
            onDelete(form);
        }
    };

    return (
        // <div class="tab-content" id="ex2-content">
        //     <div
        //         class="tab-pane fade show active d-flex flex-wrap"
        //         id="ex3-tabs-1"
        //         role="tabpanel"
        //         aria-labelledby="ex3-tab-1"
        //     >
        //         {products?.map((product) => (
        // <Product key={`product-${product.id}`} product={product} />
        //         ))}
        //     </div>
        // </div>

        <div className="container">
            <div className="row">
                {products && products.length > 0 ? (
                    <div className="col-12">
                        <div className="table-content table-responsive cart-table-content">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Product Name</th>
                                        <th>Unit Price</th>
                                        <th>Product Status</th>
                                        <th>action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => {
                                        return (
                                            <tr key={`product-${product.id}`}>
                                                <td className="product-thumbnail">
                                                    <Link
                                                        to={
                                                            process.env
                                                                .PUBLIC_URL +
                                                            '/product/' +
                                                            product.id
                                                        }
                                                    >
                                                        {product.images !==
                                                        null ? (
                                                            <img
                                                                width="130px"
                                                                height="130px"
                                                                variant="top"
                                                                className="default-img"
                                                                src={
                                                                    product
                                                                        ?.images[0]
                                                                        ?.image
                                                                }
                                                                alt=""
                                                            />
                                                        ) : (
                                                            <img
                                                                width="100px"
                                                                height="130px"
                                                                alt=""
                                                                src="../../../public/assets/img/icon-img/13.png"
                                                            />
                                                        )}
                                                    </Link>
                                                </td>

                                                <td className="product-name text-center">
                                                    <Link
                                                        to={
                                                            process.env
                                                                .PUBLIC_URL +
                                                            '/product/' +
                                                            product.id
                                                        }
                                                    >
                                                        {product.name}
                                                    </Link>
                                                </td>
                                                <td className="product-price-cart">
                                                    <Link
                                                        to={
                                                            process.env
                                                                .PUBLIC_URL +
                                                            '/product/' +
                                                            product.id
                                                        }
                                                    >
                                                        {product.price}đ
                                                    </Link>
                                                </td>

                                                <td className="product-name text-center">
                                                    <Link
                                                        to={
                                                            process.env
                                                                .PUBLIC_URL +
                                                            '/product/' +
                                                            product.id
                                                        }
                                                    >
                                                        {RenderSwitch(
                                                            product.goodsStatus
                                                        )}
                                                    </Link>
                                                </td>
                                                <td className="product-wishlist-cart">
                                                    <Button
                                                        onClick={() => {
                                                            setForm(product);
                                                            addImageFromDB(
                                                                product
                                                            );
                                                            showModal();
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="col-lg-12">
                        <div className="item-empty-area text-center">
                            <div className="item-empty-area__text">
                                No items found <br />{' '}
                                <Link
                                    to={
                                        process.env.PUBLIC_URL +
                                        '/shop-grid-standard'
                                    }
                                >
                                    Add Items
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
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
                                <Form.Label>Goods Status</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={RenderSwitch(form.goodsStatus)}
                                    disabled
                                    readOnly
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
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    id="description"
                                    onChange={handleFormChange}
                                    type="text"
                                    value={form.description}
                                    rows="5"
                                />
                            </Form.Group>

                            <div className="row">
                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label>Category</Form.Label>
                                    <Select
                                        className="position-relative zindex-dropdown select-wrapper"
                                        options={categoriesDataShow}
                                        components={{
                                            IndicatorSeparator: null,
                                        }}
                                        defaultValue={{
                                            label: form.categoryName,
                                            value: form.categoryId,
                                        }}
                                        styles={{
                                            menu: (base) => ({
                                                ...base,
                                                zIndex: 1000,
                                            }),
                                        }}
                                        onChange={(selected) => {
                                            setForm({
                                                ...form,
                                                categoryName: selected.label,
                                                categoryId: selected.value,
                                            });
                                        }}
                                        required
                                    ></Select>
                                </Form.Group>
                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label>Brought Date</Form.Label>
                                    <DateInput
                                        required
                                        className="form-control"
                                        selected={new Date(form.boughtDate)}
                                        onChange={(date) => {
                                            setForm({
                                                ...form,
                                                boughtDate: date,
                                            });
                                        }}
                                    ></DateInput>
                                </Form.Group>
                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label>Image</Form.Label>
                                    <ImageUploader
                                        maxNumber={23}
                                        images={images}
                                        onChange={onImageUpload}
                                    />
                                </Form.Group>
                            </div>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={submitChange}>Update</Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={hideModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const Tab = ({ products, onChange, onDelete }) => {
    const currentTabDataReducer = (state, action) => {
        const TABS_FILTER = {
            0: function (product) {
                return product?.goodsStatus === 1;
            },
            1: function (product) {
                return product?.goodsStatus === 2;
            },
            2: function (product) {
                return product?.goodsStatus === 3;
            },
            3: function (product) {
                return product?.goodsStatus === 4;
            },
        };
        const { type } = action;

        switch (type) {
            case 0:
            case 1:
            case 2:
            case 3:
                return products.filter(TABS_FILTER[type]);
            default:
                throw new Error();
        }
    };

    const [currentTab, setCurrentTab] = useState(0);
    const [currentTabData, dispatchCurrentTabData] = useReducer(
        currentTabDataReducer,
        []
    );
    useEffect(() => {
        dispatchCurrentTabData({ type: currentTab });
    }, [currentTab, products]);

    const onChangeTab = (tabIndex) => {
        setCurrentTab(tabIndex);
        dispatchCurrentTabData({ type: tabIndex, products: products });
    };

    return (
        <div>
            <ul class="nav nav-tabs nav-justified mb-3" id="ex1" role="tablist">
                <TabLink
                    tabIndex={0}
                    onClick={onChangeTab}
                    active={currentTab === 0}
                >
                    Pending
                </TabLink>
                <TabLink
                    tabIndex={1}
                    onClick={onChangeTab}
                    active={currentTab === 1}
                >
                    On-sale
                </TabLink>
                <TabLink
                    tabIndex={2}
                    onClick={onChangeTab}
                    active={currentTab === 2}
                >
                    Sold
                </TabLink>
                <TabLink
                    tabIndex={3}
                    onClick={onChangeTab}
                    active={currentTab === 3}
                >
                    Rejected
                </TabLink>
            </ul>
            <TabContent
                products={currentTabData}
                onChange={onChange}
                onDelete={onDelete}
            />
        </div>
    );
};

const ProductManagement = ({ location }) => {
    const { pathname } = location;
    const [products, setProducts] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const tempId = useSelector((state) => state.authData.user?.id);
    const [accountId] = useState(tempId);
    const { addToast } = useToasts();
    const userData = useSelector((state) => state.authData);
    const history = useHistory();
    const onChange = (data) => {
        data = { ...data, goodsStatus: 1 };
        console.log('day la product', products);
        updateProduct(data);
    };
    const onDelete = (data) => {
        deleteProduct(data);
    };
    const deleteProduct = (data) => {
        productApi
            .delete(data, userData.tokenId)
            .then((res) => {
                addToast('Success', { appearance: 'Delete success' });
                let tempProduct = products.map((item) => {
                    if (item.id === data.id) {
                        return data;
                    }
                    return item;
                });

                setProducts(tempProduct);
            })
            .catch((err) => {
                console.log(err);
                addToast('Some thing went wrong', {
                    appearance: 'error',
                });
            });
    };
    const updateProduct = async (data) => {
        productApi
            .put(data, userData.tokenId)
            .then((res) => {
                setProducts(
                    products.map((item) => {
                        if (item.id === data.id) {
                            return data;
                        }
                        return item;
                    })
                );
                addToast('Success', { appearance: 'success' });
            })

            .catch((err) => {
                console.log(err);
                addToast('Some thing went wrong', {
                    appearance: 'error',
                });
            });
    };
    useEffect(() => {
        const fetchPost = async () => {
            if (products.length === 0 && !isDataLoaded) {
                setProducts(
                    await fetch(
                        'https://fbuyexchange.azurewebsites.net/api/productposts/1/1000?all=true'
                    )
                        .then((res) => res.json())
                        .then((res) => {
                            return res.filter(
                                (product) => product.accountId === accountId
                            );
                        })
                        .then((res) => {
                            setIsDataLoaded(true);
                            return res;
                        })
                        .catch((err) => console.error(err))
                );
            }
        };
        fetchPost();
    }, [products, accountId, isDataLoaded]);

    return accountId !== undefined ? (
        <Fragment>
            <MetaTags>
                <title>Flone | Product Management</title>
                <meta
                    name="description"
                    content="About page of flone react minimalist eCommerce template."
                />
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>
                Home
            </BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                Product Management
            </BreadcrumbsItem>
            <LayoutOne>
                <Breadcrumb />

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row d-flex flex-column">
                            <Tab
                                products={products}
                                onChange={onChange}
                                onDelete={onDelete}
                            />
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    ) : (
        <Redirect to="/login-register" />
    );
};

export default ProductManagement;
