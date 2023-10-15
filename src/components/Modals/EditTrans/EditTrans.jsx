import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../EditTrans/EditTrans.module.css";
import { updateTransaction } from "../../../redux/trans/actions";
import { SubmitButton } from "../../Buttons/SubmitButton/SubmitButton";
import { CancelButton } from "../../Buttons/CancelButton/CancelButton";
import { SelectMenu } from "../Menu/Menu";

export const ModalEditTransaction = ({ type, onClose, id }) => {
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
    onClose();
  };

  return (
    <div className={styles.modalWrapper}>
      <section className={styles.wrapper}>
        <h2 className={styles.header}>Edit transaction</h2>
        <div className={styles.sliderContainer}>
          {type === "+" ? (
            <span className={styles.greenText}>Income</span>
          ) : (
            <span className={styles.greyText}>Income</span>
          )}
          <span className={styles.greyText}>/</span>
          {type === "+" ? (
            <span className={styles.greyText}>Expense</span>
          ) : (
            <span className={styles.redText}>Expense</span>
          )}
        </div>
        <form onSubmit={submitModal} className={styles.Form}>
          <section className={styles.modalForm}>
            <label name="addTransForm">
              {type === "+" ? (
                <></>
              ) : (
                <SelectMenu
                  onClick={e => setData({ ...data, category: e, id: id })}
                  placeholder={"Select a category"}
                />
              )}
              <div className={styles.formWrapper}>
                <input
                  type="number"
                  name="sum"
                  step="0.01"
                  max="999999999999"
                  onChange={e =>
                    setData({ ...data, sum: e.target.value, id: id })
                  }
                  placeholder="0.00"
                  className={styles.formValue}
                ></input>
                <input
                  type="date"
                  name="date"
                  onChange={dateTrim}
                  className={styles.formDate}
                ></input>
              </div>
              <input
                type="text"
                placeholder="Comment"
                name="comment"
                onChange={e =>
                  setData({ ...data, comment: e.target.value, id: id })
                }
                className={styles.formComment}
              ></input>
              <ul className={styles.modalList}>
                <li>
                  <SubmitButton name="SAVE" />
                </li>
                <li>
                  <CancelButton name="CANCEL" onClick={onClose} />
                </li>
                <li>
                  <button
                    className={styles.closeButton}
                    onClick={onClose}
                  ></button>
                </li>
              </ul>
            </label>
          </section>
        </form>
      </section>
      <div className={styles.shadow} onClick={onClose}></div>
    </div>
  );
};
