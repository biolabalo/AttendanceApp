import React from 'react';
import Navbar from 'components/Navbar';

const Dashboard = ({ children }) => (
  <>
    <Navbar />
    <div className="pt-5">
      <div className="flex justify-between container my-0 mx-auto h-full">
        {children}
      </div>
    </div>
  </>
);

export default Dashboard;
