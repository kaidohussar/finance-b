import React from 'react';
import './Pages.css';
import { useTranslation } from 'react-i18next';
import { PieChart } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { getAnalytics } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Analytics: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useApi(getAnalytics);

  if (loading || error || !data) {
    return (
      <main className="page-content">
        <div className="page-state" style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          {loading ? <LoadingSpinner /> : <span>{t('common.error', 'Failed to load')}</span>}
        </div>
      </main>
    );
  }

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>{t('analytics.title')}</h1>
        <p className="page-subtitle">{t('analytics.subtitle')}</p>
      </div>

      <div className="metrics-grid">
        {data.metrics.map((metric, index) => (
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
              {data.topPages.map((page, index) => (
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
