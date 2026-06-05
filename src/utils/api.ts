export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const getUser = async (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      });
    }, 1500);
  });
};

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export interface Report {
  id: string;
  url: string;
}

export const generateReport = async (): Promise<Report> => {
  const [response] = await Promise.all([
    fetch('/generate-report', {
      method: 'POST',
      headers: { Accept: 'application/json' }
    }),
    new Promise((r) => setTimeout(r, 800))
  ]);

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText || 'Request failed');
  }

  return response.json();
};