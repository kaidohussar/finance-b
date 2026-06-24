/**
 * Central source of truth for all mock domain data.
 *
 * This module contains ONLY plain data + types (no JSX, no React) so it can be
 * imported both by the browser API client (`src/utils/api.ts`) and by the Vite
 * mock server middleware (`src/mocks/server.ts`), which runs in Node.
 *
 * Anything visual (icons, i18n rendering) stays in the components — the server
 * returns string keys (e.g. `iconKey`, `type`, `*Key`) that the client maps.
 */

/* ------------------------------------------------------------------ */
/* Dashboard                                                          */
/* ------------------------------------------------------------------ */

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const user: User = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
};

export interface Report {
  id: string;
  url: string;
}

export type StatIconKey = 'revenue' | 'users' | 'conversion' | 'growth';

export interface Stat {
  titleKey: string;
  value: string;
  change: string;
  changeValue: number;
  trend: 'up' | 'down';
  iconKey: StatIconKey;
  descriptionKey?: string;
}

export const stats: Stat[] = [
  {
    titleKey: 'stats.totalRevenue',
    value: '$45,234',
    change: '+12.5%',
    changeValue: 12.5,
    trend: 'up',
    iconKey: 'revenue',
    descriptionKey: 'stats.revenueDescription',
  },
  {
    titleKey: 'stats.activeUsers',
    value: '2,845',
    change: '+8.2%',
    changeValue: 234,
    trend: 'up',
    iconKey: 'users',
    descriptionKey: 'stats.usersDescription',
  },
  {
    titleKey: 'stats.conversionRate',
    value: '3.24%',
    change: '-2.1%',
    changeValue: 2.1,
    trend: 'down',
    iconKey: 'conversion',
  },
  {
    titleKey: 'stats.monthlyGrowth',
    value: '24.8%',
    change: '+5.7%',
    changeValue: 5.7,
    trend: 'up',
    iconKey: 'growth',
  },
];

export interface ChartPoint {
  month: string;
  value: number;
}

export interface ChartData {
  startDate: string;
  endDate: string;
  points: ChartPoint[];
}

export const chart: ChartData = {
  startDate: 'Jan 2024',
  endDate: 'Jul 2024',
  points: [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 82 },
    { month: 'Apr', value: 75 },
    { month: 'May', value: 88 },
    { month: 'Jun', value: 92 },
    { month: 'Jul', value: 26 },
  ],
};

export interface Activity {
  type: 'user' | 'payment' | 'alert';
  i18nKey: string;
  userName?: string;
  company?: string;
  amount?: string;
  time: string;
  avatar?: string;
  severity?: string;
}

