// src/components/layout/RootLayout.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import {
  BarChart,
  FileInput,
  Goal,
  HelpCircle,
  Home,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
}

const NavItem = ({ href, children, icon: Icon }: NavItemProps) => {
  const { pathname } = useRouter();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
        isActive
          ? "bg-green-100 text-green-700"
          : "text-gray-600 hover:bg-green-50 hover:text-green-700"
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {children}
    </Link>
  );
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: string, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <nav
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 md:static z-50`}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold text-green-700">EcoTrack</h1>
          <p className="text-sm text-gray-500">Sustainability Dashboard</p>
        </div>
        <div className="flex items-center p-4 space-x-3 border-b border-gray-200">
          {user ? (
            <>
              <img
                src={user.user_metadata?.avatar_url || "https://via.placeholder.com/40?text=Avatar"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">
                  {user.user_metadata?.full_name || user.email}
                </p>
                <p className="text-xs text-gray-500">Logged in</p>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500">Loading user...</p>
          )}
        </div>
        <div className="flex-1 px-2 py-4 space-y-2">
          <NavItem href="/dashboard" icon={Home}>Home</NavItem>
          <NavItem href="/data-input" icon={FileInput}>Data Input</NavItem>
          <NavItem href="/goals" icon={Goal}>Goals</NavItem>
          <NavItem href="/reports" icon={BarChart}>Reports</NavItem>
          <NavItem href="/settings" icon={Settings}>Settings</NavItem>
          <NavItem href="/help" icon={HelpCircle}>Help</NavItem>
        </div>
        <div className="px-2 py-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-md transition"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-white shadow-sm md:hidden">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-lg font-semibold text-gray-900">
              Sustainability Dashboard
            </h1>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-gray-600 bg-gray-200 rounded-md"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>
        {/* Desktop Header */}
        <header className="hidden md:block bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-lg font-semibold text-gray-900">
              Sustainability Dashboard
            </h1>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RootLayout;