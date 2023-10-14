import React, { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Notiflix from 'notiflix';
import useAuth from '../../utils/hooks/useAuth';



const SharedLayoutPublic = () => {
  const { isAuthLoading, Error } = useAuth();

  useEffect(() => {
    if (Error) Notiflix.Notify.failure(Error);
  }, [Error]);

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
