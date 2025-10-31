import React from 'react';
import { useTranslation } from 'react-i18next';
import './StatsCards.css';

const StatsCards: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    {
      titleKey: 'stats.totalRevenue',
      value: '$45,234',
      change: '+12.5%',
      trend: 'up',
      icon: '💰'
    },
    {
      titleKey: 'stats.activeUsers',
      value: '2,845',
      change: '+8.2%',
      trend: 'up',
      icon: '👥'
    },
    {
      titleKey: 'stats.conversionRate',
      value: '3.24%',
      change: '-2.1%',
      trend: 'down',
      icon: '📊'
    },
    {
      titleKey: 'stats.monthlyGrowth',
      value: '24.8%',
      change: '+5.7%',
      trend: 'up',
      icon: '📈'
    }
  ];

  return (
    <div className="stats-cards">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-header">
            <span className="stat-icon">{stat.icon}</span>
            <span className={`stat-change ${stat.trend}`}>
              {stat.change}
            </span>
          </div>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-title">{t(stat.titleKey)}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;