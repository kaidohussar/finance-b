/**
 * Browser-side mock API.
 *
 * Patches `window.fetch` so every request to `/api/*` is served by the shared
 * handlers instead of hitting the network. This runs in BOTH dev and the
 * deployed static build (Netlify), so there is no real backend required.
 *
 * Artificial latency is added so the UI exercises genuine loading states.
 */
import { handleApiRequest } from './handlers';

const LATENCY_MIN = 400;
const LATENCY_MAX = 900;

const delay = () =>
  new Promise<void>((resolve) =>
    setTimeout(resolve, LATENCY_MIN + Math.random() * (LATENCY_MAX - LATENCY_MIN))
  );

const resolvePathname = (input: RequestInfo | URL): string => {
  const url =
    typeof input === 'string'
      ? input
      : input instanceof URL
        ? input.href
        : input.url;
  try {
    return new URL(url, window.location.origin).pathname;
  } catch {
    return url.split('?')[0];
  }
};

const resolveMethod = (input: RequestInfo | URL, init?: RequestInit): string => {
  if (init?.method) return init.method;
  if (input instanceof Request) return input.method;
  return 'GET';
};

const resolveBody = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<unknown> => {
  let raw: string | undefined;
  if (init?.body != null) {
    raw = typeof init.body === 'string' ? init.body : undefined;
  } else if (input instanceof Request) {
    raw = await input.clone().text();
  }
  if (!raw) return undefined;
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
};

export function installMockApi(): void {
  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const pathname = resolvePathname(input);

    if (!pathname.startsWith('/api/')) {
      return originalFetch(input, init);
    }

    const method = resolveMethod(input, init);
    const body = await resolveBody(input, init);

    await delay();

    const { status, body: payload } = handleApiRequest(method, pathname, body);

    return new Response(JSON.stringify(payload), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  };
}
