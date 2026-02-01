import React from 'react';
import { useTranslation } from 'react-i18next';
import './Pages.css';

const Billing: React.FC = () => {
  const { t } = useTranslation();

  const invoices = [
    { id: 'INV-2024-001', date: '2024-01-15', amount: '$299.00', status: 'Paid' },
    { id: 'INV-2024-002', date: '2024-02-15', amount: '$299.00', status: 'Paid' },
    { id: 'INV-2024-003', date: '2024-03-15', amount: '$299.00', status: 'Pending' },
  ];

  const paymentMethods = [
    { type: 'Visa', last4: '4242', expiry: '12/25', default: true },
    { type: 'Mastercard', last4: '8888', expiry: '06/26', default: false },
  ];

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>{t('pages.billing.title')}</h1>
        <p className="page-subtitle">{t('pages.billing.subtitle')}</p>
      </div>

      <div className="content-section">
        <h2>{t('pages.billing.currentPlan')}</h2>
        <div className="plan-card">
          <div className="plan-info">
            <h3>{t('pages.billing.proPlan')}</h3>
            <div className="plan-price">$299<span>{t('pages.billing.perMonth')}</span></div>
            <p>{t('pages.billing.nextBillingDate', { date: 'March 15, 2024' })}</p>
          </div>
          <button className="btn btn-primary">{t('pages.billing.upgradePlan')}</button>
        </div>
      </div>

      <div className="content-section">
        <h2>{t('pages.billing.paymentMethods')}</h2>
        <div className="payment-methods">
          {paymentMethods.map((method, index) => (
            <div key={index} className="payment-card">
              <div className="payment-info">
                <span className="payment-type">{method.type}</span>
                <span className="payment-number">•••• {method.last4}</span>
                <span className="payment-expiry">{t('pages.billing.expires', { date: method.expiry })}</span>
                {method.default && <span className="badge-default">{t('pages.billing.default')}</span>}
              </div>
              <button className="btn-link">{t('pages.billing.edit')}</button>
            </div>
          ))}
        </div>
        <button className="btn btn-secondary">{t('pages.billing.addPaymentMethod')}</button>
      </div>

      <div className="content-section">
        <h2>{t('pages.billing.invoiceHistory')}</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('pages.billing.table.invoiceId')}</th>
                <th>{t('pages.billing.table.date')}</th>
                <th>{t('pages.billing.table.amount')}</th>
                <th>{t('pages.billing.table.status')}</th>
                <th>{t('pages.billing.table.action')}</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.id}</td>
                  <td>{invoice.date}</td>
                  <td>{invoice.amount}</td>
                  <td>
                    <span className={`status-badge ${invoice.status.toLowerCase()}`}>
                      {t(`pages.billing.status.${invoice.status.toLowerCase()}`)}
                    </span>
                  </td>
                  <td>
                    <button className="btn-link">{t('pages.billing.download')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Billing;