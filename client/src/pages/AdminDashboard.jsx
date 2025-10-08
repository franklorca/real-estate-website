// client/src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const { token } = useAuth(); // We need the token for API requests

  // Fetch all properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/properties');
        setProperties(response.data);
      } catch (error) {
        console.error("Failed to fetch properties", error);
      }
    };
    fetchProperties();
  }, []);

  const handleDelete = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await axios.delete(`http://localhost:5000/api/properties/${propertyId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Refresh the list by filtering out the deleted property
        setProperties(properties.filter(p => p.id !== propertyId));
      } catch (error) {
        console.error('Failed to delete property', error);
        alert('Could not delete property.');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <Link to="/admin/properties/new">
        <button className="bg-green-600 text-white px-4 py-2 rounded-md mb-6 hover:bg-green-700">
          + Add New Property
        </button>
      </Link>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map(prop => (
              <tr key={prop.id}>
                <td className="px-6 py-4 whitespace-nowrap">{prop.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prop.city}</td>
                <td className="px-6 py-4 whitespace-nowrap">${new Intl.NumberFormat().format(prop.price)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/admin/properties/edit/${prop.id}`} 
                    className="text-indigo-600 hover:text-indigo-900">
                    Edit
                    </Link>
                  <button onClick={() => handleDelete(prop.id)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;