import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// import Loader from '../Loader/Loader';

// import useAuth from '../../utils/hooks/useAuth';

const SharedLayoutPublic = () => {
  // const { isAuthLoading } = useAuth();

  return (
    <>
      <Suspense fallback={null}>
        <Outlet />
        {/* <Loader isVisible={isAuthLoading} /> */}
      </Suspense>
    </>
  );
};

export default SharedLayoutPublic;
