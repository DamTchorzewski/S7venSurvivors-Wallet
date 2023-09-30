import React, { Fragment, Suspense, lazy } from 'react';
import Media from 'react-media';
import { Dashboard } from '../components/Dashboard/Dashboard';
 import { DashboardMobile } from '../components/Dashboard/DashboardMobile';
//import BalanceComponent from '../components/Balance/Balance';

const Currency = lazy(() => import('../components/Currency/Currency'));

const DashBoard = () => {
  return (
    <>
      {/* <BalanceComponent /> */}
      <Media queries={{ medium: '(min-width: 769px)' }}>
        {matches => matches.medium && <Currency />}
      </Media>

      <Media
        queries={{
          small: '(max-width: 768px)',
          medium: '(min-width: 769px)',
        }}
      >
        {matches => (
          <Fragment>
            {matches.small && <DashboardMobile />}
            {matches.medium && <Dashboard />}
          </Fragment>
        )}
      </Media>
      {/* <AddTransactionButton /> */}
      {/* <SelectStatisticsMenu placeholder={'Month'} type={'month'}/>
    <SelectStatisticsMenu placeholder={'Year'} type={'year'}/> */}
    </>
  );
};
export default DashBoard;
