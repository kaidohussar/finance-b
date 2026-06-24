import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { getDashboardChart } from '../utils/api';
import { useApi } from '../hooks/useApi';
import LoadingSpinner from './LoadingSpinner';
import './Chart.css';

const Chart: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useApi(getDashboardChart);

  const points = data?.points ?? [];
  const maxValue = points.length ? Math.max(...points.map((d) => d.value)) : 0;

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>{t('chart.title')}</h3>
        <div className="chart-period">
          <span className="period-label">{t('chart.period')}</span>
        </div>
      </div>
      <div className="chart-description">
        <Trans
          i18nKey="chart.description"
          values={{
            startDate: data?.startDate ?? '',
            endDate: data?.endDate ?? '',
          }}
          components={{
            strong: <strong className="date-highlight" />,
          }}
        />
      </div>

      <div className="chart">
        {loading || error || !data ? (
          <div className="chart-state">
            {loading ? <LoadingSpinner /> : <span>{t('common.error', 'Failed to load')}</span>}
          </div>
        ) : (
          <div className="chart-bars">
            {points.map((item, index) => (
              <div key={index} className="bar-container">
                <div
                  className="bar"
                  style={{ height: `${(item.value / maxValue) * 200}px` }}
                >
                  <div className="bar-value">{item.value}%</div>
                </div>
                <div className="bar-label">{item.month}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chart;
