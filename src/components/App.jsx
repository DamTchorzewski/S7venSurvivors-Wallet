import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from '../redux/auth/authSelectors';
// import PrivateRoute from '../routes/PrivateRoute';
import PublicRoute from '../routes/publicRoute';

const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));

export const App = () => {
    // const dispatch = useDispatch();
    const isLoading = useSelector(authSelectors.getLoading)

    // useEffect(() => {
    //     dispatch(authOperations.fetchCurrentUser());
    // }, [dispatch]);

    return (
        !isLoading && (
            <>  
                <Routes>
                    <Route path="/signup" element={<PublicRoute redirectTo="/login" restricted><RegisterPage /></PublicRoute>} />
                </Routes>
            </>
        )
    );
};