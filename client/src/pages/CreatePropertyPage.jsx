// client/src/pages/CreatePropertyPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropertyForm from '../components/PropertyForm'; // Import our new form

const CreatePropertyPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleCreateProperty = async (formData) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      await axios.post(`${API_URL}/api/properties`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // On success, navigate back to the dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      console.error("Failed to create property:", err);
      setError('Failed to create property. Please check the fields and try again.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Property</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <PropertyForm 
          onSubmit={handleCreateProperty}
          buttonText="Create Property"
        />
      </div>
    </div>
  );
};

export default CreatePropertyPage;