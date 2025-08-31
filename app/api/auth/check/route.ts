import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '../../../../lib/jwt';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const adminToken = cookieStore.get('admin-token');
    
    if (!adminToken?.value) {
      return NextResponse.json({ isAdmin: false });
    }
    
    const payload = verifyToken(adminToken.value);
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
