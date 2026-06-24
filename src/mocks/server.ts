/**
 * Vite dev-server mock API.
 *
 * Registers a `/api/*` middleware that serves all of the app's mock data over
 * real HTTP, with artificial latency so the UI exercises genuine loading
 * states. GET endpoints return data from `src/mocks/data.ts`; mutation
 * endpoints update an in-memory copy of that data (persisted for the lifetime
 * of the dev server) and return the updated resource.
 */
import type { Plugin } from 'vite';
import type { Connect } from 'vite';
import type { ServerResponse } from 'node:http';
import * as data from './data';

const LATENCY_MIN = 400;
const LATENCY_MAX = 900;

const delay = () =>
  new Promise<void>((resolve) =>
    setTimeout(resolve, LATENCY_MIN + Math.random() * (LATENCY_MAX - LATENCY_MIN))
  );

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

interface Ctx {
  body: unknown;
}

type Handler = (ctx: Ctx) => unknown;

// route key = `${METHOD} ${pathname}`
const routes: Record<string, Handler> = {
  /* Dashboard ----------------------------------------------------- */
  'GET /api/user': () => data.user,
  'GET /api/dashboard/stats': () => data.stats,
  'GET /api/dashboard/chart': () => data.chart,
  'GET /api/dashboard/activity': () => data.activities,
  'POST /api/reports/generate': () => ({
    id: `RPT-${1000 + Math.floor(Math.random() * 9000)}`,
    url: '/reports/latest.pdf',
  }),

  /* Projects ------------------------------------------------------ */
  'GET /api/projects': () => ({
    projects: db.projects,
    recentUpdates: db.projectUpdates,
  }),
  'POST /api/projects': (ctx) => {
    const input = (ctx.body ?? {}) as Partial<data.Project>;
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
    return project;
  },

  /* Team ---------------------------------------------------------- */
  'GET /api/team': () => ({
    members: data.teamMembers,
    pendingInvites: data.pendingInvites,
    recentActivity: data.teamActivity,
    departments: 4,
  }),

  /* Reports ------------------------------------------------------- */
  'GET /api/reports': () => ({
    periodData: data.reportsPeriodData,
    scheduledReports: data.scheduledReports,
  }),

  /* Analytics ----------------------------------------------------- */
  'GET /api/analytics': () => ({
    metrics: data.analyticsMetrics,
    topPages: data.topPages,
  }),

  /* Inbox --------------------------------------------------------- */
  'GET /api/inbox': () => ({
    messages: data.messages,
    mentions: data.mentions,
  }),

  /* Files --------------------------------------------------------- */
  'GET /api/files': () => ({
    recentFiles: db.recentFiles,
    sharedFiles: data.sharedFiles,
  }),
  'POST /api/files/upload': (ctx) => {
    const input = (ctx.body ?? {}) as { name?: string; size?: string };
    const file: data.RecentFile = {
      name: input.name ?? 'Untitled',
      size: input.size ?? '0 KB',
      downloads: 0,
      sharedBy: 'You',
      date: 'Just now',
    };
    db.recentFiles = [file, ...db.recentFiles];
    return file;
  },

  /* Calendar ------------------------------------------------------ */
  'GET /api/calendar': () => ({ events: data.calendarEvents }),

  /* Tasks --------------------------------------------------------- */
  'GET /api/tasks': () => ({
    inProgress: db.tasksInProgress,
    completed: db.tasksCompleted,
    dueToday: data.tasksDueToday,
    overdue: data.tasksOverdue,
  }),
  'POST /api/tasks/complete': (ctx) => {
    const { id } = (ctx.body ?? {}) as { id?: string };
    const task = db.tasksInProgress.find((t) => t.id === id);
    if (task) {
      db.tasksInProgress = db.tasksInProgress.filter((t) => t.id !== id);
      db.tasksCompleted = [
        { id: `c-${task.id}`, taskName: task.name, userName: task.assignee },
        ...db.tasksCompleted,
      ];
    }
    return { inProgress: db.tasksInProgress, completed: db.tasksCompleted };
  },
  'POST /api/tasks/duplicate': (ctx) => {
    const { id } = (ctx.body ?? {}) as { id?: string };
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
    return { inProgress: db.tasksInProgress, completed: db.tasksCompleted };
  },
  'POST /api/tasks/delete': (ctx) => {
    const { id } = (ctx.body ?? {}) as { id?: string };
    db.tasksInProgress = db.tasksInProgress.filter((t) => t.id !== id);
    return { inProgress: db.tasksInProgress, completed: db.tasksCompleted };
  },
  'POST /api/tasks/edit': () => ({
    inProgress: db.tasksInProgress,
    completed: db.tasksCompleted,
  }),

  /* Customers ----------------------------------------------------- */
  'GET /api/customers': () => ({ customers: db.customers }),
  'POST /api/customers/delete': (ctx) => {
    const { id } = (ctx.body ?? {}) as { id?: number };
    db.customers = db.customers.filter((c) => c.id !== id);
    return { customers: db.customers };
  },

  /* Billing ------------------------------------------------------- */
  'GET /api/billing': () => ({
    plan: data.billingPlan,
    invoices: data.invoices,
    paymentMethods: data.paymentMethods,
  }),

  /* Integrations -------------------------------------------------- */
  'GET /api/integrations': () => ({ integrations: db.integrations }),
  'POST /api/integrations/toggle': (ctx) => {
    const { key } = (ctx.body ?? {}) as { key?: string };
    const integration = db.integrations.find((i) => i.key === key);
    if (integration) integration.connected = !integration.connected;
    return integration ?? null;
  },

  /* Settings ------------------------------------------------------ */
  'GET /api/settings': () => ({
    profile: db.settingsProfile,
    toggles: db.settingsToggles,
  }),
  'PUT /api/settings': (ctx) => {
    const input = (ctx.body ?? {}) as Partial<data.SettingsData>;
    if (input.profile) db.settingsProfile = { ...db.settingsProfile, ...input.profile };
    if (input.toggles) db.settingsToggles = { ...db.settingsToggles, ...input.toggles };
    return { profile: db.settingsProfile, toggles: db.settingsToggles };
  },

  /* Account ------------------------------------------------------- */
  'GET /api/account': () => data.account,

  /* Notifications ------------------------------------------------- */
  'GET /api/notifications': () => db.notifications,
  'PUT /api/notifications/settings': (ctx) => {
    const input = (ctx.body ?? {}) as Partial<data.NotificationSettings>;
    db.notifications.settings = { ...db.notifications.settings, ...input };
    return db.notifications;
  },

  /* Auth ---------------------------------------------------------- */
  'POST /api/auth/login': (ctx) => {
    const { email, password } = (ctx.body ?? {}) as {
      email?: string;
      password?: string;
    };
    if (!email || email.toLowerCase() !== 'test@example.com') {
      return { __status: 401, error: 'login.errorInvalidEmail' };
    }
    if (!password) {
      return { __status: 401, error: 'login.errorPasswordRequired' };
    }
    return { user: { email: email.toLowerCase() } };
  },
  'POST /api/auth/forgot-password': () => ({ success: true }),
};

