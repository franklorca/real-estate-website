// client/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm'; // Import the new reusable component

const LoginPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { loginAction } = useAuth();

  const handleMemberLogin = async (formData) => {
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/member-login', formData);
      loginAction(response.data.token);
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/listings'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12">
      <div className="w-full max-w-md">
        <LoginForm
          onSubmit={handleMemberLogin}
          error={error}
          success={success}
          title="Member Login"
          subtitle="Welcome back to Luminous Heaven."
          buttonText="Sign In"
        />
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-gray-800 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;