import React, { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Notiflix from 'notiflix';
import Loader from '../components/Loader/Loader';
import useAuth from '../hook/useAuth';

const SharedLayoutRestricted = () => {
  const { isAuthLoading, authError } = useAuth();

  useEffect(() => {
    if (authError) Notiflix.Notify.failure(authError);
  }, [authError]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Outlet />
        <Loader isVisible={isAuthLoading} />
      </Suspense>
    </>
  );
};

export default SharedLayoutRestricted;
