import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import type { User } from '../types/auth';
import { loginRequest, ApiError } from '../utils/api';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string) => {
    try {
      const { user } = await loginRequest(email, password);
      const newUser: User = { email: user.email };
      setUser(newUser);
      localStorage.setItem('auth_user', JSON.stringify(newUser));
      return { success: true };
    } catch (err) {
      const code = err instanceof ApiError ? err.message : 'login.errorGeneric';
      return { success: false, error: code };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
