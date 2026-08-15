import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import StatsCards from './StatsCards';
import Chart from './Chart';
import RecentActivity from './RecentActivity';
import FullScreenLoader from './FullScreenLoader';
import { generateReport, getUser, type User } from '../utils/api';
import './MainContent.css';

const MainContent: React.FC = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(
    null
  );
  const toastTimerRef = useRef<number | undefined>(undefined);

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 3000);
  };

  const handleGenerateReport = async () => {
    setReportLoading(true);
    try {
      await generateReport();
      showToast(
        t(
          'pages.dashboard.reportEmailed',
          'Report generation started — we’ll email it to you when it’s ready'
        ),
        'success'
      );
    } catch {
      showToast(
        t('pages.dashboard.reportFailed', 'Failed to generate report'),
        'error'
      );
    } finally {
      setReportLoading(false);
    }
  };

  useEffect(() => {
    return () => window.clearTimeout(toastTimerRef.current);
  }, []);

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
        <div className="content-header-text">
          <h1>{t('pages.dashboard.title')}</h1>
          <div className="content-subtitle">
            {t('pages.dashboard.welcomeBack', { userName: user?.firstName || '' })}
          </div>
        </div>
        <button
          className="generate-report-btn"
          onClick={handleGenerateReport}
          disabled={reportLoading}
        >
          {reportLoading ? (
            <Loader2 size={16} className="generate-report-spinner" />
          ) : (
            <FileText size={16} />
          )}
          <span>{reportLoading ? 'Generating…' : 'Generate report'}</span>
        </button>
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

      {toast && (
        <div
          className={`error-toast ${toast.type === 'success' ? 'success-toast' : ''}`}
          role={toast.type === 'success' ? 'status' : 'alert'}
        >
          {toast.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{toast.msg}</span>
        </div>
      )}
    </main>
  );
};

export default MainContent;
