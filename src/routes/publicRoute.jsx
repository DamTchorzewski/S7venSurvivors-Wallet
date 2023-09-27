import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../../utils/hooks/useAuth";

const PublicRoute = ({ redirectTo, component: Component }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

PublicRoute.propTypes = {
  redirectTo: PropTypes.string.isRequired,
  component: PropTypes.node.isRequired,
};

export default PublicRoute;
