import { Routes, Route } from "react-router-dom";
import React, { lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import SharedLayoutRestricted from "./SharedLayoutRest";
import SharedLayoutPrivate from "./SharedLayoutPriv";
import PrivateRoute from "../components/PrivateRoute";
import RestrictedRoute from "../components/RestrictedRoute";
import Login from "../pages/login";
import { refreshUser } from "../redux/auth/actions";
import { handleEmailAction } from "../services/emailAction";
import Background from "../components/Background/Background";

const Registration = lazy(() => import("../pages/registration"));
const HomeTab = lazy(() => import("../pages/tabs/homeTab"));
const Currency = lazy(() => import("../components/Currency/Currency"));
const Statistics = lazy(() => import("../pages/statistics"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    handleEmailAction().finally(() => dispatch(refreshUser()));
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/personal-finance-manager/" element={<SharedLayoutRestricted />}>
          <Route
            index
            element={
              <RestrictedRoute
                redirectTo="/personal-finance-manager/dashboard"
                component={<Login />}
              />
            }
          />
          <Route
            path="register"
            element={
              <RestrictedRoute
                redirectTo="/personal-finance-manager/dashboard"
                component={<Registration />}
              />
            }
          />
        </Route>
        <Route path="/personal-finance-manager/dashboard" element={<SharedLayoutPrivate />}>
          <Route
            index
            element={
              <PrivateRoute
                redirectTo="/personal-finance-manager/"
                component={<HomeTab />}
              />
            }
          />
          <Route
            path="diagram"
            element={
              <PrivateRoute
                redirectTo="/personal-finance-manager/"
                component={<Statistics />}
              />
            }
          />
          <Route
            path="currency"
            element={
              <PrivateRoute
                redirectTo="/personal-finance-manager/"
                component={<Currency />}
              />
            }
          />
        </Route>
      </Routes>
      <Background />
    </>
  );
};

export default App;
