// client/src/config/appConfig.js

export const APP_CONFIG = {
  // Interval for keeping the Render backend awake during active browser sessions (9 minutes)
  HEARTBEAT_INTERVAL_MS: 9 * 60 * 1000,

  // Time-to-live for client SWR cache in localStorage (30 minutes)
  SWR_CACHE_TTL_MS: 30 * 60 * 1000,

  // Enable subtle visual background revalidation indicator for visitors
  ENABLE_REVALIDATION_INDICATOR: true,
};