export const activities: Activity[] = [
  {
    type: 'user',
    i18nKey: 'activity.newUser',
    userName: 'Sarah Johnson',
    time: '2 minutes ago',
    avatar: 'SJ',
  },
  {
    type: 'payment',
    i18nKey: 'activity.paymentReceived',
    company: 'Acme Corp',
    amount: '$2,450',
    time: '5 minutes ago',
    avatar: 'AC',
  },
  {
    type: 'alert',
    i18nKey: 'activity.serverAlert',
    time: '12 minutes ago',
    severity: 'warning',
  },
  {
    type: 'user',
    i18nKey: 'activity.userUpgrade',
    userName: 'Mike Chen',
    time: '18 minutes ago',
    avatar: 'MC',
  },
  {
    type: 'payment',
    i18nKey: 'activity.subscriptionRenewed',
    company: 'TechStart Inc',
    amount: '$599',
    time: '1 hour ago',
    avatar: 'TI',
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                           */
/* ------------------------------------------------------------------ */

export interface Project {
  name: string;
  creator: string;
  status: string;
  completed: number;
  total: number;
  collaborators: number;
  deadline: string;
  overdueDays: number;
}

export interface ProjectUpdate {
  projectName: string;
  userName: string;
  status?: string;
  type: 'created' | 'statusUpdate';
}

export interface ProjectsData {
  projects: Project[];
  recentUpdates: ProjectUpdate[];
}

export const projects: Project[] = [
  {
    name: 'Website Redesign',
    creator: 'Sarah Johnson',
    status: 'In Progress',
    completed: 12,
    total: 20,
    collaborators: 5,
    deadline: 'April 15, 2024',
    overdueDays: 0,
  },
  {
    name: 'Mobile App Launch',
    creator: 'Michael Brown',
    status: 'Planning',
    completed: 3,
    total: 15,
    collaborators: 8,
    deadline: 'June 1, 2024',
    overdueDays: 0,
  },
  {
    name: 'API Integration',
    creator: 'David Wilson',
    status: 'Overdue',
    completed: 7,
    total: 10,
    collaborators: 3,
    deadline: 'March 1, 2024',
    overdueDays: 14,
  },
];

export const projectUpdates: ProjectUpdate[] = [
  { projectName: 'Website Redesign', userName: 'Sarah Johnson', type: 'created' },
  {
    projectName: 'API Integration',
    userName: 'David Wilson',
    status: 'On Hold',
    type: 'statusUpdate',
  },
];

/* ------------------------------------------------------------------ */
/* Team                                                               */
/* ------------------------------------------------------------------ */

export interface TeamMember {
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface PendingInvite {
  email: string;
  expired: boolean;
}

export interface TeamActivity {
  type: 'joined' | 'roleChanged' | 'removed' | 'invited';
  userName?: string;
  role?: string;
  adminName?: string;
  email?: string;
}

export interface TeamData {
  members: TeamMember[];
  pendingInvites: PendingInvite[];
  recentActivity: TeamActivity[];
  departments: number;
}

export const teamMembers: TeamMember[] = [
  { name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Admin', status: 'Active' },
  { name: 'Michael Brown', email: 'michael@example.com', role: 'Developer', status: 'Active' },
  { name: 'Emily Davis', email: 'emily@example.com', role: 'Designer', status: 'Active' },
  { name: 'David Wilson', email: 'david@example.com', role: 'Developer', status: 'Active' },
  { name: 'Lisa Anderson', email: 'lisa@example.com', role: 'Marketing', status: 'Active' },
];

export const pendingInvites: PendingInvite[] = [
  { email: 'newdev@example.com', expired: false },
  { email: 'contractor@example.com', expired: true },
];

export const teamActivity: TeamActivity[] = [
  { type: 'joined', userName: 'Lisa Anderson' },
  { type: 'roleChanged', userName: 'Michael Brown', role: 'Lead Developer' },
  { type: 'removed', userName: 'Alex Thompson', adminName: 'Sarah Johnson' },
  { type: 'invited', email: 'newdev@example.com' },
];

/* ------------------------------------------------------------------ */
/* Reports                                                            */
/* ------------------------------------------------------------------ */

export type Period = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface ReportValue {
  value: string;
  lastGenerated: string;
}

export interface ScheduledReport {
  nameKey: string;
  frequencyKey: string;
  nextRun: string;
}

export interface ReportsData {
  periodData: Record<Period, ReportValue[]>;
  scheduledReports: ScheduledReport[];
}

export const reportsPeriodData: Record<Period, ReportValue[]> = {
  daily: [
    { value: '$4,250', lastGenerated: '2026-04-13' },
    { value: '127 new', lastGenerated: '2026-04-13' },
    { value: '48 items low', lastGenerated: '2026-04-13' },
    { value: '$3,890', lastGenerated: '2026-04-13' },
  ],
  weekly: [
    { value: '$28,400', lastGenerated: '2026-04-07' },
    { value: '843 new', lastGenerated: '2026-04-07' },
    { value: '312 items low', lastGenerated: '2026-04-07' },
    { value: '$26,100', lastGenerated: '2026-04-07' },
  ],
  monthly: [
    { value: '$124,500', lastGenerated: '2026-03-31' },
    { value: '3,421 new', lastGenerated: '2026-03-31' },
    { value: '1,240 items low', lastGenerated: '2026-03-31' },
    { value: '$112,800', lastGenerated: '2026-03-31' },
  ],
  yearly: [
    { value: '$1,490,000', lastGenerated: '2025-12-31' },
    { value: '41,052 new', lastGenerated: '2025-12-31' },
    { value: '14,880 items low', lastGenerated: '2025-12-31' },
    { value: '$1,353,600', lastGenerated: '2025-12-31' },
  ],
};

export const scheduledReports: ScheduledReport[] = [
  {
    nameKey: 'pages.reports.scheduled.weeklySales',
    frequencyKey: 'pages.reports.periods.weekly',
    nextRun: '2024-03-15',
  },
  {
    nameKey: 'pages.reports.scheduled.monthlyAnalytics',
    frequencyKey: 'pages.reports.periods.monthly',
    nextRun: '2024-04-01',
  },
  {
    nameKey: 'pages.reports.scheduled.quarterlyPerformance',
    frequencyKey: 'pages.reports.periods.quarterly',
    nextRun: '2024-06-01',
  },
  {
    nameKey: 'pages.reports.scheduled.monthlyStats',
    frequencyKey: 'pages.reports.periods.monthly',
    nextRun: '2026-06-01',
  },
  {
    nameKey: 'pages.reports.scheduled.yearlyStats',
    frequencyKey: 'pages.reports.periods.yearly',
    nextRun: '2026-06-01',
  },
];

/* ------------------------------------------------------------------ */
/* Analytics                                                          */
/* ------------------------------------------------------------------ */

export interface AnalyticsMetric {
  labelKey: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export interface TopPage {
  page: string;
  views: number;
  uniqueVisitors: number;
}

export interface AnalyticsData {
  metrics: AnalyticsMetric[];
  topPages: TopPage[];
}

export const analyticsMetrics: AnalyticsMetric[] = [
  { labelKey: 'analytics.metrics.pageViews', value: '245,678', change: '+12.5%', trend: 'up' },
  { labelKey: 'analytics.metrics.uniqueVisitors', value: '89,432', change: '+8.3%', trend: 'up' },
  { labelKey: 'analytics.metrics.bounceRate', value: '34.2%', change: '-3.1%', trend: 'down' },
  { labelKey: 'analytics.metrics.avgSession', value: '4m 32s', change: '+15.2%', trend: 'up' },
];

export const topPages: TopPage[] = [
  { page: '/home', views: 45678, uniqueVisitors: 23456 },
  { page: '/products', views: 34567, uniqueVisitors: 18901 },
  { page: '/about', views: 23456, uniqueVisitors: 12345 },
  { page: '/contact', views: 12345, uniqueVisitors: 8901 },
  { page: '/blog', views: 9876, uniqueVisitors: 5678 },
];

/* ------------------------------------------------------------------ */
/* Inbox                                                              */
/* ------------------------------------------------------------------ */

export interface Message {
  id: number;
  sender: string;
  subject: string;
  attachments: number;
  replies: number;
  unread: boolean;
}

export interface Mention {
  userName: string;
  channel: string;
}

export interface InboxData {
  messages: Message[];
  mentions: Mention[];
}

export const messages: Message[] = [
  { id: 1, sender: 'Sarah Johnson', subject: 'Q1 Revenue Report', attachments: 3, replies: 5, unread: true },
  { id: 2, sender: 'Michael Brown', subject: 'Sprint Planning Notes', attachments: 1, replies: 12, unread: true },
  { id: 3, sender: 'Emily Davis', subject: 'Design Review Feedback', attachments: 0, replies: 8, unread: false },
];

export const mentions: Mention[] = [
  { userName: 'David Wilson', channel: '#engineering' },
  { userName: 'Lisa Anderson', channel: '#design' },
];

/* ------------------------------------------------------------------ */
/* Files                                                              */
/* ------------------------------------------------------------------ */

export interface RecentFile {
  name: string;
  size: string;
  downloads: number;
  sharedBy: string;
  date: string;
}

export interface SharedFile {
  name: string;
  size: string;
  sharedBy: string;
  date: string;
}

export interface FilesData {
  recentFiles: RecentFile[];
  sharedFiles: SharedFile[];
}

export const recentFiles: RecentFile[] = [
  { name: 'Q1-Report.pdf', size: '2.4 MB', downloads: 12, sharedBy: 'Sarah Johnson', date: 'March 10, 2024' },
  { name: 'Brand-Assets.zip', size: '48 MB', downloads: 5, sharedBy: 'Michael Brown', date: 'March 8, 2024' },
  { name: 'Meeting-Notes.docx', size: '156 KB', downloads: 28, sharedBy: 'Emily Davis', date: 'March 12, 2024' },
];

export const sharedFiles: SharedFile[] = [
  { name: 'Design-Mockups.fig', size: '8.2 MB', sharedBy: 'David Wilson', date: 'March 5, 2024' },
  { name: 'API-Documentation.md', size: '320 KB', sharedBy: 'Lisa Anderson', date: 'March 7, 2024' },
];

/* ------------------------------------------------------------------ */
/* Calendar                                                           */
/* ------------------------------------------------------------------ */

export interface CalendarEvent {
  name: string;
  date: string;
  confirmed: number;
  pending: number;
  frequency: string;
  endDate: string;
}

export const calendarEvents: CalendarEvent[] = [
  { name: 'Team Standup', date: 'March 15, 2024', confirmed: 8, pending: 2, frequency: 'daily', endDate: 'December 31, 2024' },
  { name: 'Sprint Planning', date: 'March 18, 2024', confirmed: 12, pending: 3, frequency: 'bi-weekly', endDate: 'June 30, 2024' },
  { name: 'Product Review', date: 'March 20, 2024', confirmed: 5, pending: 1, frequency: 'weekly', endDate: 'March 20, 2025' },
];

/* ------------------------------------------------------------------ */
/* Tasks                                                              */
/* ------------------------------------------------------------------ */

export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';

export interface InProgressTask {
  id: string;
  name: string;
  assignee: string;
  priority: Priority;
  subtasksCompleted: number;
  subtasksTotal: number;
}

export interface CompletedTask {
  id: string;
  taskName: string;
  userName: string;
}

export interface TasksData {
  inProgress: InProgressTask[];
  completed: CompletedTask[];
  dueToday: number;
  overdue: number;
}

export const tasksInProgress: InProgressTask[] = [
  { id: 't1', name: 'Update dashboard UI', assignee: 'Sarah Johnson', priority: 'High', subtasksCompleted: 3, subtasksTotal: 5 },
  { id: 't2', name: 'Fix payment gateway', assignee: 'Michael Brown', priority: 'Critical', subtasksCompleted: 1, subtasksTotal: 4 },
  { id: 't3', name: 'Write API docs', assignee: 'Emily Davis', priority: 'Medium', subtasksCompleted: 6, subtasksTotal: 8 },
];

export const tasksCompleted: CompletedTask[] = [
  { id: 'c1', taskName: 'Setup CI/CD pipeline', userName: 'David Wilson' },
  { id: 'c2', taskName: 'Database migration', userName: 'Lisa Anderson' },
];

export const tasksDueToday = 4;
export const tasksOverdue = 2;

/* ------------------------------------------------------------------ */
/* Customers                                                          */
/* ------------------------------------------------------------------ */

export interface RecentOrder {
  id: string;
  date: string;
  amount: string;
  status: 'Paid' | 'Pending';
}

export interface Customer {
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

export const customers: Customer[] = [
  {
    id: 1, name: 'John Smith', email: 'john@example.com', status: 'Active', orders: 24, total: '$12,450',
    phone: '+1 (555) 123-4567', company: 'Acme Corp', joinDate: '2024-03-15',
    recentOrders: [
      { id: 'ORD-1001', date: '2026-03-20', amount: '$540', status: 'Paid' },
      { id: 'ORD-1002', date: '2026-03-10', amount: '$320', status: 'Paid' },
      { id: 'ORD-1003', date: '2026-02-28', amount: '$180', status: 'Pending' },
    ],
  },
  {
    id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', status: 'Active', orders: 18, total: '$8,920',
    phone: '+1 (555) 234-5678', company: 'TechStart Inc.', joinDate: '2024-06-22',
    recentOrders: [
      { id: 'ORD-2001', date: '2026-03-18', amount: '$890', status: 'Paid' },
      { id: 'ORD-2002', date: '2026-03-05', amount: '$245', status: 'Paid' },
    ],
  },
  {
    id: 3, name: 'Michael Brown', email: 'michael@example.com', status: 'Active', orders: 32, total: '$18,340',
    phone: '+1 (555) 345-6789', company: 'GrowthCo', joinDate: '2023-11-08',
    recentOrders: [
      { id: 'ORD-3001', date: '2026-03-22', amount: '$1,200', status: 'Pending' },
      { id: 'ORD-3002', date: '2026-03-15', amount: '$670', status: 'Paid' },
      { id: 'ORD-3003', date: '2026-03-01', amount: '$430', status: 'Paid' },
    ],
  },
  {
    id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'Inactive', orders: 5, total: '$2,150',
    phone: '+1 (555) 456-7890', company: 'Davis & Co', joinDate: '2025-01-10',
    recentOrders: [
      { id: 'ORD-4001', date: '2025-09-14', amount: '$320', status: 'Paid' },
      { id: 'ORD-4002', date: '2025-08-20', amount: '$150', status: 'Paid' },
    ],
  },
  {
    id: 5, name: 'David Wilson', email: 'david@example.com', status: 'Active', orders: 41, total: '$25,670',
    phone: '+1 (555) 567-8901', company: 'ScaleUp Ltd.', joinDate: '2023-07-19',
    recentOrders: [
      { id: 'ORD-5001', date: '2026-03-25', amount: '$2,100', status: 'Pending' },
      { id: 'ORD-5002', date: '2026-03-17', amount: '$780', status: 'Paid' },
      { id: 'ORD-5003', date: '2026-03-08', amount: '$560', status: 'Paid' },
    ],
  },
  {
    id: 6, name: 'Lisa Anderson', email: 'lisa@example.com', status: 'Active', orders: 15, total: '$7,890',
    phone: '+1 (555) 678-9012', company: 'Anderson Media', joinDate: '2024-09-03',
    recentOrders: [
      { id: 'ORD-6001', date: '2026-03-19', amount: '$410', status: 'Paid' },
      { id: 'ORD-6002', date: '2026-03-02', amount: '$290', status: 'Paid' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Billing                                                            */
/* ------------------------------------------------------------------ */

export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: string;
}

export interface PaymentMethod {
  type: string;
  last4: string;
  expiry: string;
  default: boolean;
}

export interface BillingPlan {
  name: string;
  price: string;
  nextBilling: string;
}

export interface BillingData {
  plan: BillingPlan;
  invoices: Invoice[];
  paymentMethods: PaymentMethod[];
}

export const billingPlan: BillingPlan = {
  name: 'Pro',
  price: '$299',
  nextBilling: 'March 15, 2024',
};

export const invoices: Invoice[] = [
  { id: 'INV-2024-001', date: '2024-01-15', amount: '$299.00', status: 'Paid' },
  { id: 'INV-2024-002', date: '2024-02-15', amount: '$299.00', status: 'Paid' },
  { id: 'INV-2024-003', date: '2024-03-15', amount: '$299.00', status: 'Pending' },
];

export const paymentMethods: PaymentMethod[] = [
  { type: 'Visa', last4: '4242', expiry: '12/25', default: true },
  { type: 'Mastercard', last4: '8888', expiry: '06/26', default: false },
];

/* ------------------------------------------------------------------ */
/* Integrations                                                       */
/* ------------------------------------------------------------------ */

export type IntegrationIconKey =
  | 'slack'
  | 'googleAnalytics'
  | 'stripe'
  | 'mailchimp'
  | 'zapier'
  | 'github';

export interface Integration {
  key: IntegrationIconKey;
  nameKey: string;
  descriptionKey: string;
  categoryKey: string;
  connected: boolean;
}

export const integrations: Integration[] = [
  {
    key: 'slack',
    nameKey: 'integrations.items.slack.name',
    descriptionKey: 'integrations.items.slack.description',
    categoryKey: 'integrations.categories.communication',
    connected: true,
  },
  {
    key: 'googleAnalytics',
    nameKey: 'integrations.items.googleAnalytics.name',
    descriptionKey: 'integrations.items.googleAnalytics.description',
    categoryKey: 'integrations.categories.analytics',
    connected: true,
  },
  {
    key: 'stripe',
    nameKey: 'integrations.items.stripe.name',
    descriptionKey: 'integrations.items.stripe.description',
    categoryKey: 'integrations.categories.payments',
    connected: false,
  },
  {
    key: 'mailchimp',
    nameKey: 'integrations.items.mailchimp.name',
    descriptionKey: 'integrations.items.mailchimp.description',
    categoryKey: 'integrations.categories.marketing',
    connected: false,
  },
  {
    key: 'zapier',
    nameKey: 'integrations.items.zapier.name',
    descriptionKey: 'integrations.items.zapier.description',
    categoryKey: 'integrations.categories.automation',
    connected: false,
  },
  {
    key: 'github',
    nameKey: 'integrations.items.github.name',
    descriptionKey: 'integrations.items.github.description',
    categoryKey: 'integrations.categories.development',
    connected: true,
  },
];

/* ------------------------------------------------------------------ */
/* Settings                                                           */
/* ------------------------------------------------------------------ */

export interface SettingsProfile {
  fullName: string;
  email: string;
  company: string;
}

export interface SettingsToggles {
  emailNotifications: boolean;
  pushNotifications: boolean;
  darkMode: boolean;
  twoFactor: boolean;
  sessionTimeout: boolean;
  activityLog: boolean;
  autoBackup: boolean;
  highContrast: boolean;
  largeText: boolean;
  reduceMotion: boolean;
}

export interface SettingsData {
  profile: SettingsProfile;
  toggles: SettingsToggles;
}

export const settingsProfile: SettingsProfile = {
  fullName: 'John Doe',
  email: 'john@example.com',
  company: 'Acme Inc.',
};

export const settingsToggles: SettingsToggles = {
  emailNotifications: true,
  pushNotifications: false,
  darkMode: false,
  twoFactor: false,
  sessionTimeout: true,
  activityLog: true,
  autoBackup: true,
  highContrast: false,
  largeText: false,
  reduceMotion: false,
};

/* ------------------------------------------------------------------ */
/* Account                                                            */
/* ------------------------------------------------------------------ */

export interface AccountData {
  email: string;
  twoFactorStatus: string;
  connectedApps: number;
  lastLoginDate: string;
  lastLoginLocation: string;
  passwordChangedDate: string;
  storageUsed: string;
  storageTotal: string;
}

export const account: AccountData = {
  email: 'john@example.com',
  twoFactorStatus: 'enabled',
  connectedApps: 4,
  lastLoginDate: '2024-03-14',
  lastLoginLocation: 'San Francisco, CA',
  passwordChangedDate: '2024-02-28',
  storageUsed: '4.2 GB',
  storageTotal: '10 GB',
};

/* ------------------------------------------------------------------ */
/* Notifications                                                      */
/* ------------------------------------------------------------------ */

export interface NotificationSettings {
  emailEnabled: boolean;
  pushEnabled: boolean;
  digestEnabled: boolean;
}

export interface NotificationsData {
  newNotifications: number;
  mutedUntil: string;
  settings: NotificationSettings;
}

export const notifications: NotificationsData = {
  newNotifications: 5,
  mutedUntil: '5:00 PM',
  settings: {
    emailEnabled: true,
    pushEnabled: true,
    digestEnabled: false,
  },
};
