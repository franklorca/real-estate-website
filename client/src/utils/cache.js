// client/src/utils/cache.js
import { APP_CONFIG } from "../config/appConfig";

const CACHE_PREFIX = "lh_cache_";

/**
 * Gets cached data from localStorage if present and valid.
 * Returns null if not found.
 */
export const getCachedData = (key) => {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed.data || null;
  } catch (err) {
    console.warn(`[SWR Cache] Error reading cache key "${key}":`, err);
    return null;
  }
};

/**
 * Saves data to localStorage with timestamp.
 */
export const setCachedData = (key, data) => {
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
 * Stale-While-Revalidate execution helper:
 * 1. Checks cache and immediately fires onCacheHit(cachedData) if present (0ms delay).
 * 2. Signals onSyncing(true) to show a subtle background update indicator if desired.
 * 3. Fires fetcher() to fetch fresh data from backend.
 * 4. Updates cache and fires onFreshData(freshData).
 */
export const fetchWithSWR = async (key, fetcher, callbacks = {}) => {
  const { onCacheHit, onFreshData, onSyncing, onError } = callbacks;

  const cachedData = getCachedData(key);
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
    setCachedData(key, freshData);
    if (onFreshData) {
      onFreshData(freshData);
    }
    if (onSyncing) {
      onSyncing(false);
    }
    return freshData;
  } catch (err) {
    console.warn(`[SWR Cache] Background revalidation failed for "${key}":`, err);
    if (onSyncing) {
      onSyncing(false);
    }
    if (onError) {
      onError(err);
    }
    // If we had cached data, don't crash the page—visitor already sees cached data!
    if (hasCache) {
      return cachedData;
    }
    throw err;
  }
};
