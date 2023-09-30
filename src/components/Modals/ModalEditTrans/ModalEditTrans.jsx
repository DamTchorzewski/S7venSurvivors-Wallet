import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import css from '../ModalEditTrans/ModalEditTrans.module.css';
import { updateTransaction } from '../../../redux/trans/actions';
//import { GreenButton } from '../Greenbutton/GreenButton';
//import { CancelButton } from '../CancelButton/CancelButton';
import { SelectMenu } from '../../SelectMenu/SelectMenu';

export const ModalEditTransaction = ({
  type,
  onClose,
  id,
  updateDashboard,
}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState();

  const dateTrim = e => {
    const selectedData = e.target.value.toString();
    const day = selectedData.substr(8, 2);
    const month = selectedData.substr(5, 2);
    const year = selectedData.substr(0, 4);
    setData({ ...data, date: { day: day, month: month, year: year }, id: id });
  };

  const submitModal = e => {
    e.preventDefault();
    const dataId = data.id;
    dispatch(updateTransaction({ id: dataId, body: data }));
    updateDashboard(data);
    onClose();
  };

  return (
    <div className={css.modalWrapper}>
      <section className={css.wrapper}>
        <h2 className={css.header}>Edit transaction</h2>
        <div className={css.sliderContainer}>
          {type === '+' ? (
            <span className={css.greenText}>Income</span>
          ) : (
            <span className={css.greyText}>Income</span>
          )}
          <span className={css.greyText}>/</span>
          {type === '+' ? (
            <span className={css.greyText}>Expense</span>
          ) : (
            <span className={css.redText}>Expense</span>
          )}
        </div>
        <form onSubmit={submitModal} className={css.Form}>
          <section className={css.modalForm}>
            <label name="addTransForm">
              {type === '+' ? (
                <></>
              ) : (
                <SelectMenuModal
                  onClick={e => setData({ ...data, category: e, id: id })}
                  placeholder={'Select a category'}
                />
              )}
              <div className={css.formWrapper}>
                <input
                  type="number"
                  name="sum"
                  onChange={e =>
                    setData({ ...data, sum: e.target.value, id: id })
                  }
                  placeholder="0.00"
                  className={css.formValue}
                ></input>
                <input
                  type="date"
                  name="date"
                  onChange={dateTrim}
                  className={css.formDate}
                ></input>
              </div>
              <input
                type="text"
                placeholder="Comment"
                name="comment"
                onChange={e =>
                  setData({ ...data, comment: e.target.value, id: id })
                }
                className={css.formComment}
              ></input>
              <ul className={css.modalList}>
                {/* <li>
                  <GreenButton name="SAVE" />
                </li>
                <li>
                  <CancelButton name="CANCEL" onClick={onClose} />
                </li> */}
                <li>
                  <button
                    className={css.closeButton}
                    onClick={onClose}
                  ></button>
                </li>
              </ul>
            </label>
          </section>
        </form>
      </section>
      <div className={css.shadow} onClick={onClose}></div>
    </div>
  );
};
