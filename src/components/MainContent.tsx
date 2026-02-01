import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import StatsCards from './StatsCards';
import Chart from './Chart';
import RecentActivity from './RecentActivity';
import FullScreenLoader from './FullScreenLoader';
import { getUser } from '../utils/api';
import './MainContent.css';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const MainContent: React.FC = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <main className="main-content">
      <div className="content-header">
        <h1>{t('pages.dashboard.title')}</h1>
        <div className="content-subtitle">
          {t('pages.dashboard.welcomeBack', { userName: user?.firstName || '' })}
        </div>
      </div>

      <StatsCards />

      <div className="content-grid">
        <div className="chart-section">
          <Chart />
        </div>
        <div className="activity-section">
          <RecentActivity />
        </div>
      </div>
    </main>
  );
};

export default MainContent;
