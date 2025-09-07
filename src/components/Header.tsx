import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon"></div>
          <span className="logo-text">FinanceB</span>
        </div>
      </div>
      <div className="header-right">
        <div className="search-box">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="user-menu">
          <div className="notifications">
            <span className="notification-count">3</span>
          </div>
          <div className="user-avatar">
            <span>JD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
