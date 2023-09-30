import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import img from '../../images/logo.svg';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { selectName } from 'redux/auth/auth-selectors';
import { toggleModalOpen, setModalType } from 'redux/global/global-slice';
import { selectIsModalOpen } from 'redux/global/global-selectors';
import { ModalLogout } from 'components/ModalLogout/ModalLogout';

export const Header = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectName);
  const isModalOpen = useSelector(selectIsModalOpen);

  const handleLogoutClick = () => {
    dispatch(setModalType('logout'));
    dispatch(toggleModalOpen());
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__container}>
          <div className={styles.logo}>
            <NavLink
              className={styles.logo__link}
              to="/home"
              style={{ textDecoration: 'none', color: 'unset' }}
            >
              <img className={styles.logo__img} alt="Logo" src={img} />{' '}
              <span className={styles.logo__name}> Wallet</span>
            </NavLink>
          </div>
          <div className={styles.auth__container}>
            <p className={styles.user__name}>{name}</p>
            <button
              type="button"
              className={styles.button__logout}
              onClick={handleLogoutClick}
            >
              <LogoutIcon className={styles.logout__icon} />
              <span className={styles.logout__text}>Exit</span>
            </button>
          </div>
        </div>
      </header>
      {isModalOpen && <ModalLogout />}
    </>
  );
};