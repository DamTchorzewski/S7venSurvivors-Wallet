import React, { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Notiflix from 'notiflix';
import useAuth from '../../utils/hooks/useAuth';


const SharedLayoutPublic = () => {
  const { isAuthLoading, authError} = useAuth();

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

export default SharedLayoutPublic;
