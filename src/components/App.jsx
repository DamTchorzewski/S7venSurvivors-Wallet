import { Routes, Route } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {refreshUser} from '../redux/auth/actions';
import SharedLayoutPublic from './SharedLayout/SharedLayoutPublic';
import SharedLayoutPrivate from './SharedLayout/SharedLayoutPrivate';
import ProtectedRoute from '../routes/ProtectedRoute';
import PrivateRoute from '../routes/PrivateRoute.jsx';
import Login from '../pages/login';



const Register = lazy(() => import('../pages/register'));
const DashBoard = lazy(() => import('../pages/dashboard'));
const Statistics = lazy(() => import('../pages/statistic'));
const Currency = lazy(() => import('../components/Currency/Currency'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="S7venSurvivors-Wallet/" element={<SharedLayoutPublic />}>
          <Route index element={
          <ProtectedRoute redirectTo="/S7venSurvivors-Wallet/dashboard"
            component={<Login />}
          />
          }
          />
          <Route path="register" element={<ProtectedRoute redirectTo="/S7venSurvivors-Wallet/dashboard"
            component={<Register />}
          />
          }
          />
          </Route>
        <Route path="S7venSurvivors-Wallet/dashboard" element={<SharedLayoutPrivate />}>
            <Route index element={<PrivateRoute
              redirectTo="/S7venSurvivors-Wallet/" component={<DashBoard />}
            />
            }
            />
            <Route path="diagram" element={
              <PrivateRoute redirectTo="/S7venSurvivors-Wallet/"
                component={<Statistics />}
              />
         }
            />
            <Route
              path="currency"
              element={
                <PrivateRoute
                  redirectTo="/S7venSurvivors-Wallet/"
                  component={<Currency />}
                />
              }
            />
        </Route>
      </Routes>
    </>
  );      
};
export default App;
