import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hook/useAuth';

const PrivateRoute = ({ redirectTo, component: Component }) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};

PrivateRoute.propTypes = {
  redirectTo: PropTypes.string.isRequired,
  component: PropTypes.node.isRequired,
};

export default PrivateRoute;
