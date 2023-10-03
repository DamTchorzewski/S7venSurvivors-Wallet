import React, { useState } from 'react';
import styles from './Pen.module.css';
import editImg from '../../assets/svg/pen.svg';
import { ModalEditTransaction } from '../Modals/EditTrans/EditTrans';

export const EditPen = ({ id, type, updateDashboard }) => {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = e => {
    if (e) e.preventDefault();
    setModal(false);
  };

  return (
    <>
      <img
        className={styles.ico}
        src={editImg}
        alt="edit"
        onClick={openModal}
      />
      {modal && (
        <ModalEditTransaction
          type={type}
          id={id}
          onClose={closeModal}
          updateDashboard={updateDashboard}
        />
      )}
    </>
  );
};
