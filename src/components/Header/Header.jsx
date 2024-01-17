import React from 'react';
import { Link } from 'react-router-dom';
import Svg from '../../utils/Svg/Svg';
import css from './Header.module.css';
import useAuth from '../../hook/useAuth';
import { toggleLogoutModal } from '../../redux/auth/slice';
import { useDispatch } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const openModal = () => {
    dispatch(toggleLogoutModal());
  }
  return (
    <header className={css.headerContainer}>
      <div className={css.headerWrapper}>
        <div className={css.headerSide}>
          <Link to='/S7venSurvivors-Wallet/dashboard' className={css.headerLogo}>
            <Svg icon='wallet' size='40' />
            <h2 className={css.appName}>Wallet</h2>
          </Link>
        </div>
        <div className={css.headerSide}>
          <p className={css.headerSideText}>{user.username ?? 'Say my name'}</p>
          <button className={css.headerLogout} onClick={openModal}>
            <Svg icon='logout' size='18' />
            <p className={css.headerSideText}>Exit</p>
          </button>
        </div>
      </div>
    </header>
  )
};

export default Header