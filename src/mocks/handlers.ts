/**
 * Environment-agnostic mock API route handlers.
 *
 * Pure data in / data out — no Node or DOM APIs — so the same handlers run in
 * the browser (via the fetch interceptor in `./browser.ts`). Mutations update
 * an in-memory copy of the data that persists for the lifetime of the page.
 */
import * as data from './data';

export interface MockResponse {
  status: number;
  body: unknown;
}

// Mutable, in-memory copies so mutations persist across requests in a session.
const db = {
  projects: structuredClone(data.projects),
  projectUpdates: structuredClone(data.projectUpdates),
  tasksInProgress: structuredClone(data.tasksInProgress),
  tasksCompleted: structuredClone(data.tasksCompleted),
  customers: structuredClone(data.customers),
  integrations: structuredClone(data.integrations),
  settingsProfile: structuredClone(data.settingsProfile),
  settingsToggles: structuredClone(data.settingsToggles),
  notifications: structuredClone(data.notifications),
  recentFiles: structuredClone(data.recentFiles),
};

type Handler = (body: unknown) => MockResponse;

const ok = (body: unknown): MockResponse => ({ status: 200, body });
const created = (body: unknown): MockResponse => ({ status: 201, body });

// route key = `${METHOD} ${pathname}`
const routes: Record<string, Handler> = {
  /* Dashboard ----------------------------------------------------- */
  'GET /api/user': () => ok(data.user),
  'GET /api/dashboard/stats': () => ok(data.stats),
  'GET /api/dashboard/chart': () => ok(data.chart),
  'GET /api/dashboard/activity': () => ok(data.activities),
  // Intentionally fails, to demonstrate error handling on the dashboard.
  'POST /api/reports/generate': () => ({
    status: 500,
    body: { error: 'Failed to generate report' },
  }),

  /* Projects ------------------------------------------------------ */
  'GET /api/projects': () =>
    ok({ projects: db.projects, recentUpdates: db.projectUpdates }),
  'POST /api/projects': (body) => {
    const input = (body ?? {}) as Partial<data.Project>;
    const project: data.Project = {
      name: input.name ?? 'Untitled project',
      creator: 'You',
      status: input.status ?? 'Planning',
      completed: 0,
      total: input.total ?? 0,
      collaborators: input.collaborators ?? 1,
      deadline: input.deadline ?? '',
      overdueDays: 0,
    };
    db.projects = [project, ...db.projects];
    return created(project);
  },

  /* Team ---------------------------------------------------------- */
  'GET /api/team': () =>
    ok({
      members: data.teamMembers,
      pendingInvites: data.pendingInvites,
      recentActivity: data.teamActivity,
      departments: 4,
    }),

  /* Reports ------------------------------------------------------- */
  'GET /api/reports': () =>
    ok({
      periodData: data.reportsPeriodData,
      scheduledReports: data.scheduledReports,
    }),

  /* Analytics ----------------------------------------------------- */
  'GET /api/analytics': () =>
    ok({ metrics: data.analyticsMetrics, topPages: data.topPages }),

  /* Inbox --------------------------------------------------------- */
  'GET /api/inbox': () => ok({ messages: data.messages, mentions: data.mentions }),

  /* Files --------------------------------------------------------- */
  'GET /api/files': () =>
    ok({ recentFiles: db.recentFiles, sharedFiles: data.sharedFiles }),
  'POST /api/files/upload': (body) => {
    const input = (body ?? {}) as { name?: string; size?: string };
    const file: data.RecentFile = {
      name: input.name ?? 'Untitled',
      size: input.size ?? '0 KB',
      downloads: 0,
      sharedBy: 'You',
      date: 'Just now',
    };
    db.recentFiles = [file, ...db.recentFiles];
    return created(file);
  },

  /* Calendar ------------------------------------------------------ */
  'GET /api/calendar': () => ok({ events: data.calendarEvents }),

  /* Tasks --------------------------------------------------------- */
  'GET /api/tasks': () =>
    ok({
      inProgress: db.tasksInProgress,
      completed: db.tasksCompleted,
      dueToday: data.tasksDueToday,
      overdue: data.tasksOverdue,
    }),
  'POST /api/tasks/complete': (body) => {
    const { id } = (body ?? {}) as { id?: string };
    const task = db.tasksInProgress.find((t) => t.id === id);
    if (task) {
      db.tasksInProgress = db.tasksInProgress.filter((t) => t.id !== id);
      db.tasksCompleted = [
        { id: `c-${task.id}`, taskName: task.name, userName: task.assignee },
        ...db.tasksCompleted,
      ];
    }
    return ok({ inProgress: db.tasksInProgress, completed: db.tasksCompleted });
  },
  'POST /api/tasks/duplicate': (body) => {
    const { id } = (body ?? {}) as { id?: string };
    const task = db.tasksInProgress.find((t) => t.id === id);
    if (task) {
      db.tasksInProgress = [
        ...db.tasksInProgress,
        {
          ...task,
          id: `${task.id}-copy-${db.tasksInProgress.length + 1}`,
          name: `${task.name} (copy)`,
          subtasksCompleted: 0,
        },
      ];
    }
    return ok({ inProgress: db.tasksInProgress, completed: db.tasksCompleted });
  },
  'POST /api/tasks/delete': (body) => {
    const { id } = (body ?? {}) as { id?: string };
    db.tasksInProgress = db.tasksInProgress.filter((t) => t.id !== id);
    return ok({ inProgress: db.tasksInProgress, completed: db.tasksCompleted });
  },
  'POST /api/tasks/edit': () =>
    ok({ inProgress: db.tasksInProgress, completed: db.tasksCompleted }),

  /* Customers ----------------------------------------------------- */
  'GET /api/customers': () => ok({ customers: db.customers }),
  'POST /api/customers/delete': (body) => {
    const { id } = (body ?? {}) as { id?: number };
    db.customers = db.customers.filter((c) => c.id !== id);
    return ok({ customers: db.customers });
  },

  /* Billing ------------------------------------------------------- */
  'GET /api/billing': () =>
    ok({
      plan: data.billingPlan,
      invoices: data.invoices,
      paymentMethods: data.paymentMethods,
    }),

  /* Integrations -------------------------------------------------- */
  'GET /api/integrations': () => ok({ integrations: db.integrations }),
  'POST /api/integrations/toggle': (body) => {
    const { key } = (body ?? {}) as { key?: string };
    const integration = db.integrations.find((i) => i.key === key);
    if (integration) integration.connected = !integration.connected;
    return ok(integration ?? null);
  },

  /* Settings ------------------------------------------------------ */
  'GET /api/settings': () =>
    ok({ profile: db.settingsProfile, toggles: db.settingsToggles }),
  'PUT /api/settings': (body) => {
    const input = (body ?? {}) as Partial<data.SettingsData>;
    if (input.profile) db.settingsProfile = { ...db.settingsProfile, ...input.profile };
    if (input.toggles) db.settingsToggles = { ...db.settingsToggles, ...input.toggles };
    return ok({ profile: db.settingsProfile, toggles: db.settingsToggles });
  },

  /* Account ------------------------------------------------------- */
  'GET /api/account': () => ok(data.account),

  /* Notifications ------------------------------------------------- */
  'GET /api/notifications': () => ok(db.notifications),
  'PUT /api/notifications/settings': (body) => {
    const input = (body ?? {}) as Partial<data.NotificationSettings>;
    db.notifications.settings = { ...db.notifications.settings, ...input };
    return ok(db.notifications);
  },

  /* Auth ---------------------------------------------------------- */
  'POST /api/auth/login': (body) => {
    const { email, password } = (body ?? {}) as {
      email?: string;
      password?: string;
    };
    if (!email || email.toLowerCase() !== 'test@example.com') {
      return { status: 401, body: { error: 'login.errorInvalidEmail' } };
    }
    if (!password) {
      return { status: 401, body: { error: 'login.errorPasswordRequired' } };
    }
    return ok({ user: { email: email.toLowerCase() } });
  },
  'POST /api/auth/forgot-password': () => ok({ success: true }),
};

/** Dispatch a request to the matching handler. */
export function handleApiRequest(
  method: string,
  pathname: string,
  body: unknown
): MockResponse {
  const handler = routes[`${method.toUpperCase()} ${pathname}`];
  if (!handler) {
    return { status: 404, body: { error: 'Not found', path: pathname } };
  }
  try {
    return handler(body);
  } catch (err) {
    return {
      status: 500,
      body: { error: 'Internal mock error', message: (err as Error).message },
    };
  }
}
