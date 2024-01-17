import React from "react";
import LoginForm from "../components/LoginRegisterForms/LoginForm";
import logo from "../utils/Svg/logo.svg";
import css from "../components/LoginRegisterForms/LoginRegister.module.css";
import tabletImg from "../utils/login/img-tablet.png";
import desktopImg from "../utils/login/img-desktop.png";
import Loader from "../components/Loader/Loader";
import useAuth from "../hook/useAuth";


const Login = () => {
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
          <div className={css.loginWrapper}>
            <div className={css.logoWrapper}>
              <img className={css.logo} src={logo} alt="wallet-logo"></img>
              
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
      <Loader isVisible={isAuthLoading} />
    </>
  );
};

export default Login;
