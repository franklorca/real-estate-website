// client/src/services/api.js
import axios from 'axios';

// Create a new instance of axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // The base URL is read from the .env file
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