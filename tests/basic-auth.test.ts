import { afterEach, describe, expect, test } from 'vitest';
import handler, { isAuthorized } from '../netlify/edge-functions/basic-auth';

const basic = (credentials: string) => 'Basic ' + btoa(credentials);

const setCredentials = (value?: string) => {
  (globalThis as Record<string, unknown>).Netlify = {
    env: {
      get: (key: string) =>
        key === 'BASIC_AUTH_CREDENTIALS' ? value : undefined,
    },
  };
};

afterEach(() => {
  delete (globalThis as Record<string, unknown>).Netlify;
});

describe('isAuthorized', () => {
  test('rejects when Authorization header is missing', () => {
    expect(isAuthorized(null, 'user:pass')).toBe(false);
  });

  test('rejects when header is not Basic scheme', () => {
    expect(isAuthorized('Bearer abc123', 'user:pass')).toBe(false);
  });

  test('rejects wrong credentials', () => {
    expect(isAuthorized(basic('user:wrong'), 'user:pass')).toBe(false);
  });

  test('accepts matching credentials', () => {
    expect(isAuthorized(basic('user:pass'), 'user:pass')).toBe(true);
  });

  test('rejects when configured credentials are unset', () => {
    expect(isAuthorized(basic('user:pass'), undefined)).toBe(false);
  });

  test('rejects malformed base64 without throwing', () => {
    expect(isAuthorized('Basic %%%not-base64%%%', 'user:pass')).toBe(false);
  });
});

describe('handler', () => {
  const request = (authHeader?: string) =>
    new Request('https://example.com/', {
      headers: authHeader ? { Authorization: authHeader } : {},
    });

  const context = { next: async () => new Response('app content') };

  test('returns 401 with WWW-Authenticate when no credentials sent', async () => {
    setCredentials('user:pass');
    const response = await handler(request(), context);
    expect(response.status).toBe(401);
    expect(response.headers.get('WWW-Authenticate')).toContain('Basic');
  });

  test('returns 401 for wrong credentials', async () => {
    setCredentials('user:pass');
    const response = await handler(request(basic('user:nope')), context);
    expect(response.status).toBe(401);
  });

  test('passes request through for correct credentials', async () => {
    setCredentials('user:pass');
    const response = await handler(request(basic('user:pass')), context);
    expect(response.status).toBe(200);
    expect(await response.text()).toBe('app content');
  });

  test('fails closed with a clear message when env var is not configured', async () => {
    setCredentials(undefined);
    const response = await handler(request(basic('user:pass')), context);
    expect(response.status).toBe(401);
    expect(await response.text()).toContain('not configured');
  });
});
