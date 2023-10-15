import styles from "./DashboardMobile.module.css";
import { DeleteButton } from "../Buttons/DeleteButton/DeleteButton";
import { EditPen } from "../Pen/Pen";
import { useEffect, useState } from "react";
import {
  getDayDashboard,
  getMonthDashboard,
  getYearDashboard,
} from "../../services/DateFunctions";
import { ButtonAddTransactions } from "../Buttons/AddTransactions/AddTransactions";
import { useDispatch } from "react-redux";
import {
  getTransactions,
  removeTransaction,
} from "../../redux/trans/actions";
import { nanoid } from "nanoid";
import useTransactions from "../../utils/hooks/useTrans";

export const DashboardMobile = () => {
  const { transactions, isTransactionsLoading } = useTransactions();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  useEffect(() => {
    setData(transactions);
  }, [transactions]);

  const deleteLine = id => {
    dispatch(removeTransaction(id));
  };

  const formatSum = data => {
    const numericValue = parseFloat(data);
    const options = {
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    const formattedValue = numericValue
      .toLocaleString("pl-PL", options)
      .replace(/,/g, ".");

    return formattedValue;
  };

  return (
    <>
      {data.length ? (
        <div className={styles.wrapper}>
          {data.map(({ _id, date, type, category, comment, sum }) => {
            return (
              <>
                <div key={_id ?? nanoid()} className={styles.element}>
                  <ul
                    key={nanoid()}
                    className={
                      type === "+"
                        ? styles.greenElementList
                        : styles.redElementList
                    }
                  >
                    <li className={styles.listElement}>
                      <span className={styles.listElementTitle}>Date</span>
                      <span>
                        {getDayDashboard(date)}.{getMonthDashboard(date)}.
                        {getYearDashboard(date)}
                      </span>
                    </li>
                    <li className={styles.listElement}>
                      <span className={styles.listElementTitle}>Type</span>
                      <span>{type}</span>
                    </li>
                    <li className={styles.listElement}>
                      <span className={styles.listElementTitle}>Category</span>
                      <span>{category}</span>
                    </li>
                    <li className={styles.listElement}>
                      <span className={styles.listElementTitle}>Comment</span>
                      <span>
                        {comment.length > 15
                          ? comment.substr(0, 15) + "..."
                          : comment}
                      </span>
                    </li>
                    <li className={styles.listElement}>
                      <span className={styles.listElementTitle}>Sum</span>
                      <span
                        className={type === "+" ? styles.green : styles.red}
                      >
                        {formatSum(sum)}
                      </span>
                    </li>
                    <li className={styles.listElement}>
                      <DeleteButton
                        onClick={() => deleteLine(_id)}
                        name="Delete"
                      />
                      <ul key={nanoid()} className={styles.editList}>
                        <li>
                          <EditPen id={_id} type={type} />
                        </li>
                        <li>
                          <span>Edit</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </>
            );
          })}
          <ButtonAddTransactions />
        </div>
      ) : !isTransactionsLoading ? (
        <div>
          <h2>There are no transactions</h2>
          <ButtonAddTransactions />
        </div>
      ) : null}
    </>
  );
};
