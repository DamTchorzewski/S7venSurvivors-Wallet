import { useState } from 'react';
// import PropTypes from 'prop-types';
import css from './AddTransModal.module.css';

export const AddTransModal = () => {
  const [positionSlider, setPositionSlider] = useState(false);
  const handleSlider = () => setPositionSlider(!positionSlider);
  const [category, setCategory] = useState('');

  // const handleSubmit = () => {

  // }

  const handleCategoryChange = ev => {
    setCategory(ev.target.value);
  };

  return (
    <section className={css.container}>
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
        {!positionSlider ? (
          <select type="select" value={category} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            <option value="mainExpenses">Main expenses</option>
            <option value="products">Products</option>
            <option value="car">Car</option>
            <option value="selfCare">Sefl care</option>
            <option value="childCare">Child care</option>
            <option value="householdProducts">Household products</option>
            <option value="education">Education</option>
            <option value="leisure">Leisure</option>
            <option value="otherExpenses">Other expenses</option>
            <option value="entertainment">Entertainment</option>
          </select>
        ) : (
          <></>
        )}
        <input type="number" placeholder="0.00"></input>
        <input type="date"></input>
        <input type="textarea" placeholder="Comment"></input>
        <div className={css.btnContainer}>
          <button className={css.btnAdd} type="submit">
            ADD
          </button>
          <button className={css.btnCancel}>CANCEL</button>
        </div>
      </form>
    </section>
  );
};

// AddTransModal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   closeModal: PropTypes.func.isRequired,
// };
