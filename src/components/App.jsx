import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
// import { useDispatch } from 'react-redux';
import SharedLayoutPublic from './SharedLayout/SharedLayoutPublic';
import SharedLayoutPrivate from './SharedLayout/SharedLayoutPrivate';
import PublicRoute from '../routes/publicRoute';
import PrivateRoute from '../routes/privateRoute';
import Login from '../pages/login';
// import {refreshUser} from '../redux/auth/actions';


const Register = lazy(() => import('../pages/register'));
const DashBoard = lazy(() => import('../pages/dashboard'));
const Statistics = lazy(() => import('../pages/statistic'));
const Currency = lazy(() => import('../components/Currency/Currency'));

const App = () => {
  return (
    <>
      <Routes>
        <Route path="S7venSurvivors-Wallet/" element={<SharedLayoutPublic />}>
          <Route index element={
          <PublicRoute redirectTo="/S7venSurvivors-Wallet/dashboard"
            component={<Login />}
          />
          }
          />
          <Route path="register" element={<PublicRoute redirectTo="/S7venSurvivors-Wallet/dashboard"
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
