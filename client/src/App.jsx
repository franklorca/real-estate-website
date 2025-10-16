// client/src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // <-- IMPORT CONTAINER
import "react-toastify/dist/ReactToastify.css";

// Layout Components
import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import AdminRoute from "./components/AdminRoute";
import MemberRoute from "./components/MemberRoute";

// Page Components
import HomePage from "./pages/HomePage";
import ListingsPage from "./pages/ListingsPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import CreatePropertyPage from "./pages/CreatePropertyPage";
import EditPropertyPage from "./pages/EditPropertyPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import AdminAgentsPage from "./pages/AdminAgentsPage";
import CreateAgentPage from "./pages/CreateAgentPage";
import EditAgentPage from "./pages/EditAgentPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import EditUserPage from "./pages/EditUserPage";
import PricingPage from "./pages/PricingPage";

function App() {
  return (
    <>
      <div className="font-sans text-brand-text antialiased">
        <Routes>
          {/* --- Public Routes with Main Layout --- */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="listings" element={<ListingsPage />} />
            <Route path="properties/:id" element={<PropertyDetailPage />} />
            <Route path="pricing" element={<PricingPage />} />
          </Route>

          {/* --- Auth Routes (No Layout) --- */}
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* --- Protected Admin Routes --- */}
          {/* The AdminRoute now wraps the entire Admin section */}
          <Route element={<AdminRoute />}>
            {/* The AdminLayout provides the shared UI for all admin pages */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="properties/new" element={<CreatePropertyPage />} />
              <Route
                path="properties/edit/:id"
                element={<EditPropertyPage />}
              />
              <Route path="agents" element={<AdminAgentsPage />} />
              <Route path="agents/new" element={<CreateAgentPage />} />
              <Route path="agents/edit/:id" element={<EditAgentPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="users/edit/:id" element={<EditUserPage />} />
              {/* Future admin routes like "edit" will go here */}
            </Route>
          </Route>

          <Route element={<MemberRoute />}>
            <Route path="/dashboard" element={<UserDashboardPage />} />
          </Route>
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}

export default App;