const readBody = (req: Connect.IncomingMessage): Promise<unknown> =>
  new Promise((resolve) => {
    const chunks: Buffer[] = [];
    req.on('data', (c: Buffer) => chunks.push(c));
    req.on('end', () => {
      if (chunks.length === 0) return resolve(undefined);
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf-8')));
      } catch {
        resolve(undefined);
      }
    });
    req.on('error', () => resolve(undefined));
  });

const sendJson = (res: ServerResponse, status: number, payload: unknown) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
};

export const mockApiPlugin = (): Plugin => ({
  name: 'mock-api',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const url = req.url ?? '';
      if (!url.startsWith('/api/')) return next();

      const pathname = url.split('?')[0];
      const method = (req.method ?? 'GET').toUpperCase();
      const handler = routes[`${method} ${pathname}`];

      if (!handler) {
        return sendJson(res, 404, { error: 'Not found', path: pathname });
      }

      const body = method === 'GET' ? undefined : await readBody(req);
      await delay();

      try {
        const result = handler({ body });
        // Handlers may signal an error status via a `__status` field.
        if (result && typeof result === 'object' && '__status' in result) {
          const { __status, ...rest } = result as Record<string, unknown>;
          return sendJson(res, __status as number, rest);
        }
        return sendJson(res, method === 'POST' ? 201 : 200, result);
      } catch (err) {
        return sendJson(res, 500, {
          error: 'Internal mock server error',
          message: (err as Error).message,
        });
      }
    });
  },
});

export default mockApiPlugin;
