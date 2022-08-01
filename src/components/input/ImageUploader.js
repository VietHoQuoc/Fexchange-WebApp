import React, {
    forwardRef,
    Fragment,
    useEffect,
    useRef,
    useState,
} from 'react';
import ImageUploading from 'react-images-uploading';

import { Button, Overlay, OverlayTrigger, Toast } from 'react-bootstrap';
import ImageSlider from '../../pages/other/ImagesSlide';

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
                            <div className="col-8">
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
export default ImageUploader;
