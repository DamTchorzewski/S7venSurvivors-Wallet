//import css from './DashboardMobile.module.css';
//import { DeleteButton } from '../DeleteButton/DeleteButton';
import { EditPen } from '../EditPen/EditPen';
import { useEffect, useState } from 'react';
import {
  getDayDashboard,
  getMonthDashboard,
  getYearDashboard,
} from '../../services/DateFunctions';
//import { ButtonAddTransactions }  from '../Buttons/ButtonAddTransactions/ButtonAddTransactions';
import { useDispatch } from 'react-redux';
import {
  getTransactions,
  removeTransaction,
} from '../../redux/trans/actions';
import { nanoid } from 'nanoid';
import useTransactions from '../../utils/hooks/useTrans';

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
    setData(prevData => prevData.filter(({ _id }) => _id !== id));
  };

  const addData = data => {
    setData(prevData => [data, ...prevData]);
  };

  const updateData = data => {
    setData(data);
  };

  return (
    <>
      {data.length ? (
        <div className={css.wrapper}>
          {data.map(({ _id, date, type, category, comment, sum }) => {
            return (
              <>
                <div key={_id ?? nanoid()} className={css.element}>
                  <ul
                    className={
                      type === '+'
                        ? css.greenElementList
                        : css.redElementList
                    }
                  >
                    <li key={nanoid()} className={css.listElement}>
                      <span className={css.listElementTitle}>Date</span>
                      <span>
                        {getDayDashboard(date)}.{getMonthDashboard(date)}.
                        {getYearDashboard(date)}
                      </span>
                    </li>
                    <li key={nanoid()} className={css.listElement}>
                      <span className={css.listElementTitle}>Type</span>
                      <span>{type}</span>
                    </li>
                    <li key={nanoid()} className={css.listElement}>
                      <span className={css.listElementTitle}>Category</span>
                      <span>{category}</span>
                    </li>
                    <li key={nanoid()} className={css.listElement}>
                      <span className={css.listElementTitle}>Comment</span>
                      <span>
                        {comment.length > 15
                          ? comment.substr(0, 15) + '...'
                          : comment}
                      </span>
                    </li>
                    <li key={nanoid()} className={css.listElement}>
                      <span className={css.listElementTitle}>Sum</span>
                      <span
                        className={type === '+' ? css.green : css.red}
                      >
                        {sum}
                      </span>
                    </li>
                    <li key={nanoid()} className={css.listElement}>
                      {/* <DeleteButton
                        onClick={() => deleteLine(_id)}
                        name="Delete"
                      /> */}
                      <ul className={css.editList}>
                        <li>
                          <EditPen
                            id={_id}
                            type={type}
                            updateDashboard={updateData}
                          />
                        </li>
                        <li>
                          <span>Edit</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                 {/* <ButtonAddTransactions addDashboard={addData} />  */}
              </>
            );
          })}
        </div>
      ) : !isTransactionsLoading ? (
        <h2>There are no transactions</h2>
      ) : null}
    </>
  );
};
