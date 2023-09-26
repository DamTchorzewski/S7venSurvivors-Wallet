import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../redux/auth/authSelectors';
import { useEffect } from 'react';
import { fetchCurrentUser } from '../redux/auth/authOperations';
import PropTypes from 'prop-types';

export const PrivateRoute = ({
    component: Component,
    redirectTo = '/home',
}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    const token = useSelector(selectToken);
    const shouldRedirect = !token;

    return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};

PrivateRoute.propTypes = {
    component: PropTypes.node.isRequired,
    redirectTo: PropTypes.string,
};
