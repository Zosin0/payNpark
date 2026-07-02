import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { setUnauthorizedHandler, TOKEN_KEY } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUnauthorizedHandler(() => setIsAuthenticated(false));

    const restoreSession = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    restoreSession();

    return () => setUnauthorizedHandler(null);
  }, []);

  const login = async (token) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({ isAuthenticated, isLoading, login, logout }),
    [isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
