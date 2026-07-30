// luminousheaven/src/components/LoginForm.jsx
"use client";

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
        className="block w-full px-4 py-3 bg-white/70 border border-brand-divider rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-accent transition text-sm"
        placeholder="Email address"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        id="password"
        name="password"
        type="password"
        required
        className="block w-full px-4 py-3 bg-white/70 border border-brand-divider rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-accent transition text-sm"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-md shadow-md text-sm font-semibold text-white bg-brand-accent hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent disabled:bg-gray-400 transition-all uppercase tracking-wider"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default LoginForm;
