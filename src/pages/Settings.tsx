import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Pages.css';

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>{t('pages.settings.title')}</h1>
        <p className="page-subtitle">{t('pages.settings.subtitle')}</p>
      </div>

      <div className="content-section">
        <h2>{t('pages.settings.profile.title')}</h2>
        <div className="form-group">
          <label>{t('pages.settings.profile.fullName')}</label>
          <input type="text" className="form-input" defaultValue="John Doe" />
        </div>
        <div className="form-group">
          <label>{t('pages.settings.profile.email')}</label>
          <input type="email" className="form-input" defaultValue="john@example.com" />
        </div>
        <div className="form-group">
          <label>{t('pages.settings.profile.company')}</label>
          <input type="text" className="form-input" defaultValue="Acme Inc." />
        </div>
        <button className="btn btn-primary">{t('pages.settings.profile.saveChanges')}</button>
      </div>

      <div className="content-section">
        <h2>{t('pages.settings.notifications.title')}</h2>
        <div className="settings-group">
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">{t('pages.settings.notifications.email.label')}</div>
              <div className="setting-description">{t('pages.settings.notifications.email.description')}</div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">{t('pages.settings.notifications.push.label')}</div>
              <div className="setting-description">{t('pages.settings.notifications.push.description')}</div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={pushNotifications}
                onChange={(e) => setPushNotifications(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>{t('pages.settings.appearance.title')}</h2>
        <div className="settings-group">
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">{t('pages.settings.appearance.darkMode.label')}</div>
              <div className="setting-description">{t('pages.settings.appearance.darkMode.description')}</div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="content-section danger-zone">
        <h2>{t('pages.settings.dangerZone.title')}</h2>
        <div className="danger-actions">
          <div className="danger-item">
            <div>
              <div className="danger-label">{t('pages.settings.dangerZone.resetAccount.label')}</div>
              <div className="danger-description">{t('pages.settings.dangerZone.resetAccount.description')}</div>
            </div>
            <button className="btn btn-danger">{t('pages.settings.dangerZone.resetAccount.button')}</button>
          </div>
          <div className="danger-item">
            <div>
              <div className="danger-label">{t('pages.settings.dangerZone.deleteAccount.label')}</div>
              <div className="danger-description">{t('pages.settings.dangerZone.deleteAccount.description')}</div>
            </div>
            <button className="btn btn-danger">{t('pages.settings.dangerZone.deleteAccount.button')}</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;