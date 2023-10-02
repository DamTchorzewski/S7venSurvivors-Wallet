import { useState } from 'react';
import css from './SelectMenu.module.css';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export const SelectMenu = ({ placeholder, onClick }) => {
  const categories = [
    { category: 'Main expenses' },
    { category: 'Products' },
    { category: 'Car' },
    { category: 'Self care' },
    { category: 'Child care' },
    { category: 'Household products' },
    { category: 'Education' },
    { category: 'Leisure' },
    { category: 'Entertainment' },
    { category: 'Other expenses' },
  ];

  const data = categories;

  const [modal, setModal] = useState(false);
  const [name, setName] = useState(`${placeholder}`);

  const toogleModal = () => {
    setModal(!modal);
  };
  const changeName = e => {
    const newName = e.innerText;
    setName(newName);
    setModal(!modal);
    onClick(newName);
    return newName;
  };

  return (
    <>
      <div className={css.wrapper}>
        {name === placeholder ? (
          <div onClick={toogleModal} className={css.selectBtnGrey}>
            <span>{name}</span>
          </div>
        ) : (
          <div onClick={toogleModal} className={css.selectBtn}>
            <span>{name}</span>
          </div>
        )}
        {modal && (
          <div className={css.optionsContainer}>
            <ul className={css.options}>
              {data.map(({ category }) => {
                return (
                  <li key={nanoid()} onClick={e => changeName(e.target)} className={css.option}>
                    <span>{category}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      {modal && (
        <div className={css.backdrop} onClick={toogleModal}>
          a
        </div>
      )}
    </>
  );
};

SelectMenu.propTypes = {
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
};
