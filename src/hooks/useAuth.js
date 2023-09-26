import { useSelector } from "react-redux";
import {
  selectUser,
  selectError,
  selectIsLoggedIn,
  selectIsPending,
  selectIsRefreshing,
} from "../redux/auth/selector";

const useAuth = () => {
  const user = useSelector(selectUser);
  const authError = useSelector(selectError);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAuthPending = useSelector(selectIsPending);
  const isRefreshing = useSelector(selectIsRefreshing);

  return { user, authError, isLoggedIn, isAuthPending, isRefreshing };
};

export default useAuth;