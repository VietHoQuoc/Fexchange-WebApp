import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import Swiper from 'react-id-swiper';

const ImageSlider = (props) => {
    const params = {
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        rebuildOnUpdate: true,
        watchSlidesVisibility: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        renderPrevButton: () => (
            <button
                className="swiper-button-prev ht-swiper-button-nav "
                style={{ left: '0' }}
            >
                <i className="pe-7s-angle-left" />
            </button>
        ),
        renderNextButton: () => (
            <button
                className="swiper-button-next ht-swiper-button-nav"
                style={{ right: '0' }}
            >
                <i className="pe-7s-angle-right" />
            </button>
        ),
    };
    const { images } = props;
    return images?.length ? (
        // <AwesomeSlider
        //     play={true}
        //     interval={5000}
        //     style={{
        //         width: 300,
        //         height: 400,
        //     }}
        //     bullets={false}
        //     onTransitionRequest={(e) => console.log(e)}
        //     buttonContentRight={<div>NExt</div>}
        // >
        // {images.map((image, index) => (
        //     <div key={index + '-product-images'} className="h-100">
        //         {/* render image slider here */}
        //         <img
        //             className="image-slider__item"
        //             src={image['data_url']}
        //             alt=""
        //         ></img>
        //     </div>
        // ))}
        // </AwesomeSlider>
        <div className="slider-area image-slider">
            <div className="slider-active nav-style-1">
                <Swiper {...params}>
                    {images.map((image, index) => (
                        <div key={index} className="swiper-slide image-slider">
                            <img
                                className="image-slider__item"
                                src={image['data_url']}
                                alt="none"
                            ></img>
                        </div>
                    ))}
                </Swiper>
            </div>
        </div>
    ) : null;
};

export default ImageSlider;
