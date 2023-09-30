import React, { Suspense,useEffect } from 'react';
import {Outlet} from 'react-router-dom';
// import Header from '../components/Header/Header';
// import Navigation from './Navigation/Navigation';
import Notiflix from 'notiflix';
import Loader from '../Loader/Loader';
import useAuth from '../../utils/hooks/useAuth';
import useTransactions from '../../utils/hooks/useTrans';
//import css from './SharedLayout.module.css';
//import Button from '../Buttons/Button/Button';


const SharedLayoutPrivate = () => {
  const { isAuthLoading } = useAuth();
  const { isTransactionsLoading } = useTransactions();

    useEffect(() => {
    if (transactionsError) Notiflix.Notify.failure(transactionsError);
    }, [transactionsError]);
  
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
