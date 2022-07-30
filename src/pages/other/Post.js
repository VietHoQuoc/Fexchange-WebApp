import React, {
    forwardRef,
    Fragment,
    useEffect,
    useRef,
    useState,
} from 'react';
import { MetaTags } from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from './../../wrappers/breadcrumb/Breadcrumb';
import DateInput from '../../components/input/DatePicker';
import categoryApi from './../../utils/api/categoryApi';
import ImageUploading from 'react-images-uploading';
import Select from 'react-select';
import { Button, Overlay, OverlayTrigger, Toast } from 'react-bootstrap';
import ImageSlider from './ImagesSlide/index';
import productApi from './../../utils/api/productApi';
import { ToastConsumer } from 'react-toast-notifications';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import TooltipBox from './../../components/tooltip/index';
const ImageUploader = (props) => {
    const { maxNumber, images, onChange } = props;
    // if (images.length > 0) console.log(images[0].file);
    return (
        <div className="row">
            <ImageUploading
                className="col-12"
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    <div className="container">
                        <div className="row row-cols-2 ">
                            <div className="col-6">
                                <div className="d-flex">
                                    <Button
                                        className={
                                            'col-3 indigo-300 btn btn-' +
                                            (isDragging ? 'success' : 'primary')
                                        }
                                        onClick={onImageUpload}
                                        {...dragProps}
                                    >
                                        Load
                                    </Button>
                                    <Button
                                        className="col bg-indigo-100 ml-3 btn btn-warning"
                                        onClick={onImageRemoveAll}
                                    >
                                        Remove all images
                                    </Button>
                                </div>
                            </div>
                            <div className="col-6">
                                <ImageSlider images={imageList}></ImageSlider>
                            </div>
                        </div>
                    </div>
                )}
            </ImageUploading>
        </div>
    );
};
const Post = (props) => {
    //TODO: get user id and name from local storage
    //TODO: redirect to manage path and make a toast
    const { pathname } = props;
    const { addToast } = useToasts();
    const history = useHistory();
    const [categoriesDataShow, setCategoriesDataShow] = useState([]);
    const [showInvalid, setShowInvalid] = useState({
        selectBox: false,
    });
    const [images, setImages] = useState([]);
    const [data, setData] = useState({
        id: 0,
        name: '',
        price: 0,
        boughtDate: new Date(),
        goodsStatus: 1,
        description: '',
        status: '',
        accountId: '',
        categoryId: undefined,
        accountName: 'Đăng', //TODO: change to user when login success
        categoryName: 'Unknown',
        numberOfExchangeDesires: 1,
        files: [],
    });
    const onImageUpload = (imagesList, addUpdateIndex) => {
        setImages(imagesList);
        const tmpFile = imagesList.map((item) => item.file);
        setData({
            ...data,
            files: tmpFile,
        });
    };
    useEffect(() => {
        const getCategories = async () => {
            let tmpShowCategories = [];
            for (let i = 1; i < 8; i++) {
                const data = await categoryApi
                    .get(i)
                    .then((res) => res)
                    .catch((err) => err);
                tmpShowCategories.push({
                    value: data.id || 0,
                    label: data.category1 || 'other',
                });
            }
            setCategoriesDataShow(tmpShowCategories);
        };
        getCategories();
    }, [data]);
    const onSubmit = async (e) => {
        e.preventDefault();
        productApi
            .post(data)
            .then((res) => {
                console.log(res);
                history.push('/'); //TODO: redirect to manage page
                addToast('Success', { appearance: 'success' });
            })
            .catch((err) => {
                console.log(err);
                addToast('Some thing went wrong', {
                    appearance: 'error',
                });
            });
    };

    return (
        <Fragment>
            <MetaTags>
                <title>FEX| Post product</title>
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>
                Home
            </BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                Post
            </BreadcrumbsItem>
            <LayoutOne>
                <Breadcrumb />
                <div className="container pd-80 pt-100">
                    <div className="d-flex align-items-center justify-content-center mb-5">
                        <p className="h2">Create your product</p>
                    </div>
                </div>
                <form className="row" onSubmit={(e) => onSubmit(e)}>
                    <div className="container col-sm-10 col-lg-8 col-xl-6 post-form">
                        <div className="row m-1 m-md-3">
                            <div className="col">
                                <label className="form-label">
                                    Product name
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            name: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className="col-3">
                                <label className="form-label">Price</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="price"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            price: parseInt(e.target.value),
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className="col-3">
                                <label className="form-label">
                                    Exchange desires
                                </label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="exchangeDesires"
                                    value={data.numberOfExchangeDesires}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            numberOfExchangeDesires: parseInt(
                                                e.target.value
                                            ),
                                        })
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div className="row m-3">
                            <div className="col">
                                <label className="form-label">
                                    Description
                                </label>
                                <textarea
                                    className="form-control"
                                    type="text"
                                    name="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            description: e.target.value,
                                        })
                                    }
                                    required
                                    rows="5"
                                />
                            </div>
                        </div>
                        <div className="row m-3 ">
                            <div className="col-3">
                                <label className="form-label">
                                    Bought date
                                </label>
                                <DateInput
                                    required
                                    className="form-control"
                                    selected={data.boughtDate}
                                    onChange={(date) => {
                                        setData({
                                            ...data,
                                            boughtDate: date,
                                        });
                                        console.log(date);
                                    }}
                                ></DateInput>
                            </div>
                            <div className="col-3">
                                <label className="form-label">Status</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            status: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="col-6 select-wrapper-container">
                                <label className="form-label">Category</label>
                                <Select
                                    className="position-relative zindex-dropdown select-wrapper"
                                    options={categoriesDataShow}
                                    components={{
                                        IndicatorSeparator: null,
                                    }}
                                    styles={{
                                        menu: (base) => ({
                                            ...base,
                                            zIndex: 1000,
                                        }),
                                    }}
                                    onChange={(selected) => {
                                        setData({
                                            ...data,
                                            categoryName: selected.label,
                                            categoryId: selected.value,
                                        });
                                    }}
                                ></Select>
                                <input
                                    className="input-required"
                                    type="text"
                                    value={data.categoryId}
                                    tabIndex={-1}
                                    autoComplete="off"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row m-3">
                            <div className="col-12">
                                <label className="form-label">Images</label>
                                <ImageUploader
                                    maxNumber={23}
                                    images={images}
                                    onChange={onImageUpload}
                                />
                            </div>
                        </div>
                        <div className="container-fluid d-flex justify-content-end 6">
                            <input
                                type="submit"
                                value="Create"
                                className="col-2 btn btn-primary"
                            />
                        </div>
                    </div>
                </form>
            </LayoutOne>
        </Fragment>
    );
};

export default Post;
