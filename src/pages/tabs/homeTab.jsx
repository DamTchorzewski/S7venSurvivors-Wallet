import React, { Fragment } from 'react';
import Media from 'react-media';
import { Dashboard } from '../../components/Dashboard/Dashboard';
import { DashboardMobile } from '../../components/Dashboard/DashboardMobile';
import BalanceComponent from '../../components/Balance/Balance';
import css from './Tab.module.css';
import { AddTransactionButton } from '../../components/AddTransactionButton/AddTransactionButton';

const HomeTab = () => {
  return (
    <div className={css.homeContainer}>
      <Media
        queries={{
          small: '(max-width: 767px)',
          medium: '(min-width: 768px)',
        }}
      >
        {matches => (
          <Fragment>
            {matches.small && <BalanceComponent />}
            {matches.small && <DashboardMobile />}
            {matches.medium && <Dashboard />}
          </Fragment>
        )}
      </Media>
      <AddTransactionButton />
    </div>
  );
};

export default HomeTab;
