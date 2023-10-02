import { useSelector } from "react-redux";
import {
  selectUser,
  selectError,
  selectIsLoggedIn,
  selectIsAuthLoading,
  selectIsPending,
  selectIsRefreshing,
  selectIsLogoutModalOpen
} from "../../redux/auth/selectors";

const useAuth = () => {
  const user = useSelector(selectUser);
  const Error = useSelector(selectError);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAuthLoading = useSelector(selectIsAuthLoading);
  const isAuthPending = useSelector(selectIsPending);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLogoutModalOpen = useSelector(selectIsLogoutModalOpen);

  return {
    user,
    Error,
    isLoggedIn,
    isAuthLoading,
    isAuthPending,
    isRefreshing,
     isLogoutModalOpen
  };
};

export default useAuth;