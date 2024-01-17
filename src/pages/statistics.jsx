import React from "react";
import useTransactions from "../hook/useTransactions";
import DiagramTab from "../components/DiagramTab/DiagramTab";
import css from "../components/DiagramTab/DiagramTab.module.css";

const Statistics = () => {
  const { transactions } = useTransactions();

  return (
    <>
      <div className={css.containerStatistics}>
        <div className={css.tabContainer}>
          <DiagramTab transactions={transactions} />
        </div>
      </div>
    </>
  );
};

export default Statistics;
