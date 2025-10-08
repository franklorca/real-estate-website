// client/src/components/AdminLayout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { logOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">
            <Link to="/admin/dashboard">Luminous Heaven - Admin</Link>
          </h1>
          <nav>
            <button 
              onClick={logOut} 
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>
      <main>
        {/* The content of the specific admin page (Dashboard, Create, etc.) will be rendered here */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;