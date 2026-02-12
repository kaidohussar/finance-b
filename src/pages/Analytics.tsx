import React from 'react';
import './Pages.css';
import { useTranslation } from 'react-i18next';
import { PieChart } from 'lucide-react';

const Analytics: React.FC = () => {
  const { t } = useTranslation();

  const metrics = [
    {
      labelKey: 'analytics.metrics.pageViews',
      value: '245,678',
      change: '+12.5%',
      trend: 'up',
    },
    {
      labelKey: 'analytics.metrics.uniqueVisitors',
      value: '89,432',
      change: '+8.3%',
      trend: 'up',
    },
    {
      labelKey: 'analytics.metrics.bounceRate',
      value: '34.2%',
      change: '-3.1%',
      trend: 'down',
    },
    {
      labelKey: 'analytics.metrics.avgSession',
      value: '4m 32s',
      change: '+15.2%',
      trend: 'up',
    },
  ];

  const topPages = [
    { page: '/home', views: 45678, uniqueVisitors: 23456 },
    { page: '/products', views: 34567, uniqueVisitors: 18901 },
    { page: '/about', views: 23456, uniqueVisitors: 12345 },
    { page: '/contact', views: 12345, uniqueVisitors: 8901 },
    { page: '/blog', views: 9876, uniqueVisitors: 5678 },
  ];

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>{t('analytics.title')}</h1>
        <p className="page-subtitle">{t('analytics.subtitle')}</p>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-label">{t(metric.labelKey)}</div>
            <div className="metric-value">{metric.value}</div>
            <div className={`metric-change ${metric.trend}`}>
              {metric.trend === 'up' ? '↗' : '↘'} {metric.change}
            </div>
          </div>
        ))}
      </div>

      <div className="content-section">
        <h2>{t('analytics.topPages')}</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('analytics.table.page')}</th>
                <th>{t('analytics.table.views')}</th>
                <th>{t('analytics.table.uniqueVisitors')}</th>
                <th>{t('analytics.table.test')}</th>
                <th>{t('analytics.table.test2')}</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((page, index) => (
                <tr key={index}>
                  <td>{page.page}</td>
                  <td>{page.views.toLocaleString()}</td>
                  <td>{page.uniqueVisitors.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="content-section">
        <h2>{t('analytics.trafficSources')}</h2>
        <div className="chart-placeholder">
          <div className="placeholder-content">
            <span className="placeholder-icon">
              <PieChart size={48} />
            </span>
            <p>{t('analytics.chartPlaceholder')}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Analytics;
