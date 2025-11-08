import React from 'react';
import './Pages.css';

const Analytics: React.FC = () => {

  const metrics = [
    { label: 'Page Views', value: '245,678', change: '+12.5%', trend: 'up' },
    { label: 'Unique Visitors', value: '89,432', change: '+8.3%', trend: 'up' },
    { label: 'Bounce Rate', value: '34.2%', change: '-3.1%', trend: 'down' },
    { label: 'Avg. Session', value: '4m 32s', change: '+15.2%', trend: 'up' },
  ];

  const topPages = [
    { page: '/home', views: 45678, uniqueVisitors: 23456 },
    { page: '/products', views: 34567, uniqueVisitors: 18901 },
    { page: '/about', views: 23456, uniqueVisitors: 12345 },
    { page: '/contact', views: 12345, uniqueVisitors: 8901 },
    { page: '/blog', views: 9876, uniqueVisitors: 5678 },
  ];

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>Analytics</h1>
        <p className="page-subtitle">Track your website performance and user behavior</p>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value">{metric.value}</div>
            <div className={`metric-change ${metric.trend}`}>
              {metric.trend === 'up' ? '↗' : '↘'} {metric.change}
            </div>
          </div>
        ))}
      </div>

      <div className="content-section">
        <h2>Top Pages</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Page</th>
                <th>Views</th>
                <th>Unique Visitors</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((page, index) => (
                <tr key={index}>
                  <td>{page.page}</td>
                  <td>{page.views.toLocaleString()}</td>
                  <td>{page.uniqueVisitors.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="content-section">
        <h2>Traffic Sources</h2>
        <div className="chart-placeholder">
          <div className="placeholder-content">
            <span className="placeholder-icon">📊</span>
            <p>Traffic sources chart visualization would go here</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Analytics;