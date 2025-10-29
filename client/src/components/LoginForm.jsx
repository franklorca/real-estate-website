// client/src/components/LoginForm.jsx
import React, { useState } from "react";

const LoginForm = ({ onSubmit, buttonText, isLoading }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        className="block w-full px-4 py-3 bg-white/50 border border-gray-300/50 rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
        placeholder="Email address"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        id="password"
        name="password"
        type="password"
        required
        className="block w-full px-4 py-3 bg-white/50 border border-gray-300/50 rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 transition-all transform hover:scale-105"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default LoginForm;
