
import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('mazze_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string) => {
    const newUser = { id: 'u123', name: email.split('@')[0], email };
    setUser(newUser);
    localStorage.setItem('mazze_user', JSON.stringify(newUser));
  };

  const loginWithGoogle = async () => {
    // Simulate a network delay for the Google Auth process
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser = { 
          id: 'g' + Math.random().toString(36).substr(2, 9), 
          name: 'Mazzé Enthusiast', 
          email: 'hello@mazze.studio' 
        };
        setUser(newUser);
        localStorage.setItem('mazze_user', JSON.stringify(newUser));
        resolve();
      }, 1200);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mazze_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
