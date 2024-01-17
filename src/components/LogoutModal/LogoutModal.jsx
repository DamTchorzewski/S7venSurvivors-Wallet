import { useEffect } from 'react';
import css from './LogoutModal.module.css';
import Svg from '../../utils/Svg/Svg';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/actions';
import { toggleLogoutModal } from '../../redux/auth/slice';
import useAuth from '../../hook/useAuth';

const LogoutModal = () => {
  const { isLogoutModalOpen } = useAuth();
  const dispatch = useDispatch();

  const close = () => {
    dispatch(toggleLogoutModal());
  };

  const closeOnBackdrop = e => {
    if (e.currentTarget === e.target) {
      dispatch(toggleLogoutModal());
    }
  };

  useEffect(() => {
    const closeOnEscape = e => {
      if (e.key === 'Escape' && isLogoutModalOpen) {
        dispatch(toggleLogoutModal());
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [dispatch, isLogoutModalOpen]);

  return (
    <div
      className={
        isLogoutModalOpen ? css.backdrop : `${css.backdrop} ${css.isHidden}`
      }
      onClick={closeOnBackdrop}
    >
      <div className={css.logoutModal}>
        <button onClick={close}>
          <Svg
            className={css.logoutClose}
            icon="close"
            stroke="#000"
            size="16"
          />
        </button>
        <p className={css.logoutQuestion}>
          Are you sure you want to leave this page?
        </p>
        <ul className={css.logoutList}>
          <li>
            <button
              className={css.logoutYes}
              onClick={() => dispatch(logout())}
            >
              Yes
            </button>
          </li>
          <li>
            <button className={css.logoutNo} onClick={close}>
              Cancel
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LogoutModal;
