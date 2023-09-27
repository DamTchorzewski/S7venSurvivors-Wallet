import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './buttonAddTransactions.module.css';
// import ModalAddTransaction from '../ModalAddTransactions/modalAddTransactions';

export const ButtonAddTransactions = () => {
  const [isModalAddTransactionOpen, setIsModalAddTransactionOpen] = useState(false);

  const openModal = () => {
    setIsModalAddTransactionOpen(true);
  };

  const closeModal = () => {
    setIsModalAddTransactionOpen(false);
  };

  return (
    <div className={css.buttonDiv}>
      <button onClick={openModal} className={css.btn}>+</button>
      {/* <ModalAddTransaction isOpen={isModalAddTransactionOpen} closeModal={closeModal}/> */}
    </div>
  );
};

ButtonAddTransactions.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};
