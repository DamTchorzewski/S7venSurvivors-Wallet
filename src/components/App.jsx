import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PublicRoute from '../routes/publicRoute';

const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));

export const App = () => {

    return (
        <>
        <Routes>

            <Route
            path="/home"
            element={
                <PublicRoute redirectTo="/login" component={<RegisterPage />} />
                }
            />

        </Routes>
        <ToastContainer position="bottom-right" />
        </>
    )
};