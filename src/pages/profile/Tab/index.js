import React from 'react';
import { TabContent } from 'react-bootstrap';
import { useEffect, useReducer } from 'react';
import { useState } from 'react';

const TabLink = ({ tabIndex, onClick, children, active }) => {
  return (
    <li class="nav-item" role="presentation">
      <a
        className={`nav-link ${active ? 'active font-weight-bold' : ''}`}
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

const Tab = ({orders = [] }) => {
  const currentTabDataReducer = (state, action) => {
    const TABS_FILTER = {
      0: function (orders) {
        return orders?.goodsStatus === 1;
      },
      1: function (orders) {
        return orders?.goodsStatus === 2;
      },
      2: function (orders) {
        return orders?.goodsStatus === 3;
      },
      3: function (orders) {
        return orders?.goodsStatus === 4;
      },
    };
    const { type } = action;

    switch (type) {
      case 0:
      case 1:
      case 2:
      case 3:
        return orders.filter(TABS_FILTER[type]);
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

  return (
    <div>
      <ul class="nav nav-tabs nav-justified mb-3" id="ex1" role="tablist">
        <TabLink tabIndex={0} onClick={onChangeTab} active={currentTab === 0}>
          Pending
        </TabLink>
        <TabLink tabIndex={1} onClick={onChangeTab} active={currentTab === 1}>
          On-sale
        </TabLink>
        <TabLink tabIndex={2} onClick={onChangeTab} active={currentTab === 2}>
          Sold
        </TabLink>
        <TabLink tabIndex={3} onClick={onChangeTab} active={currentTab === 3}>
          Rejected
        </TabLink>
      </ul>
      <TabContent products={currentTabData} />
    </div>
  );
};

export default Tab;