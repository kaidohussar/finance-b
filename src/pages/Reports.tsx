import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Pages.css';
import { DollarSign, Users, Package, Wallet } from 'lucide-react';

const Reports: React.FC = () => {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const reports = [
    {
      nameKey: 'pages.reports.items.sales.name',
      descriptionKey: 'pages.reports.items.sales.description',
      icon: <DollarSign size={24} />,
      lastGenerated: '2024-03-10',
      format: 'PDF',
    },
    {
      nameKey: 'pages.reports.items.customer.name',
      descriptionKey: 'pages.reports.items.customer.description',
      icon: <Users size={24} />,
      lastGenerated: '2024-03-08',
      format: 'Excel',
    },
    {
      nameKey: 'pages.reports.items.inventory.name',
      descriptionKey: 'pages.reports.items.inventory.description',
      icon: <Package size={24} />,
      lastGenerated: '2024-03-09',
      format: 'PDF',
    },
    {
      nameKey: 'pages.reports.items.financial.name',
      descriptionKey: 'pages.reports.items.financial.description',
      icon: <Wallet size={24} />,
      lastGenerated: '2024-03-07',
      format: 'Excel',
    },
  ];

  const scheduledReports = [
    { nameKey: 'pages.reports.scheduled.weeklySales', frequencyKey: 'pages.reports.periods.weekly', nextRun: '2024-03-15' },
    { nameKey: 'pages.reports.scheduled.monthlyAnalytics', frequencyKey: 'pages.reports.periods.monthly', nextRun: '2024-04-01' },
    { nameKey: 'pages.reports.scheduled.quarterlyPerformance', frequencyKey: 'pages.reports.periods.quarterly', nextRun: '2024-06-01' },
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
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="filter-select"
            >
              <option value="daily">{t('pages.reports.periods.daily')}</option>
              <option value="weekly">{t('pages.reports.periods.weekly')}</option>
              <option value="monthly">{t('pages.reports.periods.monthly')}</option>
              <option value="yearly">{t('pages.reports.periods.yearly')}</option>
            </select>
          </div>
        </div>

        <div className="reports-grid">
          {reports.map((report, index) => (
            <div key={index} className="report-card">
              <div className="report-icon">{report.icon}</div>
              <h3 className="report-name">{t(report.nameKey)}</h3>
              <p className="report-description">{t(report.descriptionKey)}</p>
              <div className="report-meta">
                <span className="report-format">{report.format}</span>
                <span className="report-date">{t('pages.reports.lastGenerated', { date: report.lastGenerated })}</span>
              </div>
              <button className="btn btn-primary">{t('pages.reports.generate')}</button>
            </div>
          ))}
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
                    <button className="btn-link">{t('pages.reports.actions.edit')}</button>
                    <button className="btn-link text-danger">{t('pages.reports.actions.delete')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn btn-secondary">{t('pages.reports.scheduleNew')}</button>
      </div>

      <div className="content-section">
        <div className="info-box">
          <h3>{t('pages.reports.customReports.title')}</h3>
          <p>{t('pages.reports.customReports.description')}</p>
          <button className="btn btn-secondary">{t('pages.reports.customReports.request')}</button>
        </div>
      </div>
    </main>
  );
};

export default Reports;
