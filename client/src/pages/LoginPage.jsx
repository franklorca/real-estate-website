// client/src/pages/LoginPage.jsx
import React from 'react';
import { toast } from 'react-toastify';
import api from '../services/api'; // <-- IMPORT OUR NEW API SERVICE
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm'; // Import the new reusable component

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginAction } = useAuth();

  const handleMemberLogin = async (formData) => {
    toast.dismiss();
    try {
      const response = await api.post('/api/auth/member-login', formData);
      loginAction(response.data.token);
      toast.success('Login successful! Redirecting...');
      setTimeout(() => navigate('/listings'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred during login.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12">
      <div className="w-full max-w-md">
        <LoginForm
          onSubmit={handleMemberLogin}
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