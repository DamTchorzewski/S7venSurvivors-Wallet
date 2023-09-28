import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './AddTransModal.module.css';

export const AddTransModal = () => {
  const [positionSlider, setPositionSlider] = useState(false);
  const handleSlider = () => setPositionSlider(!positionSlider);

  return (
    <section className={css.container}>
      <button className={css.closeBtn}>X</button>
      <h2 className={css.title}>Add transaction</h2>
      <div className={css.sliderContainer}>
        {!positionSlider ? (
          <span className={css.slider__titleGray}>Income</span>
        ) : (
          <span className={css.slider__titleGreen}>Income</span>
        )}
        <label className={css.slider}>
          <input
            type="checkbox"
            name="slider"
            className={css.slider__input}
            onClick={handleSlider}
          ></input>
          <span className={css.slider__span}></span>
        </label>
        {!positionSlider ? (
          <span className={css.slider__titleRed}>Expense</span>
        ) : (
          <span className={css.slider__titleGray}>Expense</span>
        )}
      </div>
      <form className={css.formContainer}>
        <input type="number" placeholder="0.00"></input>
        <input type="date"></input>
        <input type="textarea" placeholder="Comment"></input>
        <div className={css.btnContainer}>
          <button className={css.btnForm} type="submit">
            ADD
          </button>
          <button className={css.btnForm}>CANCEL</button>
        </div>
      </form>
    </section>
  );
};

AddTransModal.PropTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
