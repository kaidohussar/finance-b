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
  await new Promise((r) => setTimeout(r, 1200));
  throw new ApiError(500, 'Internal Server Error');
};