import React, { useState } from 'react';
import './Pages.css';
import { DollarSign, Users, Package, Wallet } from 'lucide-react';

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const reports = [
    {
      name: 'Sales Report',
      description: 'Comprehensive overview of sales performance',
      icon: <DollarSign size={24} />,
      lastGenerated: '2024-03-10',
      format: 'PDF',
    },
    {
      name: 'Customer Report',
      description: 'Customer demographics and behavior analysis',
      icon: <Users size={24} />,
      lastGenerated: '2024-03-08',
      format: 'Excel',
    },
    {
      name: 'Inventory Report',
      description: 'Stock levels and product performance',
      icon: <Package size={24} />,
      lastGenerated: '2024-03-09',
      format: 'PDF',
    },
    {
      name: 'Financial Report',
      description: 'Revenue, expenses, and profit analysis',
      icon: <Wallet size={24} />,
      lastGenerated: '2024-03-07',
      format: 'Excel',
    },
  ];

  const scheduledReports = [
    { name: 'Weekly Sales Summary', frequency: 'Weekly', nextRun: '2024-03-15' },
    { name: 'Monthly Analytics', frequency: 'Monthly', nextRun: '2024-04-01' },
    { name: 'Quarterly Performance', frequency: 'Quarterly', nextRun: '2024-06-01' },
  ];

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>Reports</h1>
        <p className="page-subtitle">Generate and schedule custom reports</p>
      </div>

      <div className="content-section">
        <div className="section-header">
          <h2>Quick Reports</h2>
          <div className="filter-group">
            <label>Period:</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="filter-select"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        <div className="reports-grid">
          {reports.map((report, index) => (
            <div key={index} className="report-card">
              <div className="report-icon">{report.icon}</div>
              <h3 className="report-name">{report.name}</h3>
              <p className="report-description">{report.description}</p>
              <div className="report-meta">
                <span className="report-format">{report.format}</span>
                <span className="report-date">Last: {report.lastGenerated}</span>
              </div>
              <button className="btn btn-primary">Generate</button>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h2>Scheduled Reports</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Report Name</th>
                <th>Frequency</th>
                <th>Next Run</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {scheduledReports.map((report, index) => (
                <tr key={index}>
                  <td>{report.name}</td>
                  <td>{report.frequency}</td>
                  <td>{report.nextRun}</td>
                  <td>
                    <button className="btn-link">Edit</button>
                    <button className="btn-link text-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn btn-secondary">Schedule New Report</button>
      </div>

      <div className="content-section">
        <div className="info-box">
          <h3>Custom Reports</h3>
          <p>Need a custom report tailored to your specific needs? Our team can help create specialized reports with the exact metrics and insights you need.</p>
          <button className="btn btn-secondary">Request Custom Report</button>
        </div>
      </div>
    </main>
  );
};

export default Reports;
