import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import authSelectors from '../redux/auth/auth-selectors';
import PropTypes from 'prop-types';

export const PublicRoute = ({
    children,
    restricted = false,
    redirectTo = '/',
    ...routeProps
}) => {
    const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
    const shouldRedirect = isLoggedIn && restricted;

    return (
        <Route {...routeProps}>
            {shouldRedirect ? <Redirect to={redirectTo} /> : children}
        </Route>
    );
}

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
    restricted: PropTypes.bool,
    redirectTo: PropTypes.string,
};