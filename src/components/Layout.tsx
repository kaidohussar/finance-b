import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './Dashboard.css';

const Layout: React.FC = () => {
  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-body">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
