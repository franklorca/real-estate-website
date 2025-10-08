// client/src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- Import our hook

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logOut } = useAuth(); // <-- Get user and logOut from context

  const isHomePage = location.pathname === '/';
  const navClasses = isHomePage
    ? 'absolute bg-transparent text-white'
    : 'relative bg-gray-900 text-white';
  
  const handleLogout = () => {
    logOut();
    navigate('/'); // Redirect to homepage after logout
  };

  return (
    <header className={`${navClasses} top-0 left-0 w-full z-50 p-6`}>
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Luminous Heaven</Link>
        <div className="space-x-8 flex items-center">
          <Link to="/listings" className="hover:underline">Listings</Link>
          
          {user ? (
            // If user is logged in, show this:
            <>
              <span className="font-semibold">Welcome, {user.name}!</span>
              <Link to="/dashboard" className="font-semibold hover:underline">Dashboard</Link>
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            // If user is logged out, show this:
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/signup" className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors">
                Join Now
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;