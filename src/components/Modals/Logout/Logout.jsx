import React from 'react';
import css from './Logout.module.css';
import closeIcon from '../../../assets/svg/close.svg';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/auth/actions';
import {toggleLogoutModal}  from '../../../redux/auth/slice';
import useAuth from '../../../utils/hooks/useAuth';
import { useEffect } from 'react';

const LogoutModal = () => {
  const { isLogoutModalOpen } = useAuth();
  const dispatch = useDispatch();
  const close = () => {
    dispatch(toggleLogoutModal());
  }
  const closeOnBackdrop = (e) => {
    if (e.currentTarget === e.target) {
      dispatch(toggleLogoutModal());
    }
  };
  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === 'Escape' && isLogoutModalOpen) {
        dispatch(toggleLogoutModal());
      }
    }
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isLogoutModalOpen]);

  return (
    <div className={isLogoutModalOpen ? css.backdrop : `${css.backdrop} ${css.isHidden}`} onClick={closeOnBackdrop}>
      <div className={css.logoutModal}>
        <button className={css.logoutClose} onClick={close}>
          <img className={css.closeIcon} alt="Close" src={closeIcon}/>
        </button>
        <p className={css.logoutQuestion}>Are you sure you want to leave this page?</p>
        <ul className={css.logoutList}>
          <li><button className={css.logoutYes} onClick={() => dispatch(logout())}>Yes</button></li>
          <li><button className={css.logoutNo} onClick={close}>Cancel</button></li>
        </ul>
      </div>
    </div>
  )
};

export default LogoutModal