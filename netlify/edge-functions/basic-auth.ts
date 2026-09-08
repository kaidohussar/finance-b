declare const Netlify: {
  env: { get(key: string): string | undefined };
};

interface EdgeContext {
  next(): Promise<Response>;
}

export function isAuthorized(
  authHeader: string | null,
  credentials: string | undefined,
): boolean {
  if (!credentials || !authHeader?.startsWith('Basic ')) {
    return false;
  }
  try {
    return atob(authHeader.slice('Basic '.length)) === credentials;
  } catch {
    return false;
  }
}

export default async function handler(
  request: Request,
  context: EdgeContext,
): Promise<Response> {
  const credentials = Netlify.env.get('BASIC_AUTH_CREDENTIALS');

  if (!credentials) {
    return new Response('Access denied: authentication is not configured.', {
      status: 401,
    });
  }

  if (!isAuthorized(request.headers.get('Authorization'), credentials)) {
    return new Response('Authentication required.', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Restricted"' },
    });
  }

  return context.next();
}
