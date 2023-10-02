import React, { Suspense, useEffect, Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Header from '..//Header/Header';
import Navigation from '../Navigation/Navigation';
import useAuth from '../../utils/hooks/useAuth';
import useTransactions from '../../utils/hooks/useTrans';

import LogoutModal from '../Modals/Logout/Logout';
import Notiflix from 'notiflix';
import Media from 'react-media';
import BalanceComponent from '../Balance/Balance';
import Currency from '../Currency/Currency';
import s from './SharedLayout.module.css';

const SharedLayoutPrivate = () => {
  const { isAuthLoading } = useAuth();
  const { isTransactionsLoading, transactionsError } = useTransactions();

  useEffect(() => {
    if (transactionsError) Notiflix.Notify.failure(transactionsError);
  }, [transactionsError]);

  return (
    <>
      <Header />
      <div className={s.container}>
        <div className={s.smallContainer}>
          <div className={s.subContainer}>
            <Navigation />
            <Media queries={{ medium: '(min-width: 768px)' }}>
              {matches => matches.medium && <BalanceComponent />}
            </Media>
          </div>
          <Media queries={{ medium: '(min-width: 768px)' }}>
            {matches => matches.medium && <Currency />}
          </Media>
        </div>
        <Media queries={{ big: '(min-width: 1280px)' }}>
          {matches => matches.big && <div className={s.verticalBorder}></div>}
        </Media>
        <Suspense fallback={<Loader />}>
          <Outlet />
          <Loader isVisible={isAuthLoading || isTransactionsLoading} />
        </Suspense>
      </div>
      <LogoutModal />
    </>
  );
};

export default SharedLayoutPrivate;
