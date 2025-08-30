'use client';

import { useState, useEffect } from 'react';
import { LoginForm } from '../../components/admin/LoginForm';
import { AdminButton } from '../../components/admin/AdminButton';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if already logged in
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check if admin token exists in cookies (client-side)
      const hasAdminToken = document.cookie.includes('admin-token=');
      setIsLoggedIn(hasAdminToken);
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/login', { method: 'DELETE' });
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <AdminButton variant="secondary" onClick={handleLogout}>
          Logout
        </AdminButton>
      </div>
      
      <div className="space-y-6">
        <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">
            ✅ Authentication Active
          </h2>
          <p className="text-green-700 dark:text-green-300">
            You are now logged in as admin. Admin controls are visible on blog pages.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Blog Management</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Create, edit, and delete blog posts
            </p>
            <AdminButton onClick={() => window.location.href = '/admin/blog'}>
              Manage Blog Posts
            </AdminButton>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Portfolio</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              View your portfolio homepage
            </p>
            <AdminButton variant="secondary" onClick={() => window.location.href = '/'}>
              Go to Home
            </AdminButton>
          </div>
        </div>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2">How to Test:</h3>
          <ul className="text-sm space-y-1 text-blue-800 dark:text-blue-200">
            <li>• Visit <code>/blog</code> to see the "New Post" button</li>
            <li>• Visit any blog post to see "Edit" and "Delete" buttons</li>
            <li>• Logout to hide admin controls</li>
            <li>• Login again to restore admin access</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
