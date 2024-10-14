'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginAction, signUp as signUpAction, logout as logoutAction } from '../actions/auth';

type User = {
  id: number;
  name: string;
  grade: number;
  emoji: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string, grade: number, emoji: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string) => {
    const { token, ...user } = await loginAction(username, password);
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);  // Store the token
  };

  const signUp = async (username: string, password: string, grade: number, emoji: string) => {
    const { token, ...user } = await signUpAction(username, password, grade, emoji);
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);  // Store the token
  };

  const logout = () => {
    logoutAction();
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}