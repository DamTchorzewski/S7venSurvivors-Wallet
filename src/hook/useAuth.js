import { useSelector } from 'react-redux';
import {
  selectUser,
  selectAuthError,
  selectIsLoggedIn,
  selectIsAuthLoading,
  selectIsRegistered,
  selectIsRefreshing,
  selectIsLogoutModalOpen,
} from '../redux/auth/selectors';

const useAuth = () => {
  const user = useSelector(selectUser);
  const authError = useSelector(selectAuthError);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAuthLoading = useSelector(selectIsAuthLoading);
  const isRegistered = useSelector(selectIsRegistered);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLogoutModalOpen = useSelector(selectIsLogoutModalOpen);

  return {
    user,
    authError,
    isLoggedIn,
    isAuthLoading,
    isRegistered,
    isRefreshing,
    isLogoutModalOpen,
  };
};

export default useAuth;
