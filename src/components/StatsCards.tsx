import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { DollarSign, Users, BarChart3, TrendingUp } from 'lucide-react';
import { getDashboardStats, type StatIconKey } from '../utils/api';
import { useApi } from '../hooks/useApi';
import LoadingSpinner from './LoadingSpinner';
import './StatsCards.css';

const ICONS: Record<StatIconKey, React.ReactNode> = {
  revenue: <DollarSign size={20} />,
  users: <Users size={20} />,
  conversion: <BarChart3 size={20} />,
  growth: <TrendingUp size={20} />,
};

const StatsCards: React.FC = () => {
  const { t } = useTranslation();
  const { data: stats, loading, error } = useApi(getDashboardStats);

  if (loading || error || !stats) {
    return (
      <div className="stats-cards">
        <div className="stats-cards-state">
          {loading ? <LoadingSpinner /> : <span>{t('common.error', 'Failed to load')}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="stats-cards">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-header">
            <span className="stat-icon">{ICONS[stat.iconKey]}</span>
            <span className={`stat-change ${stat.trend}`}>
              {stat.change}
            </span>
          </div>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-title">{t(stat.titleKey)}</div>
          {stat.descriptionKey && (
            <div className="stat-description">
              <Trans
                i18nKey={stat.descriptionKey}
                values={{
                  percentage: stat.changeValue,
                  count: stat.changeValue
                }}
                components={{
                  strong: <strong />,
                  em: <em />
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
