import React from 'react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: '📊', label: 'Dashboard', active: true },
    { icon: '📈', label: 'Analytics', active: false },
    { icon: '👥', label: 'Customers', active: false },
    { icon: '💳', label: 'Billing', active: false },
    { icon: '⚙️', label: 'Settings', active: false },
    { icon: '🔌', label: 'Integrations', active: false },
    { icon: '📋', label: 'Reports', active: false },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="menu-list">
          {menuItems.map((item, index) => (
            <li key={index} className={`menu-item ${item.active ? 'active' : ''}`}>
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <div className="upgrade-card">
          <div className="upgrade-icon">⚡</div>
          <div className="upgrade-text">
            <div className="upgrade-title">Upgrade to Pro</div>
            <div className="upgrade-subtitle">Get more features</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;