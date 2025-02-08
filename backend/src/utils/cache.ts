import { redis } from "../config/redis";

// Get cache data
export async function getCache(key: string): Promise<string | null> {
    const value = await redis.get(key);
    return value;
}

// Set data to the cache with an expiry time (e.g., 3600 seconds = 1 hour)
export async function setCache(key: string, value: string, expiryInSeconds: number): Promise<void> {
    await redis.set(key, value, 'EX', expiryInSeconds);
}
