import React from 'react';
import useTransactions from '../utils/hooks/useTrans';
import DiagramTab from '../components/DiagramTab/DiagramTab';
import css from '../components/DiagramTab/DiagramTab.module.css';

const Statistics = () => {
  const { transactions } = useTransactions();

  return (
    <>
      <div className={css.containerStatistics}>
        <div className={css.tabContainer}>
          <DiagramTab
            transactions={transactions}
            className={css.DiagramTabContainer}
          />
        </div>
      </div>
    </>
  );
};

export default Statistics;
