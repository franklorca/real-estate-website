// luminousheaven/src/utils/cache.js
const CACHE_PREFIX = "lh_cache_";

export const clearAllSWRCache = () => {
  try {
    if (typeof localStorage !== "undefined") {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    }
  } catch (err) {}
};

export const getCachedData = (key, validator = null) => {
  try {
    if (typeof localStorage === "undefined") return null;
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const data = parsed?.data ?? null;

    if (data === null) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }

    if (validator && typeof validator === "function") {
      if (!validator(data)) {
        localStorage.removeItem(CACHE_PREFIX + key);
        return null;
      }
    }
    return data;
  } catch (err) {
    return null;
  }
};

export const setCachedData = (key, data, validator = null) => {
  if (data === null || data === undefined) return;
  if (typeof data === "object" && data !== null && !Array.isArray(data) && (data.error || data.message)) {
    return;
  }
  if (validator && typeof validator === "function" && !validator(data)) {
    return;
  }

  try {
    if (typeof localStorage !== "undefined") {
      const payload = { timestamp: Date.now(), data };
      localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(payload));
    }
  } catch (err) {}
};

export const fetchWithSWR = async (key, fetcher, callbacks = {}, validator = null) => {
  const { onCacheHit, onFreshData, onSyncing, onError } = callbacks;

  const cachedData = getCachedData(key, validator);
  let hasCache = false;

  if (cachedData !== null) {
    hasCache = true;
    if (onCacheHit) onCacheHit(cachedData);
  }

  if (hasCache && onSyncing) onSyncing(true);

  try {
    const freshData = await fetcher();
    if (validator && typeof validator === "function" && !validator(freshData)) {
      if (onSyncing) onSyncing(false);
      if (hasCache) return cachedData;
      throw new Error(`Invalid data format received for "${key}".`);
    }

    setCachedData(key, freshData, validator);
    if (onFreshData) onFreshData(freshData);
    if (onSyncing) onSyncing(false);
    return freshData;
  } catch (err) {
    if (onSyncing) onSyncing(false);
    if (onError) onError(err);
    if (hasCache) return cachedData;
    throw err;
  }
};
