// client/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react'; // <-- 1. ADD useState
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api'; // Correctly imported

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // --- 1. THESE LINES WERE MISSING ---
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const [savedPropertyIds, setSavedPropertyIds] = useState(new Set());
  // ------------------------------------

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
        setSavedPropertyIds(new Set());
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
          // --- 2. THIS WAS MISSING 'api.get' ---
          const response = await api.get('/api/users/me/saved-properties');
          const ids = new Set(response.data.map(p => p.id));
          setSavedPropertyIds(ids);
        } catch (error) {
          console.error("Could not fetch saved properties", error);
        }
      };
      fetchSaved();
    }
  }, [user, token]);

  const loginAction = (newToken) => setToken(newToken);
  const logOut = () => setToken(null);

  const saveProperty = async (propertyId) => {
    try {
      await api.post('/api/users/me/saved-properties', { property_id: propertyId });
      toast.success('Property saved!');
      setSavedPropertyIds(prevIds => new Set(prevIds).add(propertyId));
    } catch (error) {
      console.error("Failed to save property", error);
      // Check for a 409 Conflict error, which means it's already saved
      if (error.response && error.response.status === 409) {
        toast.info('This property is already in your saved list.');
      } else {
        toast.error('Could not save property. Please try again.');
      }
    }
  };
  
  const unsaveProperty = async (propertyId) => {
    try {
      // --- 3. THE API INTERCEPTOR HANDLES THE TOKEN, SO WE CAN SIMPLIFY THIS CALL ---
      await api.delete(`/api/users/me/saved-properties/${propertyId}`);
      
      setSavedPropertyIds(prevIds => {
        const newIds = new Set(prevIds);
        newIds.delete(propertyId);
        return newIds;
      });
      toast.info('Property removed from saved list.');
    } catch (error) {
      console.error("Failed to unsave property", error);
      toast.error('Could not remove property. Please try again.');
    }
  };

  const value = { token, user, isLoading, savedPropertyIds, saveProperty, unsaveProperty, loginAction, logOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);