// luminousheaven/src/components/AdminLayout.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Building,
  UserCheck,
  Users,
  FileText,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X,
} from "lucide-react";

const AdminLayout = ({ children }) => {
  const { user, logOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      name: "Properties & Settings",
      href: "/admin/dashboard",
      icon: Building,
      active: pathname === "/admin/dashboard",
    },
    {
      name: "Agents Management",
      href: "/admin/agents",
      icon: UserCheck,
      active: pathname.startsWith("/admin/agents"),
    },
    {
      name: "Users & Members",
      href: "/admin/users",
      icon: Users,
      active: pathname.startsWith("/admin/users"),
    },
    {
      name: "Journal & Blogs",
      href: "/admin/blogs",
      icon: FileText,
      active: pathname.startsWith("/admin/blogs"),
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col justify-between transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 shadow-xl`}
      >
        <div>
          {/* Admin Console Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <Link
              href="/admin/dashboard"
              className="flex items-center space-x-3"
            >
              <div className="w-9 h-9 rounded-lg bg-brand-accent flex items-center justify-center text-white font-bold font-serif text-xl shadow-md">
                L
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-wider text-white block">
                  Luminous Admin
                </span>
                <span className="text-[10px] uppercase tracking-widest text-brand-accent font-semibold block">
                  Control Console
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 px-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    item.active
                      ? "bg-brand-accent text-white shadow-md font-semibold"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin Action & Identity */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center w-full px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 ml-2" />
          </Link>

          <button
            onClick={logOut}
            className="flex items-center justify-center w-full px-4 py-2.5 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:block">
              <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider">
                Management Console
              </span>
              <h2 className="text-lg font-serif font-bold text-brand-dark">
                {navItems.find((n) => n.active)?.name || "Admin Panel"}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              target="_blank"
              className="hidden md:inline-flex items-center text-xs font-semibold text-brand-accent hover:text-brand-dark transition-colors border border-brand-accent/30 bg-brand-accent/5 px-3 py-1.5 rounded-full"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> View Public Site
            </Link>

            <div className="flex items-center space-x-3 border-l pl-4 border-gray-200">
              <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent font-bold text-sm">
                <Shield className="w-4 h-4" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-brand-dark">
                  {user?.name || "Administrator"}
                </p>
                <span className="inline-block text-[10px] uppercase font-bold px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded">
                  Admin
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
