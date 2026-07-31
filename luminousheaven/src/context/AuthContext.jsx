// luminousheaven/src/context/AuthContext.jsx
"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import api from "@/services/api";
import { signIn, signUp, signOut, useSession } from "@/lib/auth-client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data: session, isPending: sessionLoading } = useSession();
  const [user, setUser] = useState(null);
  const [savedPropertyIds, setSavedPropertyIds] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!sessionLoading) {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          role: session.user.role || "member",
          membership_status: session.user.membership_status || "pending",
        });
      } else {
        // Fallback: check /api/users/me if token stored in localStorage
        const checkMe = async () => {
          try {
            const res = await api.get("/api/users/me");
            setUser(res.data);
          } catch (e) {
            setUser(null);
          } finally {
            setIsLoading(false);
          }
        };
        checkMe();
        return;
      }
      setIsLoading(false);
    }
  }, [session, sessionLoading]);

  useEffect(() => {
    if (user) {
      const fetchSaved = async () => {
        try {
          const response = await api.get("/api/users/me/saved-properties");
          const ids = new Set(response.data.map((p) => p.id));
          setSavedPropertyIds(ids);
        } catch (error) {
          console.error("AuthContext: Could not fetch saved properties", error);
        }
      };
      fetchSaved();
    } else {
      setSavedPropertyIds(new Set());
    }
  }, [user]);

  const loginAction = async (email, password) => {
    const res = await signIn.email({
      email,
      password,
    });
    if (res.error) {
      throw new Error(res.error.message || "Invalid credentials");
    }
    return res;
  };

  const logOut = async () => {
    await signOut();
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("token");
    }
    setUser(null);
  };

  const saveProperty = async (propertyId) => {
    try {
      await api.post("/api/users/me/saved-properties", {
        property_id: propertyId,
      });
      setSavedPropertyIds((prevIds) => {
        const newIds = new Set(prevIds);
        newIds.add(propertyId);
        return newIds;
      });
      toast.success("Property saved!");
    } catch (error) {
      if (error.response?.status !== 409) {
        toast.error("Could not save property.");
      }
    }
  };

  const unsaveProperty = async (propertyId) => {
    try {
      await api.delete(`/api/users/me/saved-properties/${propertyId}`);
      setSavedPropertyIds((prevIds) => {
        const newIds = new Set(prevIds);
        newIds.delete(propertyId);
        return newIds;
      });
      toast.info("Property removed from saved list.");
    } catch (error) {
      toast.error("Could not remove property.");
    }
  };

  const refreshUser = async () => {
    try {
      const res = await api.get("/api/users/me");
      if (res.data) {
        setUser(res.data);
      }
    } catch (e) {
      console.error("AuthContext refreshUser error:", e);
    }
  };

  const value = {
    user,
    setUser,
    refreshUser,
    isLoading: isLoading || sessionLoading,
    savedPropertyIds,
    saveProperty,
    unsaveProperty,
    loginAction,
    logOut,
    signIn,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
