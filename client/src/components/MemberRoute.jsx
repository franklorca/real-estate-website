// client/src/components/MemberRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MemberRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  // Redirect to login if not a logged-in user
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default MemberRoute;