import { useState } from 'react';
import css from './ModalAddTrans.module.css';
import { SelectMenu } from '../../SelectMenu/SelectMenu';
import PropTypes from 'prop-types';

const AddTransModal = ({
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
  const [positionSlider, setPositionSlider] = useState(false);
  const handleSlider = () => setPositionSlider(!positionSlider);

  const sendCategory = data => {
    onChangeCategory(data);
  };

  return (
    <div className={css.wrapper}>
      <section className={css.container}>
        <h2 className={css.title}>Add transaction</h2>
        <div className={css.sliderContainer}>
          {!positionSlider ? (
            <span className={css.grayText}>Income</span>
          ) : (
            <span className={css.greenText}>Income</span>
          )}
          <label className={css.slider}>
            <input
              type="checkbox"
              name="slider"
              className={css.sliderCheckbox}
              value={!positionSlider ? '+' : '-'}
              onChange={!positionSlider ? onChangeSliderMinus : onChangeSliderPlus}
              onClick={handleSlider}
            />
            <span className={css.sliderSpan}></span>
          </label>
          {!positionSlider ? (
            <span className={css.redText}>Expense</span>
          ) : (
            <span className={css.grayText}>Expense</span>
          )}
        </div>
        <section className={css.modalForm}>
          <form onSubmit={onSubmit} className={css.formContainer}>
            {!positionSlider ? (
              <SelectMenu onClick={sendCategory} placeholder={'Select a category'} />
            ) : (
              <></>
            )}
            <div className={css.formWrapper}>
              <input
                type="number"
                name="number"
                placeholder="0.00"
                onChange={onChangeValue}
                className={css.formAmount}
              ></input>
              <input
                type="date"
                name="date"
                className={css.formDate}
                onChange={onChangeDate}
              ></input>
            </div>
            <textarea
              type="textarea"
              placeholder="Comment"
              onChange={onChangeComment}
              maxLength="100"
              className={css.formComment}
            ></textarea>
            <div className={css.btnContainer}>
              <button className={css.btnAdd} type="submit">
                ADD
              </button>
              <button onClick={onCancel} className={css.btnCancel}>
                CANCEL
              </button>
              <button className={css.closeBtn} onClick={onClose}></button>
            </div>
          </form>
        </section>
      </section>
      <div className={css.shadow} onClick={onClose}></div>
    </div>
  );
};

export default AddTransModal;

AddTransModal.propTypes = {
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  onChangeValue: PropTypes.func,
  onChangeDate: PropTypes.func,
  onChangeComment: PropTypes.func,
  onChangeCategory: PropTypes.func,
  onChangeSliderPlus: PropTypes.func,
  onChangeSliderMinus: PropTypes.func,
};
