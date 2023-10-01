import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Notiflix from 'notiflix';
import useAuth from '../../utils/hooks/useAuth';
import { selectIsRefreshing } from '../../redux/auth/selectors';


const SharedLayoutPublic = () => {
  const { authError} = useAuth();

  useEffect(() => {
    if (authError) Notiflix.Notify.failure(authError);
  }, [authError]);

  const isRefreshing = useSelector(selectIsRefreshing);

  return (
    <>
      {isRefreshing ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      )}
    </>
  );
};

export default SharedLayoutPublic;
