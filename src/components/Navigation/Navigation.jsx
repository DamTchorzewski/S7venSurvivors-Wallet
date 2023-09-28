import React from 'react';
import styles from './Navigation.module.css';
import HomeIcon from '@mui/icons-material/Home';
import TimelineIcon from '@mui/icons-material/Timeline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { NavLink } from 'react-router-dom';

function Navigation({ onClickCurrency }) {
  return (
    <div className={styles.navigation}>
      <NavLink to="/home" className={styles.navigation__item}>
        <div className={styles.navigation__icon}>
          <HomeIcon fontSize="inherit" />
        </div>
        <div className={styles.navigation__text}>Home</div>
      </NavLink>
      <NavLink to="/statistics" className={styles.navigation__item}>
        <div className={styles.navigation__icon}>
          <TimelineIcon fontSize="inherit" />
        </div>

        <div className={styles.navigation__text}>Statistics</div>
      </NavLink>
      <NavLink
        to="/currency"
        className={styles.navigation__item}
        onClick={onClickCurrency}
      >
        <div className={styles.navigation__icon}>
          <AttachMoneyIcon fontSize="inherit" />
        </div>
      </NavLink>
    </div>
  );
}

export default Navigation;