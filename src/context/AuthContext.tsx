import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  twitterAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // You would typically validate the token with the server here
      // For now, we'll just simulate a logged-in user
      setUser({ name: 'Demo User' });
    }
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    try {
      // In a real app, you would make an API call to authenticate
      // For demo purposes, we'll just simulate a successful login
      if (credentials.username === 'admin' && credentials.password === 'password') {
        const token = 'demo-token';
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        setUser({ name: 'Demo User' });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const twitterAuth = async () => {
    try {
      // In a real app, you would redirect to Twitter OAuth
      // For demo purposes, we'll just simulate a successful auth
      console.log('Redirecting to Twitter OAuth...');
      // window.location.href = 'http://localhost:8000/auth/twitter';
    } catch (error) {
      console.error('Twitter auth failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, twitterAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
