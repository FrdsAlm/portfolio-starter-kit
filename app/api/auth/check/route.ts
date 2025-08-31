import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../../lib/jwt';

// Force dynamic rendering to prevent static optimization issues
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get cookies from the request headers instead of using cookies()
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) {
      return NextResponse.json({ isAdmin: false });
    }
    
    // Parse cookies manually
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
    
    const adminToken = cookies['admin-token'];
    if (!adminToken) {
      return NextResponse.json({ isAdmin: false });
    }
    
    const payload = verifyToken(adminToken);
    const isAdmin = payload?.role === 'admin';
    
    return NextResponse.json({ 
      isAdmin: isAdmin || false 
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ 
      isAdmin: false 
    });
  }
}
