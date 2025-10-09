// client/src/pages/AdminLoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';

const AdminLoginPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { loginAction } = useAuth();

  const handleAdminLogin = async (formData) => {
    setError('');
    setSuccess('');
    try {
      // Point to the correct admin login endpoint
            const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API_URL}/api/auth/login`, formData);
      loginAction(response.data.token);
      setSuccess('Admin login successful! Redirecting...');
      // Redirect to the admin dashboard on success
      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 py-12">
      <LoginForm
        onSubmit={handleAdminLogin}
        error={error}
        success={success}
        title="Admin Portal"
        subtitle="Please enter your administrator credentials."
        buttonText="Login"
      />
    </div>
  );
};

export default AdminLoginPage;