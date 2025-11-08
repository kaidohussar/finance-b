import React from 'react';
import './Pages.css';

const Integrations: React.FC = () => {

  const integrations = [
    {
      name: 'Slack',
      description: 'Send notifications to your Slack workspace',
      icon: '💬',
      connected: true,
      category: 'Communication',
    },
    {
      name: 'Google Analytics',
      description: 'Track website analytics and visitor behavior',
      icon: '📊',
      connected: true,
      category: 'Analytics',
    },
    {
      name: 'Stripe',
      description: 'Process payments and manage subscriptions',
      icon: '💳',
      connected: false,
      category: 'Payments',
    },
    {
      name: 'Mailchimp',
      description: 'Email marketing and automation platform',
      icon: '✉️',
      connected: false,
      category: 'Marketing',
    },
    {
      name: 'Zapier',
      description: 'Connect with 1000+ apps and automate workflows',
      icon: '⚡',
      connected: false,
      category: 'Automation',
    },
    {
      name: 'GitHub',
      description: 'Integrate with your code repositories',
      icon: '🐙',
      connected: true,
      category: 'Development',
    },
  ];

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>Integrations</h1>
        <p className="page-subtitle">Connect your favorite tools and services</p>
      </div>

      <div className="content-section">
        <div className="integration-stats">
          <div className="stat-item">
            <span className="stat-number">{integrations.filter(i => i.connected).length}</span>
            <span className="stat-label">Connected</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{integrations.length}</span>
            <span className="stat-label">Available</span>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>All Integrations</h2>
        <div className="integrations-grid">
          {integrations.map((integration, index) => (
            <div key={index} className="integration-card">
              <div className="integration-header">
                <span className="integration-icon">{integration.icon}</span>
                <span className="integration-category">{integration.category}</span>
              </div>
              <h3 className="integration-name">{integration.name}</h3>
              <p className="integration-description">{integration.description}</p>
              <div className="integration-footer">
                {integration.connected ? (
                  <>
                    <span className="status-badge active">Connected</span>
                    <button className="btn-link">Configure</button>
                  </>
                ) : (
                  <button className="btn btn-primary">Connect</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <div className="info-box">
          <h3>Need a custom integration?</h3>
          <p>Contact our team to discuss building a custom integration for your specific needs.</p>
          <button className="btn btn-secondary">Contact Us</button>
        </div>
      </div>
    </main>
  );
};

export default Integrations;
