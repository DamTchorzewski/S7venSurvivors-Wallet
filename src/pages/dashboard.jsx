import React, { Fragment, lazy } from 'react';
import Media from 'react-media';
import { Dashboard } from '../components/Dashboard/Dashboard';
 import { DashboardMobile } from '../components/Dashboard/DashboardMobile';


const DashBoard = () => {
  return (
    <>

      <Media
        queries={{
          small: "(max-width: 768px)",
          medium: "(min-width: 769px)",
        }}
      >
        {(matches) => (
          <Fragment>
            {matches.small && <DashboardMobile />}
            {matches.medium && <Dashboard />}
          </Fragment>
        )}
      </Media>
    </>
  );
};
export default DashBoard;

