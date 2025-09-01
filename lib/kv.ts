import { kv } from '@vercel/kv';

// Export the configured KV instance
export { kv };

// Helper function to check if KV is available
export function isKVAvailable(): boolean {
  try {
    // Check if KV environment variables are set
    return !!(process.env.KV_URL || process.env.KV_REST_API_URL);
  } catch {
    return false;
  }
}

// Fallback for development when KV is not available
export class LocalStorageFallback {
  private static storage = new Map<string, any>();
  private static index = new Set<string>();

  static async get<T>(key: string): Promise<T | null> {
    return this.storage.get(key) || null;
  }

  static async set(key: string, value: any): Promise<void> {
    this.storage.set(key, value);
  }

  static async del(key: string): Promise<void> {
    this.storage.delete(key);
  }

  static async smembers(key: string): Promise<string[]> {
    if (key === 'blog:index') {
      return Array.from(this.index);
    }
    return [];
  }

  static async sadd(key: string, member: string): Promise<void> {
    if (key === 'blog:index') {
      this.index.add(member);
    }
  }

  static async srem(key: string, member: string): Promise<void> {
    if (key === 'blog:index') {
      this.index.delete(member);
    }
  }
}

// Export the appropriate storage based on environment
export const storage = isKVAvailable() ? kv : LocalStorageFallback;

