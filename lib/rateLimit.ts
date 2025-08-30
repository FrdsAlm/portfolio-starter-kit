// In-memory rate limiting (for production, consider Redis)
const attempts = new Map<string, number[]>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOCKOUT_MS = 30 * 60 * 1000; // 30 minutes lockout

export function checkRateLimit(ip: string): { allowed: boolean; remainingAttempts?: number; lockoutUntil?: number } {
  const now = Date.now();
  const userAttempts = attempts.get(ip) || [];
  
  // Remove attempts older than the window
  const recentAttempts = userAttempts.filter(time => now - time < WINDOW_MS);
  
  // Check if user is in lockout period
  if (recentAttempts.length >= MAX_ATTEMPTS) {
    const oldestAttempt = Math.min(...recentAttempts);
    const lockoutUntil = oldestAttempt + LOCKOUT_MS;
    
    if (now < lockoutUntil) {
      return { 
        allowed: false, 
        lockoutUntil 
      };
    } else {
      // Lockout period expired, reset attempts
      attempts.delete(ip);
      return { 
        allowed: true, 
        remainingAttempts: MAX_ATTEMPTS - 1 
      };
    }
  }
  
  return { 
    allowed: true, 
    remainingAttempts: MAX_ATTEMPTS - recentAttempts.length - 1 
  };
}

export function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const userAttempts = attempts.get(ip) || [];
  
  // Add current attempt and clean old ones
  const recentAttempts = userAttempts.filter(time => now - time < WINDOW_MS);
  recentAttempts.push(now);
  
  attempts.set(ip, recentAttempts);
}

export function clearAttempts(ip: string): void {
  attempts.delete(ip);
}
