'use client';

import { useState, useEffect } from 'react';

// Simple client-side auth state management
let globalAuthState: { isAdmin: boolean; checked: boolean } = {
  isAdmin: false,
  checked: false
};

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(globalAuthState.isAdmin);
  const [isLoading, setIsLoading] = useState(!globalAuthState.checked);

  useEffect(() => {
    if (!globalAuthState.checked) {
      checkAuthStatus();
    }
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check if admin token exists in cookies (client-side)
      const hasAdminToken = document.cookie.includes('admin-token=');
      
      if (hasAdminToken) {
        // Only make API call if token exists
        const response = await fetch('/api/auth/check', {
          method: 'GET',
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          const adminStatus = data.isAdmin || false;
          
          // Update global state
          globalAuthState = { isAdmin: adminStatus, checked: true };
          setIsAdmin(adminStatus);
        } else {
          globalAuthState = { isAdmin: false, checked: true };
          setIsAdmin(false);
        }
      } else {
        // No token = not admin, no API call needed
        globalAuthState = { isAdmin: false, checked: true };
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      globalAuthState = { isAdmin: false, checked: true };
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { isAdmin, isLoading, checkAuthStatus };
}
