import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import './Pages.css';

const Account: React.FC = () => {
  const { t } = useTranslation();

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>{t('account.title')}</h1>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">{t('account.profile')}</div>
          <div className="setting-description">
            <Trans
              i18nKey="account.email"
              values={{ email: 'john@example.com' }}
              components={{ strong: <strong /> }}
            />
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-label">{t('account.security')}</div>
          <div className="setting-description">
            <Trans
              i18nKey="account.twoFactor"
              values={{ status: 'enabled' }}
              components={{ strong: <strong /> }}
            />
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-label">{t('account.preferences')}</div>
          <div className="setting-description">
            <Trans
              i18nKey="account.connectedApps"
              values={{ count: 4 }}
              components={{ strong: <strong /> }}
            />
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>{t('account.security')}</h2>
        <div className="settings-group">
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-description">
                <Trans
                  i18nKey="account.lastLogin"
                  values={{ date: '2024-03-14', location: 'San Francisco, CA' }}
                  components={{ em: <em />, strong: <strong /> }}
                />
              </div>
            </div>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-description">
                <Trans
                  i18nKey="account.passwordChanged"
                  values={{ date: '2024-02-28' }}
                  components={{ em: <em />, link: <a href="#update-password" /> }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>{t('account.preferences')}</h2>
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-description">
              <Trans
                i18nKey="account.storageUsed"
                values={{ used: '4.2 GB', total: '10 GB' }}
                components={{ strong: <strong /> }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Account;
