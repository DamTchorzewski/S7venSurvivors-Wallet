import React, { useState } from 'react';
import axios from 'axios';
import ButtonSecondary from '../components/ButtonSecondary';
import Loader from '../components/Loader/Loader';
import useAuth from '../hook/useAuth';
import Notiflix from 'notiflix';
import css from '../components/LoginRegisterForms/LoginRegister.module.css';
import logo from '../utils/Svg/logo.svg';
import RegistrationForm from '../components/LoginRegisterForms/RegistrationForm';
import tabletImg from '../utils/registration/img-tablet.png';
import desktopImg from '../utils/registration/img-desktop.png';

const Registration = () => {
  const { isAuthLoading } = useAuth();

  return (
    <>
      <div className={css.container}>
        <div className={css.tabletContainer}>
          <img src={tabletImg}></img>
          <span className={css.finance}>Finance App</span>
        </div>
        <div className={css.desktopContainer}>
          <img src={desktopImg}></img>
          <span className={css.finance}>Finance App</span>
        </div>
        <div className={css.formContainer}>
          <div className={css.registerWrapper}>
            <img className={css.logo} src={logo} alt="wallet-logo"></img>
            <RegistrationForm />
          </div>
        </div>
      </div>
      <Loader isVisible={isAuthLoading} />
    </>
  );
};

export default Registration;
