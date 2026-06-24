/**
 * Browser-side mock API powered by Mock Service Worker (MSW).
 *
 * MSW registers a real Service Worker that intercepts network requests, so
 * every `/api/*` call shows up in the browser's Network tab (served from
 * ServiceWorker) while still being answered from the in-memory mock. This works
 * in both local dev and the deployed static build — no backend required.
 */
import { setupWorker } from 'msw/browser';
import { http, HttpResponse, delay } from 'msw';
import { handleApiRequest } from './handlers';

const LATENCY_MIN = 400;
const LATENCY_MAX = 900;

const resolver = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);

  let body: unknown;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    try {
      body = await request.clone().json();
    } catch {
      body = undefined;
    }
  }

  // Artificial latency so the UI exercises genuine loading states.
  await delay(LATENCY_MIN + Math.random() * (LATENCY_MAX - LATENCY_MIN));

  const { status, body: payload } = handleApiRequest(request.method, url.pathname, body);
  return HttpResponse.json(payload as object | null, { status });
};

const worker = setupWorker(http.all('/api/*', resolver));

export async function installMockApi(): Promise<void> {
  await worker.start({
    // Let non-API requests (assets, translations, HMR) hit the network as usual.
    onUnhandledRequest: 'bypass',
    quiet: true,
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
  });
}
