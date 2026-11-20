import { Link } from 'react-router-dom';
import Svg from '../../utils/Svg/Svg';
import css from './Header.module.css';
import useAuth from '../../hook/useAuth';
import { toggleLogoutModal } from '../../redux/auth/slice';
import { useDispatch } from 'react-redux';
import Notiflix from 'notiflix';
import { resetDemo } from '../../redux/trans/actions';

const Header = () => {
  const dispatch = useDispatch();
  const { user, isDemo } = useAuth();

  const openModal = () => {
    dispatch(toggleLogoutModal());
  }

  const handleResetDemo = () => {
    Notiflix.Confirm.show(
      'Reset the demo',
      'Restore the sample transactions? Your changes in the demo will be lost.',
      'Reset',
      'Cancel',
      () => dispatch(resetDemo())
    );
  };
  return (
    <header className={css.headerContainer}>
      <div className={css.headerWrapper}>
        <div className={css.headerSide}>
          <Link to='/personal-finance-manager/dashboard' className={css.headerLogo}>
            <Svg icon='wallet' size='40' />
            <h2 className={css.appName}>Wallet</h2>
          </Link>
        </div>
        <div className={css.headerSide}>
          {isDemo && (
            <button className={css.headerDemo} onClick={handleResetDemo}>
              Demo · reset data
            </button>
          )}
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