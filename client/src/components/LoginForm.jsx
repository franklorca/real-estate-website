// client/src/components/LoginForm.jsx
import React, { useState } from 'react';

const LoginForm = ({ onSubmit, title, subtitle, buttonText }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-center text-gray-900">{title}</h2>
      <p className="text-center text-gray-600">{subtitle}</p>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</label>
          <input
            id="email" name="email" type="email" required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={formData.email} onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
          <input
            id="password" name="password" type="password" required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={formData.password} onChange={handleChange}
          />
        </div>

        {/* The error/success messages are now removed from this reusable component */}
        
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;