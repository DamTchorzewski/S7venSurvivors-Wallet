import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/svg/wallet.svg';
import logout from '../../assets/svg/logout.svg';
//import css from './Header.module.css';
import useAuth from '../../utils/hooks/useAuth';
//import { toggleLogoutModal } from '../../redux/auth/slice';
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
          <Link to='/Goit-Wallet/dashboard' className={css.headerLogo}>
           <img className={css.logo} alt="Logo" src={logo} />
            <h2 className={css.appName}>Wallet</h2>
          </Link>
        </div>
        <div className={css.headerSide}>
          <p className={css.headerSideText}>{user.username ?? 'Say my name'}</p>
          <button className={css.headerLogout} onClick={openModal}>
             <img className={css.logout} alt="Logo" src={logout} />
            <p className={css.headerSideText}>Exit</p>
          </button>
        </div>
      </div>
    </header>
  )
};

export default Header