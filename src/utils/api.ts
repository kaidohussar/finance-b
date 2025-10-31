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