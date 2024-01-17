import { Routes, Route } from "react-router-dom";
import React, { lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import SharedLayoutRestricted from "./SharedLayoutRest";
import SharedLayoutPrivate from "./SharedLayoutPriv";
import PrivateRoute from "../components/PrivateRoute";
import RestrictedRoute from "../components/RestrictedRoute";
import Login from "../pages/login";
import { refreshUser } from "../redux/auth/actions";
import Background from "../components/Background/Background";

const Registration = lazy(() => import("../pages/registration"));
const HomeTab = lazy(() => import("../pages/tabs/homeTab"));
const Currency = lazy(() => import("../components/Currency/Currency"));
const Statistics = lazy(() => import("../pages/statistics"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/S7venSurvivors-Wallet/" element={<SharedLayoutRestricted />}>
          <Route
            index
            element={
              <RestrictedRoute
                redirectTo="/S7venSurvivors-Wallet/dashboard"
                component={<Login />}
              />
            }
          />
          <Route
            path="register"
            element={
              <RestrictedRoute
                redirectTo="/S7venSurvivors-Wallet/dashboard"
                component={<Registration />}
              />
            }
          />
        </Route>
        <Route path="/S7venSurvivors-Wallet/dashboard" element={<SharedLayoutPrivate />}>
          <Route
            index
            element={
              <PrivateRoute
                redirectTo="/S7venSurvivors-Wallet/"
                component={<HomeTab />}
              />
            }
          />
          <Route
            path="diagram"
            element={
              <PrivateRoute
                redirectTo="/S7venSurvivors-Wallet/"
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
      <Background />
    </>
  );
};

export default App;
