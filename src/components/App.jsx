import { Routes, Route } from 'react-router-dom';
import React, { lazy, useEffect } from 'react';
import SharedLayoutPublic from './SharedLayout/SharedLayoutPublic';
import Login from '../pages/login';
import SharedLayoutPrivate from './SharedLayout/SharedLayoutPrivate';
//import {refreshUser} from '../redux/auth/actions';
//import { useDispatch } from 'react-redux';


const Register = lazy(() => import('../pages/register'));
const DashBoard = lazy(() => import('../pages/dashboard'));


const App = () => {
  return (
    <>
      <Routes>
        <Route path="S7venSurvivors-Wallet/" element={<SharedLayoutPublic />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
         
        <Route path="S7venSurvivors-Wallet/dashboard" element={<SharedLayoutPrivate />}>
          <Route index element={<DashBoard />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );      
};
export default App;
