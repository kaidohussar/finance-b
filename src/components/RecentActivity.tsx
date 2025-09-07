import React from 'react';
import './RecentActivity.css';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      type: 'user',
      message: 'New user registered',
      user: 'Sarah Johnson',
      time: '2 minutes ago',
      avatar: 'SJ'
    },
    {
      type: 'payment',
      message: 'Payment received',
      user: 'Acme Corp',
      amount: '$2,450',
      time: '5 minutes ago',
      avatar: 'AC'
    },
    {
      type: 'alert',
      message: 'Server response time increased',
      time: '12 minutes ago',
      severity: 'warning'
    },
    {
      type: 'user',
      message: 'User upgrade to Pro plan',
      user: 'Mike Chen',
      time: '18 minutes ago',
      avatar: 'MC'
    },
    {
      type: 'payment',
      message: 'Subscription renewed',
      user: 'TechStart Inc',
      amount: '$599',
      time: '1 hour ago',
      avatar: 'TI'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return '👤';
      case 'payment': return '💳';
      case 'alert': return '⚠️';
      default: return '📊';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user': return 'var(--primary-green)';
      case 'payment': return 'var(--secondary-green)';
      case 'alert': return '#F59E0B';
      default: return 'var(--gray-600)';
    }
  };

  return (
    <div className="recent-activity">
      <div className="activity-header">
        <h3>Recent Activity</h3>
        <button className="view-all-btn">View All</button>
      </div>
      
      <div className="activity-list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div 
              className="activity-icon"
              style={{ backgroundColor: getActivityColor(activity.type) }}
            >
              {getActivityIcon(activity.type)}
            </div>
            <div className="activity-content">
              <div className="activity-message">{activity.message}</div>
              {activity.user && (
                <div className="activity-user">
                  <span className="user-avatar">{activity.avatar}</span>
                  <span className="user-name">{activity.user}</span>
                  {activity.amount && (
                    <span className="activity-amount">{activity.amount}</span>
                  )}
                </div>
              )}
              <div className="activity-time">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;