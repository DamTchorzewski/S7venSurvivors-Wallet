import { lazy } from 'react';
import { Switch } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import PrivateRoute from '../routes/PrivateRoute';
import PublicRoute from '../routes/publicRoute';

const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));

export const App = () => {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(authOperations.fetchCurrentUser());
    // }, [dispatch]);

    return (
        // !isLoading && (
        <Switch>
            <PublicRoute path="/signup" redirectTo="/login" restricted>
                <RegisterPage />
            </PublicRoute>
        </Switch>
        // )
    );
};