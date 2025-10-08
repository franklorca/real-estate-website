// client/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout Components
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import AdminRoute from './components/AdminRoute';
import MemberRoute from './components/MemberRoute';

// Page Components
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import CreatePropertyPage from './pages/CreatePropertyPage';
import EditPropertyPage from './pages/EditPropertyPage';
import AdminLoginPage from './pages/AdminLoginPage';
import UserDashboardPage from './pages/UserDashboardPage';

function App() {
  return (
    <Routes>
      {/* --- Public Routes with Main Layout --- */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="listings" element={<ListingsPage />} />
      </Route>

      {/* --- Auth Routes (No Layout) --- */}
      <Route path="signup" element={<SignUpPage />} />
      <Route path="login" element={<LoginPage />} />
       <Route path="/admin/login" element={<AdminLoginPage />} />
      
      {/* --- Protected Admin Routes --- */}
      {/* The AdminRoute now wraps the entire Admin section */}
      <Route element={<AdminRoute />}>
        {/* The AdminLayout provides the shared UI for all admin pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="properties/new" element={<CreatePropertyPage />} />
          <Route path="properties/edit/:id" element={<EditPropertyPage />} />
          {/* Future admin routes like "edit" will go here */}
        </Route>
      </Route>

       <Route element={<MemberRoute />}>
        <Route path="/dashboard" element={<UserDashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;