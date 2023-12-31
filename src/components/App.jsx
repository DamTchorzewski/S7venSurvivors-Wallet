import { Routes, Route } from "react-router-dom";
import React, { lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import PrivateRoute from "./PrivateRoute";
import SharedLayoutPublic from "./SharedLayout/SharedLayoutPublic";
import SharedLayoutPrivate from "./SharedLayout/SharedLayoutPrivate";
import { refreshUser } from "../redux/auth/actions";
import Login from "../pages/login";
import Background from "../components/Background/Background";



const Register = lazy(() => import("../pages/register"));
const HomeTab = lazy(() => import("../components/Tabs/HomeTab"));
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
        <Route path="/S7venSurvivors-Wallet/" element={<SharedLayoutPublic />}>
          <Route
            index
            element={
              <ProtectedRoute
                redirectTo="/S7venSurvivors-Wallet/dashboard"
                component={<Login />}
              />
            }
          />
          <Route
            path="register"
            element={
              <ProtectedRoute
                redirectTo="/S7venSurvivors-Wallet/dashboard"
                component={<Register />}
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
