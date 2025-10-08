// client/src/pages/EditPropertyPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropertyForm from '../components/PropertyForm'; // Reusing our form!

const EditPropertyPage = () => {
  const [property, setProperty] = useState(null); // State to hold the fetched property
  const [error, setError] = useState('');
  const { id } = useParams(); // Gets the ':id' from the URL
  const navigate = useNavigate();
  const { token } = useAuth();

  // Effect to fetch the property data when the component mounts
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/properties/${id}`);
        setProperty(response.data);
      } catch (err) {
        console.error("Failed to fetch property:", err);
        setError('Could not load property data.');
      }
    };
    fetchProperty();
  }, [id]); // Re-run if the ID in the URL changes

  const handleUpdateProperty = async (formData) => {
    try {
        const API_URL = import.meta.env.VITE_API_URL;
      await axios.put(`${API_URL}/api/properties/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/admin/dashboard');
    } catch (err) {
      console.error("Failed to update property:", err);
      setError('Failed to update property. Please check the fields and try again.');
    }
  };
  
  // Show loading state until the property data is fetched
  if (!property) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Property</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <PropertyForm 
          initialData={property} // Pass the fetched data to pre-fill the form
          onSubmit={handleUpdateProperty}
          buttonText="Update Property"
        />
      </div>
    </div>
  );
};

export default EditPropertyPage;