import React from 'react';
import { useTranslation } from 'react-i18next';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  const menuItems = [
    { icon: '📊', labelKey: 'sidebar.dashboard', active: true },
    { icon: '📈', labelKey: 'sidebar.analytics', active: false },
    { icon: '👥', labelKey: 'sidebar.customers', active: false },
    { icon: '💳', labelKey: 'sidebar.billing', active: false },
    { icon: '⚙️', labelKey: 'sidebar.settings', active: false },
    { icon: '🔌', labelKey: 'sidebar.integrations', active: false },
    { icon: '📋', labelKey: 'sidebar.reports', active: false },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="menu-list">
          {menuItems.map((item, index) => (
            <li key={index} className={`menu-item ${item.active ? 'active' : ''}`}>
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{t(item.labelKey)}</span>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <div className="upgrade-card">
          <div className="upgrade-icon">⚡</div>
          <div className="upgrade-text">
            <div className="upgrade-title">{t('sidebar.upgrade.title')}</div>
            <div className="upgrade-subtitle">{t('sidebar.upgrade.subtitle')}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;