import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuth } from '../redux/auth/authSelectors';
import PropTypes from 'prop-types'; 

export const PublicRoute = ({ component: Component, redirectTo = '/home' }) => {
    const isAuth = useSelector(selectIsAuth);
    const shouldRedirect = isAuth;
    return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};

export default PublicRoute;

PublicRoute.propTypes = {
    component: PropTypes.node.isRequired, 
    redirectTo: PropTypes.string,
}