import React from 'react';
import { useState } from 'react';
const ShopSearch = ({ getSearchParams }) => {
    const [keyword, setKeyword] = useState('');
    return (
        <div className="sidebar-widget">
            <h4 className="pro-sidebar-title">Search </h4>
            <div className="pro-sidebar-search mb-50 mt-25">
                <div className="pro-sidebar-search-form">
                    <input
                        type="text"
                        placeholder="Search here..."
                        onChange={(event) => setKeyword(event.target.value)}
                    />
                    <button onClick={() => getSearchParams('search', keyword)}>
                        <i className="pe-7s-search" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShopSearch;
