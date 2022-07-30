import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import ShopProducts from "./ShopProducts";
import Paginator from 'react-hooks-paginator';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfileDescriptionTab = ({
    spaceBottomClass,
    productFullDesc,
    posts,
    layout,
    postsSold,
}) => {
    const pageLimit = 100;
    // const [offset, setOffset] = useState(0);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [currentData, setCurrentData] = useState([]);
    // const pageLimit2 = 3;
    // const [offset2, setOffset2] = useState(0);
    // const [currentPage2, setCurrentPage2] = useState(1);
    // const [currentData2, setCurrentData2] = useState([]);

  const imgRef = useRef();

    useEffect(() => {
        // setCurrentData(posts.slice(offset, offset + pageLimit));
        // setCurrentData2(postsSold.slice(offset2, offset2 + pageLimit2));

        const img = imgRef.current;

    const observer = new IntersectionObserver(entries => {
      console.log(entries[0].isIntersecting)
    })

    //kich hoat observer len
    if (img) observer.observe(img)

    return () => {
      if (img) observer.unobserve(img)

    }
  }, [])
  return (
    // 
    <div>alo</div>
  );
};

ProfileDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProfileDescriptionTab;
