import React, { useState } from 'react';
import './Pages.css';
import { useTranslation } from 'react-i18next';
import { MessageSquare, BarChart3, CreditCard, Mail, Zap, Github } from 'lucide-react';
import { getIntegrations, toggleIntegration } from '../utils/api';
import { useApi } from '../hooks/useApi';
import LoadingSpinner from '../components/LoadingSpinner';

const ICONS: Record<string, React.ReactNode> = {
  slack: <MessageSquare size={24} />,
  googleAnalytics: <BarChart3 size={24} />,
  stripe: <CreditCard size={24} />,
  mailchimp: <Mail size={24} />,
  zapier: <Zap size={24} />,
  github: <Github size={24} />,
};

const Integrations: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading, error, setData } = useApi(getIntegrations);
  const [pendingKey, setPendingKey] = useState<string | null>(null);

  const handleToggle = async (key: string) => {
    setPendingKey(key);
    try {
      const updated = await toggleIntegration(key);
      setData((prev) => ({
        integrations: prev!.integrations.map((i) => (i.key === key ? updated : i)),
      }));
    } finally {
      setPendingKey(null);
    }
  };

  if (loading || !data) {
    return (
      <main className="page-content">
        <LoadingSpinner />
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-content">
        <p>{t('common.error', 'Failed to load')}</p>
      </main>
    );
  }

  const integrations = data.integrations;

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>{t('integrations.title')}</h1>
        <p className="page-subtitle">{t('integrations.subtitle')}</p>
      </div>

      <div className="content-section">
        <div className="integration-stats">
          <div className="stat-item">
            <span className="stat-number">
              {integrations.filter((i) => i.connected).length}
            </span>
            <span className="stat-label">{t('integrations.connected')}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{integrations.length}</span>
            <span className="stat-label">{t('integrations.available')}</span>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>{t('integrations.featuresTitle')}</h2>
        <div className="integrations-grid">
          {integrations.map((integration) => {
            const isPending = pendingKey === integration.key;
            return (
              <div key={integration.key} className="integration-card">
                <div className="integration-header">
                  <span className="integration-icon">{ICONS[integration.key]}</span>
                  <span className="integration-category">
                    {t(integration.categoryKey)}
                  </span>
                </div>
                <h3 className="integration-name">{t(integration.nameKey)}</h3>
                <p className="integration-description">
                  {t(integration.descriptionKey)}
                </p>
                <div className="integration-footer">
                  {integration.connected ? (
                    <>
                      <span className="status-badge active">{t('integrations.connected')}</span>
                      <button
                        className="btn-link"
                        onClick={() => handleToggle(integration.key)}
                        disabled={isPending}
                      >
                        {isPending
                          ? t('common.loading', 'Loading...')
                          : t('integrations.configure')}
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleToggle(integration.key)}
                      disabled={isPending}
                    >
                      {isPending
                        ? t('common.loading', 'Loading...')
                        : t('integrations.connect')}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="content-section">
        <div className="info-box">
          <h3>{t('integrations.customIntegration.title')}</h3>
          <p>{t('integrations.customIntegration.description')}</p>
          <button className="btn btn-secondary">{t('integrations.customIntegration.contactUs')}</button>
        </div>
      </div>
    </main>
  );
};

export default Integrations;
