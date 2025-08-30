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

export function checkAdminAccess(): boolean {
  return isAdmin();
}
