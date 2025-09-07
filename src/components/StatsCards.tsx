import React from 'react';
import './StatsCards.css';

const StatsCards: React.FC = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,234',
      change: '+12.5%',
      trend: 'up',
      icon: '💰'
    },
    {
      title: 'Active Users',
      value: '2,845',
      change: '+8.2%',
      trend: 'up',
      icon: '👥'
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-2.1%',
      trend: 'down',
      icon: '📊'
    },
    {
      title: 'Monthly Growth',
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
          <div className="stat-title">{stat.title}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;