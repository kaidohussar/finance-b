import React from 'react';
import './Pages.css';

const Billing: React.FC = () => {

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
        <h1>Billing</h1>
        <p className="page-subtitle">Manage your subscription and payment methods</p>
      </div>

      <div className="content-section">
        <h2>Current Plan</h2>
        <div className="plan-card">
          <div className="plan-info">
            <h3>Pro Plan</h3>
            <div className="plan-price">$299<span>/month</span></div>
            <p>Next billing date: March 15, 2024</p>
          </div>
          <button className="btn btn-primary">Upgrade Plan</button>
        </div>
      </div>

      <div className="content-section">
        <h2>Payment Methods</h2>
        <div className="payment-methods">
          {paymentMethods.map((method, index) => (
            <div key={index} className="payment-card">
              <div className="payment-info">
                <span className="payment-type">{method.type}</span>
                <span className="payment-number">•••• {method.last4}</span>
                <span className="payment-expiry">Exp: {method.expiry}</span>
                {method.default && <span className="badge-default">Default</span>}
              </div>
              <button className="btn-link">Edit</button>
            </div>
          ))}
        </div>
        <button className="btn btn-secondary">Add Payment Method</button>
      </div>

      <div className="content-section">
        <h2>Invoice History</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
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
                      {invoice.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-link">Download</button>
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