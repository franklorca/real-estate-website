// client/src/utils/cache.js
import { APP_CONFIG } from "../config/appConfig";

const CACHE_PREFIX = "lh_cache_";

/**
 * Purges all Luminous Heaven SWR cache keys from localStorage.
 */
export const clearAllSWRCache = () => {
  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    console.log("[SWR Cache] Cleared all local SWR cache entries.");
  } catch (err) {
    console.warn("[SWR Cache] Error clearing SWR cache:", err);
  }
};

/**
 * Gets cached data from localStorage if present and valid.
 * Optional validator callback allows strict type checking (e.g. Array.isArray).
 */
export const getCachedData = (key, validator = null) => {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const data = parsed?.data ?? null;

    if (data === null) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }

    // Check optional validator (e.g. Array.isArray)
    if (validator && typeof validator === "function") {
      if (!validator(data)) {
        console.warn(`[SWR Cache] Cached data failed validation for key "${key}". Purging key.`);
        localStorage.removeItem(CACHE_PREFIX + key);
        return null;
      }
    }

    return data;
  } catch (err) {
    console.warn(`[SWR Cache] Error reading/parsing cache key "${key}":`, err);
    try {
      localStorage.removeItem(CACHE_PREFIX + key);
    } catch (e) {}
    return null;
  }
};

/**
 * Saves data to localStorage with timestamp.
 * Rejects caching if data is null/undefined or an error object.
 */
export const setCachedData = (key, data, validator = null) => {
  if (data === null || data === undefined) return;

  // Don't cache error objects or error messages
  if (typeof data === "object" && data !== null && !Array.isArray(data) && (data.error || data.message)) {
    console.warn(`[SWR Cache] Refusing to cache error response object for key "${key}".`);
    return;
  }

  if (validator && typeof validator === "function" && !validator(data)) {
    console.warn(`[SWR Cache] Refusing to cache invalid data for key "${key}".`);
    return;
  }

  try {
    const payload = {
      timestamp: Date.now(),
      data,
    };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(payload));
  } catch (err) {
    console.warn(`[SWR Cache] Error writing cache key "${key}":`, err);
  }
};

/**
 * Stale-While-Revalidate execution helper with strict type validation.
 */
export const fetchWithSWR = async (key, fetcher, callbacks = {}, validator = null) => {
  const { onCacheHit, onFreshData, onSyncing, onError } = callbacks;

  const cachedData = getCachedData(key, validator);
  let hasCache = false;

  if (cachedData !== null) {
    hasCache = true;
    if (onCacheHit) {
      onCacheHit(cachedData);
    }
  }

  if (hasCache && onSyncing) {
    onSyncing(true);
  }

  try {
    const freshData = await fetcher();

    // Validate fresh data before updating cache and notifying component
    if (validator && typeof validator === "function" && !validator(freshData)) {
      console.warn(`[SWR Cache] Fresh data failed validation for key "${key}". Ignoring payload.`);
      if (onSyncing) onSyncing(false);
      if (hasCache) return cachedData;
      throw new Error(`Invalid data format received for "${key}".`);
    }

    setCachedData(key, freshData, validator);

    if (onFreshData) {
      onFreshData(freshData);
    }
    if (onSyncing) {
      onSyncing(false);
    }
    return freshData;
  } catch (err) {
    console.warn(`[SWR Cache] Background revalidation failed for "${key}":`, err?.message || err);
    if (onSyncing) {
      onSyncing(false);
    }
    if (onError) {
      onError(err);
    }
    if (hasCache) {
      return cachedData;
    }
    throw err;
  }
};
