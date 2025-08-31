import { cookies } from 'next/headers';
import { verifyToken } from './jwt';

// Check if user is authenticated admin using JWT
export function isAdmin(): boolean {
  try {
    const cookieStore = cookies();
    const adminToken = cookieStore.get('admin-token');
    
    if (!adminToken?.value) {
      return false;
    }
    
    const payload = verifyToken(adminToken.value);
    return payload?.role === 'admin';
  } catch (error) {
    // If cookies can't be read (client-side), return false
    return false;
  }
}

// More robust admin access check for API routes
export function checkAdminAccess(): boolean {
  try {
    // First try the standard cookie-based approach
    const cookieStore = cookies();
    const adminToken = cookieStore.get('admin-token');
    
    if (adminToken?.value) {
      const payload = verifyToken(adminToken.value);
      if (payload?.role === 'admin') {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Admin access check error:', error);
    return false;
  }
}

// Server-side admin access check that works in production
export function checkAdminAccessFromRequest(request: Request): boolean {
  try {
    // Get cookies from the request headers
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) {
          return false;
  }
  
  // Parse cookies manually
  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
  
  const adminToken = cookies['admin-token'];
  if (!adminToken) {
    return false;
  }
  
  const payload = verifyToken(adminToken);
  return payload?.role === 'admin';
  } catch (error) {
    console.error('Request-based admin check error:', error);
    return false;
  }
}
