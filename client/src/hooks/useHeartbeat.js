// client/src/hooks/useHeartbeat.js
import { useEffect } from "react";
import api from "../services/api";
import { APP_CONFIG } from "../config/appConfig";

export const useHeartbeat = () => {
  useEffect(() => {
    let intervalId = null;

    const pingBackend = async () => {
      // Only ping if document tab is visible to avoid unnecessary calls
      if (document.visibilityState === "hidden") return;

      try {
        await api.get("/api/test");
        console.log("[Heartbeat] Backend pinged successfully.");
      } catch (err) {
        console.warn("[Heartbeat] Ping error:", err.message);
      }
    };

    // Set up heartbeat timer based on config interval
    intervalId = setInterval(pingBackend, APP_CONFIG.HEARTBEAT_INTERVAL_MS);

    // Also ping on visibility change if user returns to tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        pingBackend();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalId) clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
};
