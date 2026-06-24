/**
 * Typed client for the mock API (served by `src/mocks/server.ts` in dev).
 *
 * Every function performs a real `fetch` against `/api/*`, so all reads and
 * mutations go over the network with genuine loading/error states.
 */
import type {
  AccountData,
  AnalyticsData,
  BillingData,
  Customer,
  FilesData,
  InboxData,
  Integration,
  NotificationSettings,
  NotificationsData,
  Project,
  ProjectsData,
  RecentFile,
  Report,
  ReportsData,
  SettingsData,
  Stat,
  ChartData,
  Activity,
  TasksData,
  TeamData,
  CalendarEvent,
  User,
} from '../mocks/data';

export type {
  AccountData,
  Activity,
  AnalyticsData,
  AnalyticsMetric,
  BillingData,
  BillingPlan,
  CalendarEvent,
  ChartData,
  ChartPoint,
  CompletedTask,
  Customer,
  FilesData,
  InboxData,
  InProgressTask,
  Integration,
  Invoice,
  Mention,
  Message,
  NotificationSettings,
  NotificationsData,
  PaymentMethod,
  PendingInvite,
  Period,
  Priority,
  Project,
  ProjectUpdate,
  ProjectsData,
  RecentFile,
  RecentOrder,
  Report,
  ReportValue,
  ReportsData,
  ScheduledReport,
  SettingsData,
  SettingsProfile,
  SettingsToggles,
  SharedFile,
  Stat,
  StatIconKey,
  TasksData,
  TeamActivity,
  TeamData,
  TeamMember,
  TopPage,
  User,
} from '../mocks/data';

export class ApiError extends Error {
  status: number;
  data: unknown;
  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

async function request<T>(path: string, method: Method = 'GET', body?: unknown): Promise<T> {
  const response = await fetch(path, {
    method,
    headers: body ? { 'Content-Type': 'application/json', Accept: 'application/json' } : { Accept: 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });

  let payload: unknown = null;
  const text = await response.text();
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!response.ok) {
    const message =
      (payload && typeof payload === 'object' && 'error' in payload
        ? String((payload as Record<string, unknown>).error)
        : response.statusText) || 'Request failed';
    throw new ApiError(response.status, message, payload);
  }

  return payload as T;
}

/* Dashboard ------------------------------------------------------- */
export const getUser = () => request<User>('/api/user');
export const getDashboardStats = () => request<Stat[]>('/api/dashboard/stats');
export const getDashboardChart = () => request<ChartData>('/api/dashboard/chart');
export const getDashboardActivity = () => request<Activity[]>('/api/dashboard/activity');
export const generateReport = () => request<Report>('/api/reports/generate', 'POST', {});

/* Projects -------------------------------------------------------- */
export const getProjects = () => request<ProjectsData>('/api/projects');
export const createProject = (input: {
  name: string;
  description: string;
  status: string;
  deadline: string;
  total: number;
  collaborators: number;
}) => request<Project>('/api/projects', 'POST', input);

/* Team ------------------------------------------------------------ */
export const getTeam = () => request<TeamData>('/api/team');

/* Reports --------------------------------------------------------- */
export const getReports = () => request<ReportsData>('/api/reports');

/* Analytics ------------------------------------------------------- */
export const getAnalytics = () => request<AnalyticsData>('/api/analytics');

/* Inbox ----------------------------------------------------------- */
export const getInbox = () => request<InboxData>('/api/inbox');

/* Files ----------------------------------------------------------- */
export const getFiles = () => request<FilesData>('/api/files');
export const uploadFile = (input: { name: string; size: string }) =>
  request<RecentFile>('/api/files/upload', 'POST', input);

/* Calendar -------------------------------------------------------- */
export const getCalendar = () => request<{ events: CalendarEvent[] }>('/api/calendar');

/* Tasks ----------------------------------------------------------- */
export const getTasks = () => request<TasksData>('/api/tasks');
type TaskLists = Pick<TasksData, 'inProgress' | 'completed'>;
export const completeTask = (id: string) => request<TaskLists>('/api/tasks/complete', 'POST', { id });
export const duplicateTask = (id: string) => request<TaskLists>('/api/tasks/duplicate', 'POST', { id });
export const deleteTask = (id: string) => request<TaskLists>('/api/tasks/delete', 'POST', { id });
export const editTask = (id: string) => request<TaskLists>('/api/tasks/edit', 'POST', { id });

/* Customers ------------------------------------------------------- */
export const getCustomers = () => request<{ customers: Customer[] }>('/api/customers');
export const deleteCustomer = (id: number) =>
  request<{ customers: Customer[] }>('/api/customers/delete', 'POST', { id });

/* Billing --------------------------------------------------------- */
export const getBilling = () => request<BillingData>('/api/billing');

/* Integrations ---------------------------------------------------- */
export const getIntegrations = () => request<{ integrations: Integration[] }>('/api/integrations');
export const toggleIntegration = (key: string) =>
  request<Integration>('/api/integrations/toggle', 'POST', { key });

/* Settings -------------------------------------------------------- */
export const getSettings = () => request<SettingsData>('/api/settings');
export const updateSettings = (input: Partial<SettingsData>) =>
  request<SettingsData>('/api/settings', 'PUT', input);

/* Account --------------------------------------------------------- */
export const getAccount = () => request<AccountData>('/api/account');

/* Notifications --------------------------------------------------- */
export const getNotifications = () => request<NotificationsData>('/api/notifications');
export const updateNotificationSettings = (input: Partial<NotificationSettings>) =>
  request<NotificationsData>('/api/notifications/settings', 'PUT', input);

/* Auth ------------------------------------------------------------ */
export const loginRequest = (email: string, password: string) =>
  request<{ user: { email: string } }>('/api/auth/login', 'POST', { email, password });
export const requestPasswordReset = (email: string) =>
  request<{ success: boolean }>('/api/auth/forgot-password', 'POST', { email });
