import React from 'react';
import { useEffect, useReducer } from 'react';
import { useState } from 'react';
import Order from '../Order';

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

const TabContent = ({ orders, setOrder }) => {
    return (
        <div class="tab-content" id="ex2-content">
            <div
                class="tab-pane fade show active d-flex flex-wrap"
                id="ex3-tabs-1"
                role="tabpanel"
                aria-labelledby="ex3-tab-1"
            >
                {orders.map((order, index) => {
                    return (
                        <Order
                            setOrder={setOrder}
                            key={index + 'order'}
                            order={order}
                        ></Order>
                    );
                })}
            </div>
        </div>
    );
};

const Tab = ({ orders, setOrder }) => {
    const TABS_FILTER = [
        {
            type: function (order) {
                return order?.status.toLowerCase() === 'pending';
            },
            status: 'Pending',
        },
        {
            type: function (order) {
                return order?.status.toLowerCase() === 'accepted';
            },
            status: 'Accepted',
        },
        {
            type: function (order) {
                return order?.status.toLowerCase() === 'declined';
            },
            status: 'Declined',
        },
    ];
    const currentTabDataReducer = (state, action) => {
        const { type } = action;
        switch (type) {
            case 0:
            case 1:
            case 2:
            case 3:
                return orders.filter(TABS_FILTER[type].type);
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
    }, [currentTab, orders]);

    const onChangeTab = (tabIndex) => {
        setCurrentTab(tabIndex);
        dispatchCurrentTabData({ type: tabIndex, orders });
    };
    console.log(orders);
    return (
        <div>
            <ul class="nav nav-tabs nav-justified mb-3" id="ex1" role="tablist">
                {TABS_FILTER.map((item, index) => {
                    return (
                        <TabLink
                            key={index}
                            tabIndex={index}
                            onClick={onChangeTab}
                            active={currentTab === index}
                        >
                            {item.status}
                        </TabLink>
                    );
                })}
            </ul>
            <TabContent orders={currentTabData} setOrder={setOrder} />
        </div>
    );
};

export default Tab;
