import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Mail, Pencil } from 'lucide-react';
import './Pages.css';

interface RecentOrder {
  id: string;
  date: string;
  amount: string;
  status: 'Paid' | 'Pending';
}

interface Customer {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  orders: number;
  total: string;
  phone: string;
  company: string;
  joinDate: string;
  recentOrders: RecentOrder[];
}

const customers: Customer[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    status: 'Active',
    orders: 24,
    total: '$12,450',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corp',
    joinDate: '2024-03-15',
    recentOrders: [
      { id: 'ORD-1001', date: '2026-03-20', amount: '$540', status: 'Paid' },
      { id: 'ORD-1002', date: '2026-03-10', amount: '$320', status: 'Paid' },
      { id: 'ORD-1003', date: '2026-02-28', amount: '$180', status: 'Pending' },
    ],
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    status: 'Active',
    orders: 18,
    total: '$8,920',
    phone: '+1 (555) 234-5678',
    company: 'TechStart Inc.',
    joinDate: '2024-06-22',
    recentOrders: [
      { id: 'ORD-2001', date: '2026-03-18', amount: '$890', status: 'Paid' },
      { id: 'ORD-2002', date: '2026-03-05', amount: '$245', status: 'Paid' },
    ],
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@example.com',
    status: 'Active',
    orders: 32,
    total: '$18,340',
    phone: '+1 (555) 345-6789',
    company: 'GrowthCo',
    joinDate: '2023-11-08',
    recentOrders: [
      { id: 'ORD-3001', date: '2026-03-22', amount: '$1,200', status: 'Pending' },
      { id: 'ORD-3002', date: '2026-03-15', amount: '$670', status: 'Paid' },
      { id: 'ORD-3003', date: '2026-03-01', amount: '$430', status: 'Paid' },
    ],
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily@example.com',
    status: 'Inactive',
    orders: 5,
    total: '$2,150',
    phone: '+1 (555) 456-7890',
    company: 'Davis & Co',
    joinDate: '2025-01-10',
    recentOrders: [
      { id: 'ORD-4001', date: '2025-09-14', amount: '$320', status: 'Paid' },
      { id: 'ORD-4002', date: '2025-08-20', amount: '$150', status: 'Paid' },
    ],
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'david@example.com',
    status: 'Active',
    orders: 41,
    total: '$25,670',
    phone: '+1 (555) 567-8901',
    company: 'ScaleUp Ltd.',
    joinDate: '2023-07-19',
    recentOrders: [
      { id: 'ORD-5001', date: '2026-03-25', amount: '$2,100', status: 'Pending' },
      { id: 'ORD-5002', date: '2026-03-17', amount: '$780', status: 'Paid' },
      { id: 'ORD-5003', date: '2026-03-08', amount: '$560', status: 'Paid' },
    ],
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    email: 'lisa@example.com',
    status: 'Active',
    orders: 15,
    total: '$7,890',
    phone: '+1 (555) 678-9012',
    company: 'Anderson Media',
    joinDate: '2024-09-03',
    recentOrders: [
      { id: 'ORD-6001', date: '2026-03-19', amount: '$410', status: 'Paid' },
      { id: 'ORD-6002', date: '2026-03-02', amount: '$290', status: 'Paid' },
    ],
  },
];

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

const Customers: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!selectedCustomer) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCustomer(null);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedCustomer]);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openDrawer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setNotes('');
  };

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
                <tr
                  key={customer.id}
                  onClick={() => openDrawer(customer)}
                  style={{ cursor: 'pointer' }}
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
    </main>
  );
};

export default Customers;
