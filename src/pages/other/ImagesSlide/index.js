import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { Button } from 'react-bootstrap';

const ModifierContent = (props) => {
    return <Button>Hello</Button>;
};
const ImageSlider = (props) => {
    const { images } = props;
    return images?.length ? (
        <AwesomeSlider
            play={true}
            interval={5000}
            customContent={<ModifierContent />}
            style={{
                width: 300,
                height: 400,
            }}
            bullets={false}
        >
            {images.map((image, index) => (
                <div key={index + '-product-images'} className="h-100">
                    {/* render image slider here */}
                    <img
                        className="image-slider__item"
                        src={image['data_url']}
                        alt=""
                    ></img>
                </div>
            ))}
        </AwesomeSlider>
    ) : null;
};

export default ImageSlider;
