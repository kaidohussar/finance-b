import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import './Pages.css';
import { useApi } from '../hooks/useApi';
import { getAccount } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Account: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useApi(getAccount);

  if (loading || error || !data) {
    return (
      <main className="page-content">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          {loading ? <LoadingSpinner /> : <span>{t('common.error', 'Failed to load')}</span>}
        </div>
      </main>
    );
  }

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
              values={{ email: data.email }}
              components={{ strong: <strong /> }}
            />
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-label">{t('account.security')}</div>
          <div className="setting-description">
            <Trans
              i18nKey="account.twoFactor"
              values={{ status: data.twoFactorStatus }}
              components={{ strong: <strong /> }}
            />
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-label">{t('account.preferences')}</div>
          <div className="setting-description">
            <Trans
              i18nKey="account.connectedApps"
              values={{ count: data.connectedApps }}
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
                  values={{ date: data.lastLoginDate, location: data.lastLoginLocation }}
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
                  values={{ date: data.passwordChangedDate }}
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
                values={{ used: data.storageUsed, total: data.storageTotal }}
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
