import React from 'react';
import useTransactions from '../utils/hooks/useTrans';
import DiagramTab from '../components/DiagramTab/DiagramTab';
import styles from '../components/DiagramTab/DiagramTab.module.css';

const Statistics = () => {
  const { transactions } = useTransactions();

  return (
    <>
      <div className={styles.containerStatistics}>
        <div className={styles.tabContainer}>
          <DiagramTab
            transactions={transactions}
            className={styles.DiagramTabContainer}
          />
        </div>
      </div>
    </>
  );
};

export default Statistics;
