import React from 'react';
import './Chart.css';

const Chart: React.FC = () => {
  const data = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 82 },
    { month: 'Apr', value: 75 },
    { month: 'May', value: 88 },
    { month: 'Jun', value: 92 },
    { month: 'Jul', value: 96 },
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Revenue Trend</h3>
        <div className="chart-period">
          <span className="period-label">Last 7 months</span>
        </div>
      </div>
      
      <div className="chart">
        <div className="chart-bars">
          {data.map((item, index) => (
            <div key={index} className="bar-container">
              <div 
                className="bar" 
                style={{ height: `${(item.value / maxValue) * 200}px` }}
              >
                <div className="bar-value">{item.value}%</div>
              </div>
              <div className="bar-label">{item.month}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chart;