import React, { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
// import Header from '../components/Header/Header';
// import Navigation from './Navigation/Navigation';
import Loader from '../Loader/Loader';
import useAuth from '../../utils/hooks/useAuth';
import useTransactions from '../../utils/hooks/useTrans';
import css from './SharedLayout.module.css';
//import Button from '../Buttons/Button/Button';


const SharedLayoutPrivate = () => {
  const { isAuthLoading } = useAuth();
  const { isTransactionsLoading } = useTransactions();

  return (
    <>
      {/* <Header /> */}
      <div className={css.container}>
        {/* <Navigation /> */}
        <Suspense fallback={<Loader />}>
          <Outlet />
        
          
          <Loader isVisible={isAuthLoading || isTransactionsLoading} />
        </Suspense>
      </div>
    </>
  );
};

export default SharedLayoutPrivate;
