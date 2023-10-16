import { useState } from "react";
import css from "./DiagramTab.module.css";
import ChartComponent from "./Chart";
import StatisticsMenu from "../StatisticsMenu/StatisticsMenu";
import { nanoid } from "nanoid";

const DiagramTab = ({ transactions }) => {
  const categoryColors = {
    "Main expenses": "rgba(254, 208, 87, 1)",
    Products: "rgba(255, 216, 208, 1)",
    Car: "rgba(253, 148, 152, 1)",
    "Self care": "rgba(197, 186, 255, 1)",
    "Child care": "rgba(110, 120, 232, 1)",
    "Household products": "rgba(74, 86, 226, 1)",
    Education: "rgba(129, 225, 255, 1)",
    Leisure: "rgba(36, 204, 167, 1)",
    "Other expenses": "rgba(0, 173, 132, 1)",
    Entertainment: "rgba(203, 242, 111, 1)",
  };

  const monthNameToNumber = (monthName) => {
    const months = {
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12",
    };

    return months[monthName];
  };

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const setMonth = (data) => {
    const numericMonth = monthNameToNumber(data);
    setSelectedMonth(numericMonth);
  };

  const setYear = (data) => {
    setSelectedYear(data);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (selectedMonth && selectedYear) {
      return (
        transaction.date.month === selectedMonth &&
        transaction.date.year === selectedYear
      );
    }

    return transaction;
  });

  const categorySums = {};
  let totalIncome = 0;
  filteredTransactions.forEach((transaction) => {
    const category = transaction.category;
    const sum = parseFloat(transaction.sum);
    if (category !== "Income") {
      if (!isNaN(sum)) {
        if (!categorySums[category]) {
          categorySums[category] = sum;
        } else {
          categorySums[category] += sum;
        }
      }
    }

    if (category === "Income") {
      if (!selectedMonth && !selectedYear) {
        totalIncome += sum;
      }

      if (
        transaction.date.month === selectedMonth &&
        transaction.date.year === selectedYear
      ) {
        totalIncome += sum;
      }

      if (transaction.date.month === selectedMonth && !selectedYear) {
        totalIncome += sum;
      }

      if (transaction.date.year === selectedYear && !selectedMonth) {
        totalIncome += sum;
      }
    }
  });

  let totalSum = 0;
  for (const category in categorySums) {
    if (categorySums.hasOwnProperty(category)) {
      totalSum += categorySums[category];
    }
  }

  const uniqueCategories = [
    ...new Set(
      filteredTransactions
        .filter((transaction) => transaction.category !== "Income")
        .map((transaction) => transaction.category)
    ),
  ];

  const balanceValue = (totalIncome - parseFloat(totalSum)).toFixed(2);
  const textColor = balanceValue < 0 ? "red" : "black";

  return (
    <>
      <div className={css.titleChartContainer}>
        <h2 className={css.titleStatistics}>Statistics</h2>
        <div className={css.chartContainer}>
          {Object.keys(categorySums).length !== 0 ? (
            <ChartComponent categorySums={categorySums} />
          ) : (
            <h2 className={css.noDataInformation}>There are no expenses</h2>
          )}
          {Object.keys(categorySums).length !== 0 ? (
            <span className={css.balanceValue} style={{ color: textColor }}>
              PLN {balanceValue}
            </span>
          ) : (
            <p className={css.selectDataInformation}>
              Please select another date to see your expenses
            </p>
          )}
        </div>
      </div>
      <div className={css.tableDateContainer}>
        <div className={css.dateContainer}>
          <StatisticsMenu
            placeholder={"Month"}
            type={"month"}
            setDate={setMonth}
          />
          <StatisticsMenu
            placeholder={"Year"}
            type={"year"}
            setDate={setYear}
          />
        </div>
        <div className={css.tableContainer}>
          <table>
            <thead className={css.theadStatistics}>
              <tr>
                <th>Category</th>
                <th></th>
                <th>Sum</th>
              </tr>
            </thead>
            <tbody className={css.bodyStatisticsTable}>
              {uniqueCategories.map((category) => {
                return (
                  <tr key={nanoid()}>
                    <td
                      className={css.categorySquare}
                      style={{ "--category-color": categoryColors[category] }}
                    />
                    <td className={css.tableBodyCategory}>{category}</td>
                    <td className={css.tableBodySum}>
                      {categorySums[category].toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={css.sumUp}>
            <div className={css.containerExpensesIncome}>
              <strong className={css.sumUpExpenses}>Expenses:</strong>
              <span className={css.expensesValue}>{totalSum.toFixed(2)}</span>
            </div>
            <div className={css.containerExpensesIncome}>
              <strong className={css.sumUpIncome}>Income:</strong>
              <span className={css.IncomeValue}>{totalIncome.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiagramTab;
