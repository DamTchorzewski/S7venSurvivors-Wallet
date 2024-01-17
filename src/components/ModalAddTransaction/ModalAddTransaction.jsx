import React, { useState } from "react";
import styles from "../ModalAddTransaction/ModalAddTransaction.module.css";
import { GreenButton } from "../Greenbutton/GreenButton";
import { CancelButton } from "../CancelButton/CancelButton";
import { SelectMenuModal } from "../SelectMenuModal/SelectMenuModal";

export const ModalAddTransaction = ({
  onCancel,
  onClose,
  onSubmit,
  onChangeValue,
  onChangeDate,
  onChangeComment,
  onChangeCategory,
  onChangeSliderPlus,
  onChangeSliderMinus,
}) => {
  const [count, setCount] = useState(true);
  const handleSlider = (e) => setCount(!count);

  const sendCategory = (data) => {
    onChangeCategory(data);
  };

  return (
    <div className={styles.modalWrapper}>
      <section className={styles.wrapper}>
        <h2 className={styles.header}>Add transaction</h2>
        <div className={styles.sliderContainer}>
          {!count ? (
            <span className={styles.greenText}>Income</span>
          ) : (
            <span className={styles.greyText}>Income</span>
          )}
          <label className={styles.switch}>
            <input
              type="checkbox"
              className={styles.checkbox}
              name="slider"
              value={!count ? "+" : "-"}
              onChange={!count ? onChangeSliderMinus : onChangeSliderPlus}
              onClick={handleSlider}
            />
            <span className={styles.slider}></span>
          </label>
          {!count ? (
            <span className={styles.greyText}>Expense</span>
          ) : (
            <span className={styles.redText}>Expense</span>
          )}
        </div>
        <section className={styles.modalForm}>
          <form onSubmit={onSubmit} className={styles.Form}>
            {!count ? (
              <></>
            ) : (
              <SelectMenuModal
                onClick={sendCategory}
                placeholder={"Select a category"}
              />
            )}
            <div className={styles.formWrapper}>
              <input
                type="number"
                name="number"
                min="0.01"
                max="999999999999"
                onChange={onChangeValue}
                placeholder="0.00"
                required
                step="0.01"
                className={styles.formValue}
              ></input>
              <input
                type="date"
                name="date"
                onChange={onChangeDate}
                className={styles.formDate}
              ></input>
            </div>
            <textarea
              type="textarea"
              maxLength="100"
              name="comment"
              onChange={onChangeComment}
              placeholder="Comment"
              className={styles.formComment}
            ></textarea>
            <ul className={styles.modalList}>
              <li>
                <GreenButton name="ADD" />
              </li>
              <li>
                <CancelButton name="CANCEL" onClick={onCancel} />
              </li>
              <li>
                <button
                  className={styles.closeButton}
                  onClick={onClose}
                ></button>
              </li>
            </ul>
          </form>
        </section>
      </section>
      <div className={styles.shadow} onClick={onClose}></div>
    </div>
  );
};
