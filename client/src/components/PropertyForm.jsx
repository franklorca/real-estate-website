// client/src/components/PropertyForm.jsx
import React, { useState } from 'react';

const PropertyForm = ({ initialData = {}, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    city: initialData.city || '',
    price: initialData.price || '',
    bedrooms: initialData.bedrooms || '',
    bathrooms: initialData.bathrooms || '',
    image: initialData.image || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">
            {key.replace('_', ' ')}
          </label>
          <input
            type={key === 'price' || key === 'bedrooms' || key === 'bathrooms' ? 'number' : 'text'}
            name={key}
            id={key}
            value={formData[key]}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default PropertyForm;