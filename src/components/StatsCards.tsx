import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { DollarSign, Users, BarChart3, TrendingUp } from 'lucide-react';
import './StatsCards.css';

const StatsCards: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    {
      titleKey: 'stats.totalRevenue',
      value: '$45,234',
      change: '+12.5%',
      changeValue: 12.5,
      trend: 'up',
      icon: <DollarSign size={20} />,
      descriptionKey: 'stats.revenueDescription'
    },
    {
      titleKey: 'stats.activeUsers',
      value: '2,845',
      change: '+8.2%',
      changeValue: 234,
      trend: 'up',
      icon: <Users size={20} />,
      descriptionKey: 'stats.usersDescription'
    },
    {
      titleKey: 'stats.conversionRate',
      value: '3.24%',
      change: '-2.1%',
      changeValue: 2.1,
      trend: 'down',
      icon: <BarChart3 size={20} />
    },
    {
      titleKey: 'stats.monthlyGrowth',
      value: '24.8%',
      change: '+5.7%',
      changeValue: 5.7,
      trend: 'up',
      icon: <TrendingUp size={20} />
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