import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../utils/hooks/useAuth";

const ProtectedRoute = ({ redirectTo, component: Component }) => {
const { isLoggedIn } = useAuth();
  
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;};

ProtectedRoute.propTypes = {
  redirectTo: PropTypes.string.isRequired,
  component: PropTypes.node.isRequired,
};

export default ProtectedRoute;
