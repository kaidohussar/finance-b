import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  CreditCard,
  Settings,
  Plug,
  FileText,
  UserCircle,
  CalendarDays,
  FolderOpen,
  Mail,
  Bell,
  Rocket,
  FolderKanban,
  CheckSquare,
  UsersRound,
} from 'lucide-react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      labelKey: 'sidebar.dashboard',
      path: '/',
    },
    {
      icon: <TrendingUp size={20} />,
      labelKey: 'sidebar.analytics',
      path: '/analytics',
    },
    {
      icon: <Users size={20} />,
      labelKey: 'sidebar.customers',
      path: '/customers',
    },
    {
      icon: <CreditCard size={20} />,
      labelKey: 'sidebar.billing',
      path: '/billing',
    },
    {
      icon: <Settings size={20} />,
      labelKey: 'sidebar.settings',
      path: '/settings',
    },
    {
      icon: <Plug size={20} />,
      labelKey: 'sidebar.integrations',
      path: '/integrations',
    },
    {
      icon: <FileText size={20} />,
      labelKey: 'sidebar.reports',
      path: '/reports',
    },
    {
      icon: <UserCircle size={20} />,
      labelKey: 'sidebar.account',
      path: '/account',
    },
    {
      icon: <CalendarDays size={20} />,
      labelKey: 'sidebar.calendar',
      path: '/calendar',
    },
    {
      icon: <FolderOpen size={20} />,
      labelKey: 'sidebar.files',
      path: '/files',
    },
    {
      icon: <Mail size={20} />,
      labelKey: 'sidebar.inbox',
      path: '/inbox',
    },
    {
      icon: <Bell size={20} />,
      labelKey: 'sidebar.notifications',
      path: '/notifications',
    },
    {
      icon: <Rocket size={20} />,
      labelKey: 'sidebar.onboarding',
      path: '/onboarding',
    },
    {
      icon: <FolderKanban size={20} />,
      labelKey: 'sidebar.projects',
      path: '/projects',
    },
    {
      icon: <CheckSquare size={20} />,
      labelKey: 'sidebar.tasks',
      path: '/tasks',
    },
    {
      icon: <UsersRound size={20} />,
      labelKey: 'sidebar.team',
      path: '/team',
    },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="menu-list">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `menu-item ${isActive ? 'active' : ''}`
                }
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
          <div className="upgrade-text">
            <div className="upgrade-description">
              <Trans
                i18nKey="sidebar.upgrade.description"
                components={{
                  strong: <strong />,
                  link: <a></a>,
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
