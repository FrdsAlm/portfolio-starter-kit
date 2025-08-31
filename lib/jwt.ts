import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || (process.env.NODE_ENV === 'production' ? 
  (() => { throw new Error('JWT_SECRET must be set in production') })() : 
  'dev-secret-change-in-production');
const JWT_EXPIRES_IN = '7d';

export interface JWTPayload {
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
}

export function createToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export function createAdminToken(): string {
  return createToken({ userId: 'admin', role: 'admin' });
}
