import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useTransactions from "../../hook/useTransactions";
import styles from "../SelectStatisticsMenu/SelectStatisticsMenu.module.css";
import { nanoid } from "nanoid";
import { getTransactions } from "../../redux/trans/actions";

const SelectStatisticsMenu = ({ placeholder, type, setDate }) => {
  const { transactions } = useTransactions();
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState(`${placeholder}`);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  useEffect(() => {
    setData(transactions);
  }, [transactions]);

  const getYear = () => {
    const allData = [];
    data.map(({ date }) => {
      allData.push(date.year);
    });
    const sortData = [...new Set(allData)].sort();
    const dataYear = [];
    sortData.map((date) => {
      dataYear.push({ date: `${date}` });
    });
    return dataYear;
  };

  const getMonth = () => {
    const allData = [];
    data.map(({ date }) => {
      allData.push(date.month);
    });
    const sortData = [...new Set(allData)].sort();
    const dataMonth = [];
    sortData.map((date) => {
      dataMonth.push({ date: `${date}` });
    });
    return dataMonth;
  };
  const dataYear = getYear();
  const dataMonth = getMonth();

  const toggleModal = () => {
    setModal(!modal);
  };
  const changeName = (e) => {
    const newName = e.innerText;
    setName(newName);
    setDate(newName);
    setModal(!modal);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div
          onClick={toggleModal}
          className={
            modal === false ? styles.selectBtn : styles.selectBtnActive
          }
        >
          <span>{name}</span>
        </div>
        {modal && (
          <div className={styles.optionsContainer}>
            <ul className={styles.options}>
              {type === "year" && dataYear.length > 0 ? (
                dataYear.map(({ date }) => {
                  return (
                    <li
                      key={nanoid()}
                      onClick={(e) => changeName(e.target)}
                      className={styles.option}
                    >
                      <span>{date}</span>
                    </li>
                  );
                })
              ) : type === "month" && dataMonth.length > 0 ? (
                dataMonth.map(({ date }) => {
                  const months = new Array(
                    "0",
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                  );
                  return (
                    <li
                      key={nanoid()}
                      onClick={(e) => changeName(e.target)}
                      className={styles.option}
                    >
                      <span>{months[parseInt(date)]}</span>
                    </li>
                  );
                })
              ) : dataMonth == [] ? (
                <li key={nanoid()} className={styles.option}>
                  <span className={styles.nodata}>No data.</span>
                </li>
              ) : dataYear == [] ? (
                <li key={nanoid()} className={styles.option}>
                  <span className={styles.nodata}>No data.</span>
                </li>
              ) : (
                <li key={nanoid()} className={styles.option}>
                  <span className={styles.nodata}>No data.</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      {modal && <div className={styles.backdrop} onClick={toggleModal}></div>}
    </>
  );
};

export default SelectStatisticsMenu;
