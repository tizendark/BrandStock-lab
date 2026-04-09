import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AppContextType {
  state: AppState;
  login: (userData: User) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>({
    user: { id: '1', name: 'Usuario Demo', email: 'demo@brandstock.com', role: 'admin' }, // Mock user for now
    isAuthenticated: true,
    isLoading: false,
  });

  const login = (userData: User) => {
    setState(prev => ({ ...prev, user: userData, isAuthenticated: true }));
  };

  const logout = () => {
    setState(prev => ({ ...prev, user: null, isAuthenticated: false }));
  };

  const setLoading = (isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  };

  return (
    <AppContext.Provider value={{ state, login, logout, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
