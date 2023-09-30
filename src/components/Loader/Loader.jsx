import React from 'react';

import css from './Loader.module.css';

const Loader = ({ isVisible = false }) => { 
  return (
    <div className={css.s}>
      <div className={css.Loader} data-text="Wallet">
        <span className={css.Loader__Circle}></span>
        <span className={css.Loader__Circle}></span>
        <span className={css.Loader__Circle}></span>
        <span className={css.Loader__Circle}></span>
      </div>
    </div>
  );
}
export default Loader;
