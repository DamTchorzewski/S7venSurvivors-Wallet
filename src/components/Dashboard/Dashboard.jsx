import styles from "./Dashboard.module.css";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { EditPen } from "../EditPen/EditPen";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AddTransactionButton } from "../AddTransactionButton/AddTransactionButton";
import {
  getDayDashboard,
  getMonthDashboard,
  getYearDashboard,
} from "../../services/DateFunctions";
import useTransactions from "../../hook/useTransactions";
import {
  getTransactions,
  removeTransaction,
} from "../../redux/transactions/actions";
import { nanoid } from "nanoid";

export const Dashboard = () => {
  const { transactions, isTransactionsLoading } = useTransactions();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  useEffect(() => {
    setData(transactions);
  }, [transactions]);

  const deleteLine = (id) => {
    dispatch(removeTransaction(id));
    setData((prevData) => prevData.filter(({ _id }) => _id !== id));
  };

  const addData = (data) => {
    setData((prevData) => [data, ...prevData]);
  };

  const updateData = (data) => {
    setData(data);
  };

  const formatSum = (data) => {
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
        <>
          <table className={styles.dashboardClass}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Comment</th>
                <th>Sum</th>
                <th></th>
              </tr>
            </thead>
            <tbody className={styles.dashboardClassBody}>
              {data.map(({ _id, date, type, category, comment, sum }) => {
                return (
                  <tr key={_id ?? nanoid()}>
                    <td>
                      {getDayDashboard(date)}.{getMonthDashboard(date)}.
                      {getYearDashboard(date)}
                    </td>
                    <td>{type}</td>
                    <td>{category}</td>
                    <td>{comment}</td>
                    {type == "+" ? (
                      <td className={styles.green}>{formatSum(sum)}</td>
                    ) : (
                      <td className={styles.red}>{formatSum(sum)}</td>
                    )}
                    <td>
                      <span className={styles.buttonContainer}>
                        <EditPen
                          id={_id}
                          type={type}
                          updateDashboard={updateData}
                        />
                        <DeleteButton
                          onClick={() => deleteLine(_id)}
                          name="Delete"
                        />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <AddTransactionButton addDashboard={addData} />
        </>
      ) : !isTransactionsLoading ? (

        <div className={styles.dashboardClass}>
          <h2>There are no transactions</h2>
          <AddTransactionButton addDashboard={addData} />
        </div>

      ) : null}
    </>
  );
};
