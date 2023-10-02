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
import styles from './SharedLayoutPrivate.module.css';

const SharedLayoutPrivate = () => {
  const { isAuthLoading } = useAuth();
  const { isTransactionsLoading, transactionsError } = useTransactions();

  useEffect(() => {
    if (transactionsError) Notiflix.Notify.failure(transactionsError);
  }, [transactionsError]);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.smallContainer}>
          <div className={styles.subContainer}>
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
          {matches => matches.big && <div className={styles.verticalBorder}></div>}
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
