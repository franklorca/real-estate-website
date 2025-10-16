// client/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const [savedPropertyIds, setSavedPropertyIds] = useState(new Set());

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          jwtDecode(token);
          const response = await api.get("/api/users/me");
          setUser(response.data);
        } catch (error) {
          setUser(null);
          localStorage.removeItem("token");
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, [token]);

  useEffect(() => {
    if (user) {
      const fetchSaved = async () => {
        try {
          const response = await api.get("/api/users/me/saved-properties");
          const ids = new Set(response.data.map((p) => p.id));
          setSavedPropertyIds(ids);
          console.log("AUTH_CONTEXT: Fetched and set saved properties.", ids);
        } catch (error) {
          console.error("AuthContext: Could not fetch saved properties", error);
        }
      };
      fetchSaved();
    } else {
      setSavedPropertyIds(new Set());
    }
  }, [user]);

  const loginAction = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const saveProperty = async (propertyId) => {
    try {
      await api.post("/api/users/me/saved-properties", {
        property_id: propertyId,
      });
      // --- DEFINITIVE FIX: Use functional update to guarantee state consistency ---
      setSavedPropertyIds((prevIds) => {
        const newIds = new Set(prevIds);
        newIds.add(propertyId);
        console.log("AUTH_CONTEXT: Saved property, new set:", newIds);
        return newIds;
      });
      toast.success("Property saved!");
    } catch (error) {
      if (error.response?.status !== 409) {
        // Don't show error if it's already saved
        toast.error("Could not save property.");
      }
    }
  };

  const unsaveProperty = async (propertyId) => {
    try {
      await api.delete(`/api/users/me/saved-properties/${propertyId}`);
      // --- DEFINITIVE FIX: Use functional update ---
      setSavedPropertyIds((prevIds) => {
        const newIds = new Set(prevIds);
        newIds.delete(propertyId);
        console.log("AUTH_CONTEXT: Unsaved property, new set:", newIds);
        return newIds;
      });
      toast.info("Property removed from saved list.");
    } catch (error) {
      toast.error("Could not remove property.");
    }
  };

  const value = {
    user,
    isLoading,
    savedPropertyIds,
    saveProperty,
    unsaveProperty,
    loginAction,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
