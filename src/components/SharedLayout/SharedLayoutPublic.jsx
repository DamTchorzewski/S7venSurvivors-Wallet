import React, { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Loader from '../Loader/Loader';
//import Button from '../components/Buttons/Button';
import useAuth from '../../utils/hooks/useAuth';

const SharedLayoutPublic = () => {
  const { isAuthLoading } = useAuth();

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Outlet />
        <Link to="dashboard">
          {/* <Button text="Go to Dashboard" /> */}
        </Link>
        <Loader isVisible={isAuthLoading} />
      </Suspense>
    </>
  );
};

export default SharedLayoutPublic;
