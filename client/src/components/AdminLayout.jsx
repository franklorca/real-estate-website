// client/src/components/AdminLayout.jsx
import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Icon components (no changes here)
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);
const BuildingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);
const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a4 4 0 110-8 4 4 0 010 8z"
    />
  </svg>
);
const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

const AdminLayout = () => {
  const { logOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinkClasses =
    "flex items-center px-4 py-3 text-gray-200 hover:bg-gray-700 hover:text-white rounded-md transition-colors";
  const activeNavLinkClasses = "bg-gray-900 text-white";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* --- FIX #1: Add a semi-transparent overlay that closes the sidebar on click --- */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 transition-opacity md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* --- Sidebar --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-center mt-8">
          <Link
            to="/admin/dashboard"
            className="text-white text-2xl font-semibold"
          >
            Luminous Admin
          </Link>
        </div>
        <nav className="mt-10 px-4" onClick={() => setSidebarOpen(false)}>
          {" "}
          {/* Close sidebar on nav item click */}
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
            }
            end
          >
            <BuildingIcon />
            <span className="mx-4">Properties</span>
          </NavLink>
          <NavLink
            to="/admin/agents"
            className={({ isActive }) =>
              `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
            }
          >
            <HomeIcon />
            <span className="mx-4">Agents</span>
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
            }
          >
            <UsersIcon />
            <span className="mx-4">Users</span>
          </NavLink>
        </nav>
        <div className="absolute bottom-0 w-full px-4 mb-4">
          <button onClick={logOut} className={`${navLinkClasses} w-full`}>
            <LogoutIcon />
            <span className="mx-4">Logout</span>
          </button>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white border-b md:hidden">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          {/* --- FIX #2: The button now toggles the state correctly --- */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 focus:outline-none z-40"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
