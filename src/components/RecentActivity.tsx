import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { User, CreditCard, AlertTriangle, Activity } from 'lucide-react';
import './RecentActivity.css';

const RecentActivity: React.FC = () => {
  const { t } = useTranslation();

  const activities = [
    {
      type: 'user',
      i18nKey: 'activity.newUser',
      userName: 'Sarah Johnson',
      time: '2 minutes ago',
      avatar: 'SJ'
    },
    {
      type: 'payment',
      i18nKey: 'activity.paymentReceived',
      company: 'Acme Corp',
      amount: '$2,450',
      time: '5 minutes ago',
      avatar: 'AC'
    },
    {
      type: 'alert',
      i18nKey: 'activity.serverAlert',
      time: '12 minutes ago',
      severity: 'warning'
    },
    {
      type: 'user',
      i18nKey: 'activity.userUpgrade',
      userName: 'Mike Chen',
      time: '18 minutes ago',
      avatar: 'MC'
    },
    {
      type: 'payment',
      i18nKey: 'activity.subscriptionRenewed',
      company: 'TechStart Inc',
      amount: '$599',
      time: '1 hour ago',
      avatar: 'TI'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <User size={16} />;
      case 'payment': return <CreditCard size={16} />;
      case 'alert': return <AlertTriangle size={16} />;
      default: return <Activity size={16} />;
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
        <h3>{t('activity.title')}</h3>
        <button className="view-all-btn">{t('activity.viewAll')}</button>
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
              <div className="activity-message">
                <Trans
                  i18nKey={activity.i18nKey}
                  values={{
                    userName: activity.userName,
                    company: activity.company,
                    amount: activity.amount
                  }}
                  components={{
                    strong: <strong />,
                    em: <em />,
                    link: <a href="#details" className="activity-link" />
                  }}
                />
              </div>
              {(activity.userName || activity.company) && (
                <div className="activity-user">
                  <span className="user-avatar">{activity.avatar}</span>
                  <span className="user-name">{activity.userName || activity.company}</span>
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