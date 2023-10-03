import React, { Fragment } from 'react';
import Media from 'react-media';
import { Dashboard } from '../Dashboard/Dashboard';
import { DashboardMobile } from '../Dashboard/DashboardMobile';
import BalanceComponent from '../Balance/Balance';
import styles from './Tabs.module.css';
import { ButtonAddTransactions } from '../Buttons/ButtonAddTransactions/buttonAddTransactions';

const HomeTab = () => {
  return (
    <div className={styles.homeContainer}>
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
      <ButtonAddTransactions />
    </div>
  );
};

export default HomeTab;
