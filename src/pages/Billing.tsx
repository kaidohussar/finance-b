import React from 'react';
import { useTranslation } from 'react-i18next';
import './Pages.css';
import { useApi } from '../hooks/useApi';
import { getBilling } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Billing: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useApi(getBilling);

  if (loading || error || !data) {
    return (
      <main className="page-content">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          {loading ? <LoadingSpinner /> : <span>{t('common.error', 'Failed to load')}</span>}
        </div>
      </main>
    );
  }

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
            <h3>{data.plan.name}</h3>
            <div className="plan-price">{data.plan.price}<span>{t('pages.billing.perMonth')}</span></div>
            <p>{t('pages.billing.nextBillingDate', { date: data.plan.nextBilling })}</p>
          </div>
          <button className="btn btn-primary">{t('pages.billing.upgradePlan')}</button>
        </div>
      </div>

      <div className="content-section">
        <h2>{t('pages.billing.paymentMethods')}</h2>
        <div className="payment-methods">
          {data.paymentMethods.map((method, index) => (
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
              {data.invoices.map((invoice) => (
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