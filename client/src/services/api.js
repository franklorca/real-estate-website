// client/src/services/api.js
import axios from 'axios';

// Create a new instance of axios
const api = axios.create({
  // Use VITE_API_URL in development, and relative /api in production (to use Vercel proxy)
  baseURL: import.meta.env.DEV ? import.meta.env.VITE_API_URL : '/api',
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