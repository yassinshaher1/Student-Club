'use client';

import { useState, useCallback, useEffect } from 'react';
import { loginUser } from '@/lib/services/users';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

const STORAGE_KEY = 'auth_state';

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
  });

  // Load initial state from localStorage
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        setState({
          user: parsedState.user,
          token: parsedState.token,
          isLoading: false,
        });
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Save state changes to localStorage
  useEffect(() => {
    if (!state.isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        user: state.user,
        token: state.token,
      }));
    }
  }, [state.user, state.token, state.isLoading]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);
      
      if (response.success) {
        setState({
          user: {
            id: response.userId,
            name: response.name,
            email: response.email,
            role: response.role,
          },
          token: response.token,
          isLoading: false,
        });
      }
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setState({ user: null, token: null, isLoading: false });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    user: state.user,
    token: state.token,
    isAuthenticated: !!state.token,
    isLoading: state.isLoading,
    login,
    logout,
  };
}