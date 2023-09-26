import { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth.js';
import { refreshUser } from '../redux/auth/authOperations.js';

import PublicRoute from '../routes/publicRoute.jsx';

const RegisterPage = lazy(() => import('../pages/register.jsx'));

export const App = () => {
    const dispatch = useDispatch();
    const { isRefreshing } = useAuth();

    useEffect(() => {
        dispatch(refreshUser());
    }, [dispatch]);

    return isRefreshing ? (
        <b>Refreshing user...</b>
    ) : (
        <Routes>
            <Route
            path="/register"
            element={
                <PublicRoute
                redirectTo="/contacts"
                component={<RegisterPage />}
                />
            }
            />
        </Routes>
    )
};