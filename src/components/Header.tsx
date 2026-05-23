import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { useAuth } from '../hooks/useAuth';
import './Header.css';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon"></div>
          <span className="logo-text">Your Finance App</span>
        </div>
        <div className="welcome-message">
          <Trans
            i18nKey="header.welcomeMessage"
            values={{
              userName: 'John Doe',
              count: 3,
            }}
            components={{
              strong: <strong className="user-name-highlight" />,
              CustomLink: (
                <a href="#notifications" className="notification-link" />
              ),
            }}
          />
        </div>
      </div>
      <div className="header-right">
        <div className="search-box">
          <input type="text" placeholder={t('header.search')} />
        </div>
        <div className="user-menu">
          <LanguageSelector />
          <div className="notifications">
            <span className="notification-count">3</span>
          </div>
          <div className="user-avatar-main">
            <span>JD</span>
          </div>
          <button className="btn btn-secondary" onClick={logout}>
            {t('login.signOut')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
