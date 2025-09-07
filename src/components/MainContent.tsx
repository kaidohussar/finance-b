import React, { useState, useEffect } from 'react';
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
    return <FullScreenLoader message="Loading..." />;
  }

  return (
    <main className="main-content">
      <div className="content-header">
        <h1>Dashboard</h1>
        <div className="content-subtitle">
          Welcome back{user ? `, ${user.firstName}` : ''}! Here's what's happening with your business today.
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
