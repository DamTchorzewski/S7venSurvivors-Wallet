import React from 'react';
import { selectTransactions } from '../../redux/trans/selectors';
import { useSelector } from 'react-redux';
import styles from './DiagramTab.module.css';
export default function DiagramTab({ allArray }) { //TO DO: allArray
  const categoriesFromState = useSelector(selectTransactions.getAllCategoriesFromTransactions);
  return (
    <div className={styles.container}>
      <ul className={styles.expensesList}>
        <li className={styles.expensesListColumnName}>Category</li>
        <li className={styles.expensesListColumnName}>Sum</li>
      </ul>
      <ul className={styles.transactionList}>
        {allArray?.length > 0 ? (
          allArray.map(({ value, sum, color }) => {
            return (
              <li className={styles.transactionListElement}>
                <div
                  style={{
                    backgroundColor: `${color}`,
                    width: '24px',
                    minHeight: '24px',
                    borderRadius: '12px',
                    marginRight: '15px',
                  }}
                ></div>
                <div className={styles.category}>{value}</div>
                <div className={styles.sum}>{sum}</div>
              </li>
            );
          })
        ) : (
          <li className={styles.transactionListElement}>
            <div className={styles.category}>Here is nothing :(</div>
          </li>
        )}
      </ul>
      <ul className={styles.totalList}>
        <li className={styles.totalListElement}>
          <div className={styles.totalListElementText}>Expenses:</div>
          <div className={styles.totalListElementExpenses}>{categoriesFromState.consumption || 0}</div>
        </li>
        <li className={styles.totalListElement}>
          <div className={styles.totalListElementText}>Income:</div>
          <div className={styles.totalListElementIncome}>{categoriesFromState.income || 0}</div>
        </li>
      </ul>
    </div>
  );
}
