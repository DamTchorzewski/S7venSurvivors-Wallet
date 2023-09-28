
//import LoginForm from '../components/LoginForm/LoginForm';
import logo from '../assets/svg/wallet.svg';
import css from '../components/LoginForm/LoginForm.module.css';
import centrumTab from '../assets/tablet-login/image-centrum.png';
import centrumDesk from '../assets/desktop-login/image-centrum.png';
import elementUpTab from '../assets/tablet-login/element-up.png';
import elementDownTab from '../assets/tablet-login/element-down.png';
import elementDownDesk from '../assets/desktop-login/element-down.png';
import Loader from '../components/Loader/Loader';
import useAuth from '../utils/hooks/useAuth';

const Login = () => {
  const { isAuthLoading } = useAuth();

  return (
    <>
      <div className={css.loginContainer}>
        <div className={css.elementTabletUp}>
          <img src={elementUpTab}></img>
        </div>
        <div className={css.desktopContainer}>
          <img src={centrumDesk}></img>
          <span className={css.finance}>Finance App</span>
        </div>
        <div className={css.tabletContainer}>
          <img src={centrumTab}></img>
          <span className={css.finance}>Finance App</span>
        </div>
        <div className={css.loginWrapper}>
          <div className={css.logoContainer}>
            <img className={css.logo} src={logo} alt="wallet-logo"></img>
          </div>
          {/* <LoginForm /> */}
        </div>
        <div className={css.elementTabDown}>
          <img src={elementDownTab}></img>
        </div>
        <div className={css.elementDeskDown}>
          <img src={elementDownDesk}></img>
        </div>
      </div>
      <Loader isVisible={isAuthLoading} />
    </>
  );
};

export default Login;
