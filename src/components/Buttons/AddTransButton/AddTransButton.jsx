import { useState } from 'react';
import { useDispatch } from 'react-redux';
import css from './AddTransButton.module.css';
import ModalAddTrans from '../../Modals/ModalAddTrans/ModalAddTrans';
import { getDay, getMonth, getDefYear } from '../../../services/DateFunctions';
import { createTransaction } from '../../../redux/trans/actions';
import PropTypes from 'prop-types';

const AddTransButton = ({ addDashboard }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState();

  const dateTrim = e => {
    const selectedData = e.target.value.toString();
    const day = selectedData.substr(8, 2);
    const month = selectedData.substr(5, 2);
    const year = selectedData.substr(0, 4);
    setData({ ...data, date: { day: day, month: month, year: year } });
  };

  const openModal = () => {
    setData({
      type: '-',
      category: 'Other expenses',
      date: {
        day: getDay(),
        month: getMonth(),
        year: getDefYear(),
      },
    });
    setIsModalOpen(true);
  };

  const closeModal = e => {
    if (e) e.preventDefault();
    setData({});
    setIsModalOpen(false);
  };

  const sliderTypePlus = () => setData({ ...data, type: '+', category: 'Income' });
  const sliderTypeMinus = () => setData({ ...data, type: '-' });

  const submitModal = e => {
    e.preventDefault();
    dispatch(createTransaction(data));
    addDashboard(data);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <button onClick={openModal} className={css.modalBtn}></button>
      {isModalOpen && (
        <ModalAddTrans
          onSubmit={submitModal}
          onCancel={closeModal}
          onClose={closeModal}
          onChangeSliderPlus={sliderTypePlus}
          onChangeSliderMinus={sliderTypeMinus}
          onChangeValue={e => setData({ ...data, sum: e.target.value })}
          onChangeDate={dateTrim}
          onChangeComment={e => setData({ ...data, comment: e.target.value })}
          onChangeCategory={e => setData({ ...data, category: e })}
        />
      )}
    </>
  );
};

export default AddTransButton;

AddTransButton.propTypes = {
  addDashboard: PropTypes.func,
};
