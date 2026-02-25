import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import './Pages.css';

const Notifications: React.FC = () => {
  const { t } = useTranslation();
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [digestEnabled, setDigestEnabled] = useState(false);

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>{t('notifications.title')}</h1>
      </div>

      <div className="content-section">
        <div className="section-header">
          <div className="setting-label">
            <Trans
              i18nKey="notifications.newNotifications"
              values={{ count: 5 }}
              components={{ strong: <strong /> }}
            />
          </div>
          <button className="btn btn-secondary">{t('notifications.markRead')}</button>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-description">
              <Trans
                i18nKey="notifications.muted"
                values={{ time: '5:00 PM' }}
                components={{ strong: <strong /> }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>{t('notifications.title')}</h2>
        <div className="settings-group">
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">{t('notifications.email')}</div>
              <div className="setting-description">
                <Trans
                  i18nKey="notifications.frequency"
                  values={{ type: 'email', frequency: 'daily' }}
                  components={{ em: <em />, strong: <strong /> }}
                />
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={emailEnabled}
                onChange={(e) => setEmailEnabled(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">{t('notifications.push')}</div>
              <div className="setting-description">
                <Trans
                  i18nKey="notifications.frequency"
                  values={{ type: 'push', frequency: 'instantly' }}
                  components={{ em: <em />, strong: <strong /> }}
                />
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={pushEnabled}
                onChange={(e) => setPushEnabled(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">{t('notifications.digest')}</div>
              <div className="setting-description">
                <Trans
                  i18nKey="notifications.frequency"
                  values={{ type: 'digest', frequency: 'weekly' }}
                  components={{ em: <em />, strong: <strong /> }}
                />
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={digestEnabled}
                onChange={(e) => setDigestEnabled(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-description">
              <Trans
                i18nKey="notifications.unsubscribe"
                components={{ link: <a href="#preferences" /> }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Notifications;
