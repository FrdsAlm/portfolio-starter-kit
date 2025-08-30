import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyPassword, getAdminPasswordHash, getAdminPassword } from '../../../../lib/password';
import { createAdminToken } from '../../../../lib/jwt';
import { checkRateLimit, recordFailedAttempt, clearAttempts } from '../../../../lib/rateLimit';
import { validatePassword, getClientIP } from '../../../../lib/validation';

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    
    // Check rate limiting
    const rateLimitResult = checkRateLimit(clientIP);
    if (!rateLimitResult.allowed) {
      return NextResponse.json({ 
        error: 'Too many login attempts. Please try again later.',
        lockoutUntil: rateLimitResult.lockoutUntil 
      }, { status: 429 });
    }
    
    const { password } = await request.json();
    
    // Validate input
    const validation = validatePassword(password);
    if (!validation.valid) {
      recordFailedAttempt(clientIP);
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    
    let isValidPassword = false;
    
    // Try hashed password first, then fallback to plain text
    const passwordHash = getAdminPasswordHash();
    if (passwordHash) {
      isValidPassword = await verifyPassword(password, passwordHash);
    } else {
      const plainPassword = getAdminPassword();
      isValidPassword = plainPassword === password;
    }
    
    if (isValidPassword) {
      // Clear failed attempts on successful login
      clearAttempts(clientIP);
      
      // Create JWT token
      const token = createAdminToken();
      
      // Set secure cookie with JWT
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
      
      return response;
    } else {
      recordFailedAttempt(clientIP);
      return NextResponse.json({ 
        error: 'Invalid password',
        remainingAttempts: rateLimitResult.remainingAttempts 
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

export async function DELETE() {
  // Logout endpoint
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin-token');
  return response;
}
