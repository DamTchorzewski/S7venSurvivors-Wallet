import React from 'react';
import { Link } from 'react-router-dom';
import logoutIcon from '../../assets/svg/logout.svg'
import homeIcon from '../../assets/svg/wallet.svg'
import css from './Header.module.css';
import useAuth from '../../utils/hooks/useAuth';
import { toggleLogoutModal } from '../../redux/auth/slice';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/actions';

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
            <img className={css.homeIcon} alt="wallet" src={homeIcon} />
            <h2 className={css.appName}>Wallet</h2>
          </Link>
        </div>
        <div className={css.headerSide}>
          <p className={css.headerSideText}>{user.username ?? 'Say my name'}</p>
          <button className={css.headerLogout} onClick={openModal}>
            <img className={css.logoutIcon} alt="LogOut" src={logoutIcon}/>
            <p className={css.headerSideText}>Exit</p>
          </button>
        </div>
      </div>
    </header>
  )
};

export default Header