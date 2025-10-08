// client/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const [savedPropertyIds, setSavedPropertyIds] = useState(new Set()); // Using a Set for efficient lookups

  // This effect handles user login/logout and token decoding
  useEffect(() => {
    setIsLoading(true);
    try {
      if (token) {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        localStorage.setItem('token', token);
      } else {
        setUser(null);
        setSavedPropertyIds(new Set()); // Clear saved properties on logout
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error("Invalid token:", error);
      setUser(null);
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // This new effect fetches saved properties when a user logs in
  useEffect(() => {
    if (user && token) {
      const fetchSaved = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/users/me/saved-properties', {
            headers: { Authorization: `Bearer ${token}` },
          });
          // Create a Set of IDs from the fetched properties
          const ids = new Set(response.data.map(p => p.id));
          setSavedPropertyIds(ids);
        } catch (error) {
          console.error("Could not fetch saved properties", error);
        }
      };
      fetchSaved();
    }
  }, [user, token]); // Runs when user or token changes

  const loginAction = (newToken) => setToken(newToken);
  const logOut = () => setToken(null);

  // --- NEW FUNCTIONS TO MANAGE SAVED PROPERTIES ---

  const saveProperty = async (propertyId) => {
    try {
      await axios.post('http://localhost:5000/api/users/me/saved-properties', 
        { property_id: propertyId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Optimistic UI update: add the ID to our set instantly
      setSavedPropertyIds(prevIds => new Set(prevIds).add(propertyId));
    } catch (error) {
      console.error("Failed to save property", error);
    }
  };
  
  const unsaveProperty = async (propertyId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/me/saved-properties/${propertyId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Optimistic UI update: remove the ID from our set instantly
      setSavedPropertyIds(prevIds => {
        const newIds = new Set(prevIds);
        newIds.delete(propertyId);
        return newIds;
      });
    } catch (error) {
      console.error("Failed to unsave property", error);
    }
  };

  const value = { token, user, isLoading, savedPropertyIds, saveProperty, unsaveProperty, loginAction, logOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);