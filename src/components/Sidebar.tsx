import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  const menuItems = [
    { icon: '📊', labelKey: 'sidebar.dashboard', path: '/' },
    { icon: '📈', labelKey: 'sidebar.analytics', path: '/analytics' },
    { icon: '👥', labelKey: 'sidebar.customers', path: '/customers' },
    { icon: '💳', labelKey: 'sidebar.billing', path: '/billing' },
    { icon: '⚙️', labelKey: 'sidebar.settings', path: '/settings' },
    { icon: '🔌', labelKey: 'sidebar.integrations', path: '/integrations' },
    { icon: '📋', labelKey: 'sidebar.reports', path: '/reports' },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="menu-list">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{t(item.labelKey)}</span>
              </NavLink>
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
            <div className="upgrade-description">
              <Trans
                i18nKey="sidebar.upgrade.description"
                components={{
                  strong: <strong />,
                  link: <a href="#learn-more" className="upgrade-link" />
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;