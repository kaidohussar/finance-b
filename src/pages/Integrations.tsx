import React from 'react';
import './Pages.css';
import { useTranslation } from 'react-i18next';
import { MessageSquare, BarChart3, CreditCard, Mail, Zap, Github } from 'lucide-react';

const Integrations: React.FC = () => {
  const { t } = useTranslation();

  const integrations = [
    {
      nameKey: 'integrations.items.slack.name',
      descriptionKey: 'integrations.items.slack.description',
      icon: <MessageSquare size={24} />,
      connected: true,
      categoryKey: 'integrations.categories.communication',
    },
    {
      nameKey: 'integrations.items.googleAnalytics.name',
      descriptionKey: 'integrations.items.googleAnalytics.description',
      icon: <BarChart3 size={24} />,
      connected: true,
      categoryKey: 'integrations.categories.analytics',
    },
    {
      nameKey: 'integrations.items.stripe.name',
      descriptionKey: 'integrations.items.stripe.description',
      icon: <CreditCard size={24} />,
      connected: false,
      categoryKey: 'integrations.categories.payments',
    },
    {
      nameKey: 'integrations.items.mailchimp.name',
      descriptionKey: 'integrations.items.mailchimp.description',
      icon: <Mail size={24} />,
      connected: false,
      categoryKey: 'integrations.categories.marketing',
    },
    {
      nameKey: 'integrations.items.zapier.name',
      descriptionKey: 'integrations.items.zapier.description',
      icon: <Zap size={24} />,
      connected: false,
      categoryKey: 'integrations.categories.automation',
    },
    {
      nameKey: 'integrations.items.github.name',
      descriptionKey: 'integrations.items.github.description',
      icon: <Github size={24} />,
      connected: true,
      categoryKey: 'integrations.categories.development',
    },
  ];

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
          {integrations.map((integration, index) => (
            <div key={index} className="integration-card">
              <div className="integration-header">
                <span className="integration-icon">{integration.icon}</span>
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
                    <button className="btn-link">{t('integrations.configure')}</button>
                  </>
                ) : (
                  <button className="btn btn-primary">{t('integrations.connect')}</button>
                )}
              </div>
            </div>
          ))}
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
