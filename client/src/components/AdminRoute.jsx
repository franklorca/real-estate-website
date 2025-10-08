// client/src/components/AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
  const { user, isLoading } = useAuth(); // <-- GET isLoading FROM THE CONTEXT

  // 1. First, wait for the authentication check to complete
  if (isLoading) {
    // You can show a spinner or a blank page while loading
    return <div>Loading...</div>;
  }

  // 2. Once loading is false, check if the user is an admin
  if (user && user.role === 'admin') {
    return <Outlet />; // If they are, show the dashboard
  }

  // 3. If they are not an admin, redirect them
  return <Navigate to="/" />;
};

export default AdminRoute;