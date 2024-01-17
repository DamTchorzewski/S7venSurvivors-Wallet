import React, { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import Header from '../components/Header/Header';
import Navigation from './Navigation/Navigation';
import useAuth from '../hook/useAuth';
import useTransactions from '../hook/useTransactions';
import css from './SharedLayout.module.css';
import LogoutModal from '../components/LogoutModal/LogoutModal';
import Notiflix from 'notiflix';
import Media from 'react-media';
import BalanceComponent from '../components/Balance/Balance';
import Currency from '../components/Currency/Currency';

const SharedLayoutPrivate = () => {
  const { isAuthLoading } = useAuth();
  const { isTransactionsLoading, transactionsError } = useTransactions();

  useEffect(() => {
    if (transactionsError) Notiflix.Notify.failure(transactionsError);
  }, [transactionsError]);

  return (
    <>
      <Header />
      <div className={css.container}>
        <div className={css.wrapper}>
          <div className={css.smallContainer}>
            <div className={css.subContainer}>
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
            {matches =>
              matches.big && <div className={css.verticalBorder}></div>
            }
          </Media>
          <Suspense fallback={<Loader />}>
            <Outlet />
            <Loader isVisible={isAuthLoading || isTransactionsLoading} />
          </Suspense>
        </div>
      </div>
      <LogoutModal />
    </>
  );
};

export default SharedLayoutPrivate;
