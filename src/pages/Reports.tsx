import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Pages.css';
import { DollarSign, Users, Package, Wallet } from 'lucide-react';

type Period = 'daily' | 'weekly' | 'monthly' | 'yearly';

const periodData: Record<Period, { value: string; lastGenerated: string }[]> = {
  daily: [
    { value: '$4,250', lastGenerated: '2026-04-13' },
    { value: '127 new', lastGenerated: '2026-04-13' },
    { value: '48 items low', lastGenerated: '2026-04-13' },
    { value: '$3,890', lastGenerated: '2026-04-13' },
  ],
  weekly: [
    { value: '$28,400', lastGenerated: '2026-04-07' },
    { value: '843 new', lastGenerated: '2026-04-07' },
    { value: '312 items low', lastGenerated: '2026-04-07' },
    { value: '$26,100', lastGenerated: '2026-04-07' },
  ],
  monthly: [
    { value: '$124,500', lastGenerated: '2026-03-31' },
    { value: '3,421 new', lastGenerated: '2026-03-31' },
    { value: '1,240 items low', lastGenerated: '2026-03-31' },
    { value: '$112,800', lastGenerated: '2026-03-31' },
  ],
  yearly: [
    { value: '$1,490,000', lastGenerated: '2025-12-31' },
    { value: '41,052 new', lastGenerated: '2025-12-31' },
    { value: '14,880 items low', lastGenerated: '2025-12-31' },
    { value: '$1,353,600', lastGenerated: '2025-12-31' },
  ],
};

const Reports: React.FC = () => {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('monthly');

  const reports = [
    {
      nameKey: 'pages.reports.items.sales.name',
      descriptionKey: 'pages.reports.items.sales.description',
      icon: <DollarSign size={24} />,
      format: 'PDF',
    },
    {
      nameKey: 'pages.reports.items.customer.name',
      descriptionKey: 'pages.reports.items.customer.description',
      icon: <Users size={24} />,
      format: 'Excel',
    },
    {
      nameKey: 'pages.reports.items.inventory.name',
      descriptionKey: 'pages.reports.items.inventory.description',
      icon: <Package size={24} />,
      format: 'PDF',
    },
    {
      nameKey: 'pages.reports.items.financial.name',
      descriptionKey: 'pages.reports.items.financial.description',
      icon: <Wallet size={24} />,
      format: 'Excel',
    },
  ];

  const scheduledReports = [
    {
      nameKey: 'pages.reports.scheduled.weeklySales',
      frequencyKey: 'pages.reports.periods.weekly',
      nextRun: '2024-03-15',
    },
    {
      nameKey: 'pages.reports.scheduled.monthlyAnalytics',
      frequencyKey: 'pages.reports.periods.monthly',
      nextRun: '2024-04-01',
    },
    {
      nameKey: 'pages.reports.scheduled.quarterlyPerformance',
      frequencyKey: 'pages.reports.periods.quarterly',
      nextRun: '2024-06-01',
    },
    {
      nameKey: 'pages.reports.scheduled.monthlyStats',
      frequencyKey: 'pages.reports.periods.monthly',
      nextRun: '2026-06-01',
    },
    {
      nameKey: 'pages.reports.scheduled.yearlyStats',
      frequencyKey: 'pages.reports.periods.yearly',
      nextRun: '2026-06-01',
    },
  ];

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>{t('pages.reports.title')}</h1>
        <p className="page-subtitle">{t('pages.reports.subtitle')}</p>
      </div>

      <div className="content-section">
        <div className="section-header">
          <h2>{t('pages.reports.quickReports')}</h2>
          <div className="filter-group">
            <label>{t('pages.reports.period')}</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as Period)}
              className="filter-select"
            >
              <option value="daily">{t('pages.reports.periods.daily')}</option>
              <option value="weekly">
                {t('pages.reports.periods.weekly')}
              </option>
              <option value="monthly">
                {t('pages.reports.periods.monthly')}
              </option>
              <option value="yearly">
                {t('pages.reports.periods.yearly')}
              </option>
            </select>
          </div>
        </div>

        <div className="reports-grid">
          {reports.map((report, index) => {
            const { value, lastGenerated } = periodData[selectedPeriod][index];
            return (
              <div key={index} className="report-card">
                <div className="report-icon">{report.icon}</div>
                <h3 className="report-name">{t(report.nameKey)}</h3>
                <p className="report-description">{t(report.descriptionKey)}</p>
                <p className="report-value">{value}</p>
                <div className="report-meta">
                  <span className="report-format">{report.format}</span>
                  <span className="report-date">
                    {t('pages.reports.lastGenerated', {
                      date: lastGenerated,
                    })}
                  </span>
                </div>
                <button className="btn btn-primary">
                  {t('pages.reports.generate')}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="content-section">
        <h2>{t('pages.reports.scheduledReports')}</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('pages.reports.table.reportName')}</th>
                <th>{t('pages.reports.table.frequency')}</th>
                <th>{t('pages.reports.table.nextRun')}</th>
                <th>{t('pages.reports.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {scheduledReports.map((report, index) => (
                <tr key={index}>
                  <td>{t(report.nameKey)}</td>
                  <td>{t(report.frequencyKey)}</td>
                  <td>{report.nextRun}</td>
                  <td>
                    <button className="btn-link">
                      {t('pages.reports.actions.edit')}
                    </button>
                    <button className="btn-link text-danger">
                      {t('pages.reports.actions.delete')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn btn-secondary">
          {t('pages.reports.scheduleNew')}
        </button>
      </div>

      <div className="content-section">
        <div className="info-box">
          <h3>{t('pages.reports.customReports.title')}</h3>
          <p>{t('pages.reports.customReports.description')}</p>
          <button className="btn btn-secondary">
            {t('pages.reports.customReports.request')}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Reports;
