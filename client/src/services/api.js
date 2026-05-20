// client/src/services/api.js
import axios from 'axios';

// Create a new instance of axios
const api = axios.create({
  // Fail-proof runtime check: if running on localhost, use local VITE_API_URL. In production, use /api proxy.
  baseURL: (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
    ? import.meta.env.VITE_API_URL
    : '/api',
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    
    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config; // Return the modified config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default api;