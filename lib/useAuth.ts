'use client';

import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/check', {
        method: 'GET',
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setIsAdmin(data.isAdmin || false);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { isAdmin, isLoading, checkAuthStatus };
}
