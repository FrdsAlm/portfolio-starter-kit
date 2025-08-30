// Input validation and sanitization utilities

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (!password) {
    return { valid: false, error: 'Password is required' };
  }
  
  if (typeof password !== 'string') {
    return { valid: false, error: 'Password must be a string' };
  }
  
  if (password.length < 1) {
    return { valid: false, error: 'Password cannot be empty' };
  }
  
  if (password.length > 1000) {
    return { valid: false, error: 'Password too long' };
  }
  
  return { valid: true };
}

export function validateBlogPost(data: any): { valid: boolean; error?: string } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid data format' };
  }
  
  const { title, content, summary } = data;
  
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return { valid: false, error: 'Title is required and must be a non-empty string' };
  }
  
  if (title.length > 200) {
    return { valid: false, error: 'Title too long (max 200 characters)' };
  }
  
  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    return { valid: false, error: 'Content is required and must be a non-empty string' };
  }
  
  if (content.length > 50000) {
    return { valid: false, error: 'Content too long (max 50,000 characters)' };
  }
  
  if (summary && (typeof summary !== 'string' || summary.length > 500)) {
    return { valid: false, error: 'Summary must be a string with max 500 characters' };
  }
  
  return { valid: true };
}

export function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .substring(0, 10000); // Limit length
}

export function getClientIP(request: Request): string {
  // Try to get real IP from headers (for production behind proxies)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  // Fallback for development
  return 'unknown';
}
