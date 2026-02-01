import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Pages.css';

const Customers: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    { id: 1, name: 'John Smith', email: 'john@example.com', status: 'Active', orders: 24, total: '$12,450' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', status: 'Active', orders: 18, total: '$8,920' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', status: 'Active', orders: 32, total: '$18,340' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'Inactive', orders: 5, total: '$2,150' },
    { id: 5, name: 'David Wilson', email: 'david@example.com', status: 'Active', orders: 41, total: '$25,670' },
    { id: 6, name: 'Lisa Anderson', email: 'lisa@example.com', status: 'Active', orders: 15, total: '$7,890' },
  ];

  const filteredCustomers = customers.filter(
    customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>{t('pages.customers.title')}</h1>
        <p className="page-subtitle">{t('pages.customers.subtitle')}</p>
      </div>

      <div className="content-section">
        <div className="section-header">
          <h2>{t('pages.customers.customerList')}</h2>
          <div className="search-box">
            <input
              type="text"
              placeholder={t('pages.customers.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('pages.customers.table.name')}</th>
                <th>{t('pages.customers.table.email')}</th>
                <th>{t('pages.customers.table.status')}</th>
                <th>{t('pages.customers.table.orders')}</th>
                <th>{t('pages.customers.table.totalSpent')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>
                    <span className={`status-badge ${customer.status.toLowerCase()}`}>
                      {t(`pages.customers.status.${customer.status.toLowerCase()}`)}
                    </span>
                  </td>
                  <td>{customer.orders}</td>
                  <td>{customer.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-box">
          <div className="stat-label">{t('pages.customers.stats.totalCustomers')}</div>
          <div className="stat-value">{customers.length}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">{t('pages.customers.stats.active')}</div>
          <div className="stat-value">{customers.filter(c => c.status === 'Active').length}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">{t('pages.customers.stats.avgOrders')}</div>
          <div className="stat-value">
            {Math.round(customers.reduce((acc, c) => acc + c.orders, 0) / customers.length)}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Customers;