import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuth } from '../redux/auth/authSelectors';
import PropTypes from 'prop-types'; 

const PublicRoute = ({ component: Component, redirectTo = '/home' }) => {
    const isAuth = useSelector(selectIsAuth);
    return isAuth ? <Navigate to={redirectTo} /> : Component;
};

export default PublicRoute;

PublicRoute.propTypes = {
    component: PropTypes.elementType.isRequired, 
    redirectTo: PropTypes.string,
}