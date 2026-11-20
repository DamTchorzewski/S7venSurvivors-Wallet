import Loader from '../components/Loader/Loader';
import css from '../components/LoginRegisterForms/LoginRegister.module.css';
import logo from '../utils/Svg/logo.svg';
import RegistrationForm from '../components/LoginRegisterForms/RegistrationForm';
import tabletImg from '../utils/registration/img-tablet.png';
import desktopImg from '../utils/registration/img-desktop.png';

const Registration = () => {
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
      <Loader />
    </>
  );
};

export default Registration;
