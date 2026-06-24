import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Mail, Pencil, Trash2 } from 'lucide-react';
import { getCustomers, deleteCustomer } from '../utils/api';
import type { Customer } from '../utils/api';
import { useApi } from '../hooks/useApi';
import LoadingSpinner from '../components/LoadingSpinner';
import './Pages.css';

interface ContextMenuState {
  x: number;
  y: number;
  customer: Customer;
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

const Customers: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading, error, setData } = useApi(getCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [notes, setNotes] = useState('');
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  useEffect(() => {
    if (!selectedCustomer) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCustomer(null);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedCustomer]);

  // Dismiss the context menu on any outside click, scroll, or Escape.
  useEffect(() => {
    if (!contextMenu) return;

    const close = () => setContextMenu(null);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setContextMenu(null);
    };

    document.addEventListener('click', close);
    document.addEventListener('scroll', close, true);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', close);
      document.removeEventListener('scroll', close, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [contextMenu]);

  const handleRowContextMenu = (e: React.MouseEvent, customer: Customer) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, customer });
  };

  const handleDeleteRow = async (customer: Customer) => {
    try {
      const res = await deleteCustomer(customer.id);
      setData((prev) => ({ ...prev!, customers: res.customers }));
      if (selectedCustomer?.id === customer.id) setSelectedCustomer(null);
      setContextMenu(null);
    } catch {
      setContextMenu(null);
    }
  };

  const openDrawer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setNotes('');
  };

  if (loading || error || !data) {
    return (
      <main className="page-content">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          {loading ? <LoadingSpinner /> : <span>{t('common.error', 'Failed to load')}</span>}
        </div>
      </main>
    );
  }

  const customers = data.customers;

  const filteredCustomers = customers.filter(
    (customer) =>
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
          <table className="data-table" data-testid="customers-table">
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
                <tr
                  key={customer.id}
                  onClick={() => openDrawer(customer)}
                  onContextMenu={(e) => handleRowContextMenu(e, customer)}
                  style={{ cursor: 'pointer' }}
                  data-testid="customer-row"
                  data-customer-id={customer.id}
                  data-customer-name={customer.name}
                >
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
          <div className="stat-value">
            {customers.filter((c) => c.status === 'Active').length}
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-label">{t('pages.customers.stats.avgOrders')}</div>
          <div className="stat-value">
            {Math.round(customers.reduce((acc, c) => acc + c.orders, 0) / customers.length)}
          </div>
        </div>
      </div>

      {selectedCustomer && (
        <div className="drawer-overlay" onClick={() => setSelectedCustomer(null)}>
          <div
            className="drawer-panel"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-header">
              <h2>{selectedCustomer.name}</h2>
              <button
                className="drawer-close"
                onClick={() => setSelectedCustomer(null)}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="drawer-body">
              <div className="drawer-profile">
                <div className="drawer-avatar">{getInitials(selectedCustomer.name)}</div>
                <div className="drawer-profile-info">
                  <h3>{selectedCustomer.name}</h3>
                  <p>{selectedCustomer.email}</p>
                  <span
                    className={`status-badge ${selectedCustomer.status.toLowerCase()}`}
                  >
                    {t(
                      `pages.customers.status.${selectedCustomer.status.toLowerCase()}`
                    )}
                  </span>
                </div>
              </div>

              <div className="drawer-details">
                <div className="drawer-detail-row">
                  <span className="drawer-detail-label">
                    {t('pages.customers.drawer.phone')}
                  </span>
                  <span>{selectedCustomer.phone}</span>
                </div>
                <div className="drawer-detail-row">
                  <span className="drawer-detail-label">
                    {t('pages.customers.drawer.company')}
                  </span>
                  <span>{selectedCustomer.company}</span>
                </div>
                <div className="drawer-detail-row">
                  <span className="drawer-detail-label">
                    {t('pages.customers.drawer.joinDate')}
                  </span>
                  <span>{selectedCustomer.joinDate}</span>
                </div>
              </div>

              <div className="drawer-section">
                <h4>{t('pages.customers.drawer.recentOrders')}</h4>
                <table className="drawer-table">
                  <thead>
                    <tr>
                      <th>{t('pages.customers.drawer.orderId')}</th>
                      <th>{t('pages.customers.drawer.date')}</th>
                      <th>{t('pages.customers.drawer.amount')}</th>
                      <th>{t('pages.customers.drawer.orderStatus')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCustomer.recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.date}</td>
                        <td>{order.amount}</td>
                        <td>
                          <span
                            className={`status-badge ${order.status.toLowerCase()}`}
                          >
                            {t(
                              `pages.billing.status.${order.status.toLowerCase()}`
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="drawer-section">
                <h4>{t('pages.customers.drawer.notes')}</h4>
                <textarea
                  className="drawer-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t('pages.customers.drawer.notesPlaceholder')}
                />
              </div>
            </div>

            <div className="drawer-footer">
              <button className="btn btn-primary">
                <Mail size={16} />
                {t('pages.customers.drawer.sendEmail')}
              </button>
              <button className="btn btn-secondary">
                <Pencil size={16} />
                {t('pages.customers.drawer.editCustomer')}
              </button>
            </div>
          </div>
        </div>
      )}

      {contextMenu && (
        <ul
          className="context-menu"
          role="menu"
          data-testid="row-context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
          onContextMenu={(e) => e.preventDefault()}
        >
          <li role="presentation">
            <button
              type="button"
              role="menuitem"
              className="context-menu-item danger"
              data-testid="context-menu-delete"
              onClick={() => handleDeleteRow(contextMenu.customer)}
            >
              <Trash2 size={16} />
              {t('pages.customers.contextMenu.deleteRow')}
            </button>
          </li>
        </ul>
      )}
    </main>
  );
};

export default Customers;
