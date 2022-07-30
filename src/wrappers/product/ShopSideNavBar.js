import React, { Fragment, useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { Route } from 'react-router-dom';
// DÙNG ĐỂ CHƯA THANH SEARCH VÀ CÁC LOẠI FILTER MUỐN LỌC

function ShopSideNavBar({setPosts},{posts}) {
    //DÙNG AXIOS LẤY CÁC CATE NAME HIỆN CÓ TRONG CSDL
    //(OPTION) NẾU NHIỀU HƠN 25 CATE THÌ HIỆN TỐI ĐA 10 CÁI ĐẦU TIÊN TRONG CSDL
    const [keyword,setKeyword]=useState('');
    const [categories, setCateList] = useState([]);
    useEffect(() => {
        //Runs only the first render
        axios.get(`https://fbuyexchange.azurewebsites.net/api/categories/1/30?all=true`)
            .then(res => {
                setCateList(res.data);
                console.log(res.data);
                console.log("catename: " + categories)
            })
            .catch(error => console.log(error));
        

    }, [])//render once at first
    const changeHandler = (e) => {
        console.log('input : '+e.target.value);
        
        setPosts(
            posts&&posts.filter(p=>p.name.toLowerCase().includes(e.target.value.toLowerCase()))
        )
    }
    return (
        <Fragment>
            {/* SEARCH */}
            <div className="sidebar-widget">
                <h4 className="pro-sidebar-title">Search </h4>
                <div className="pro-sidebar-search mb-50 mt-25">
                    <form className="pro-sidebar-search-form" action="#">
                        <input type="text" id="searchValue" onChange={changeHandler} value={keyword||""} placeholder="Search here..." />
                        <button>
                            <i className="pe-7s-search" />
                        </button>
                    </form>
                </div>
            </div>

            {/* CATE NAME CHECKLIST */}
            <div className="sidebar-widget">
                <h4 className="pro-sidebar-title">Categories </h4>
                
                {/* <div className="sidebar-widget-list mt-30">
                    {categories ? (
                        <ul>
                            <li>
                                <div className="sidebar-widget-list-left">
                                    <button></button>
                                </div>
                            </li>
                            {categories.map((category, key) => {
                                return (
                                    <li key={key}>
                                        <div className="sidebar-widget-list-left">
                                            <input type="checkbox" value={category.id} />{category.category1}

                                        </div>
                                    </li>




                                );
                            })}
                        </ul>
                    ) : (
                        "No categories found"
                    )}
                </div> */}
                
            </div>

        </Fragment>
    )
}

export default ShopSideNavBar