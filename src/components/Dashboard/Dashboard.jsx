import React, { useState } from 'react';
import styles from '../EditPen/EditPen.module.css';
import editImage from '../../assets/svg/pen.svg';
//import { ModalEditTransaction } from '../ModalEditTransaction/ModalEditTransaction';

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
        src={editImage}
        alt="edit icon"
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
