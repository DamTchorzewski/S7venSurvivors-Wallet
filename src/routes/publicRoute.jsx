import { useSelector } from 'react-redux';
import { useNavigate, Route } from 'react-router-dom';
import authSelectors from '../redux/auth/authSelectors';
import PropTypes from 'prop-types';

const PublicRoute = ({
    children,
    restricted = false,
    redirectTo = '/',
    ...routeProps
}) => {
    const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
    const navigate = useNavigate();

    const shouldRedirect = isLoggedIn && restricted;

    if (shouldRedirect) {
        navigate(redirectTo);
        return null; 
    }

    return (
        <Route {...routeProps}>
            {children}
        </Route>
    );
}

export default PublicRoute;

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
    restricted: PropTypes.bool,
    redirectTo: PropTypes.string,
};