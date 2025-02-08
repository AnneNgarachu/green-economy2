'use client'

import { useState } from "react";
import { useRouter } from "next/router";
import { createClient } from '@/lib/supabase'
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  // Function to handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        toast.success("Login successful!");
        router.push("/dashboard");
      }

      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || "Failed to login");
      toast.error(err.message);
    }
  };

  // Function to handle registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;

      toast.success(
        "Registration successful! Please check your email for verification.",
      );

      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/login");
      }, 3000);

      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || "Failed to register");
      toast.error(err.message);
    }
  };

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message || "Failed to login with Google");
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded">
        <div className="flex justify-center mb-4">
          <img src="/leaf-icon.png" alt="EcoTrack Logo" className="h-10" />
        </div>
        <h1 className="text-xl font-bold text-center mb-4">
          Welcome to EcoTrack
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Login or create an account to start your sustainability journey
        </p>

        {/* Google Sign In Button */}
        <Button 
          onClick={handleGoogleLogin} 
          className="w-full mb-4"
          variant="outline"
        >
          Sign in with Google
        </Button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Rest of your existing UI code remains the same */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 text-center py-2 ${
              isLogin ? "border-b-2 border-black font-bold" : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 text-center py-2 ${
              !isLogin ? "border-b-2 border-black font-bold" : "text-gray-500"
            }`}
          >
            Register
          </button>
        </div>

        {/* Login Form */}
        {isLogin && (
          <form onSubmit={handleLogin}>
            <label className="block mb-2">
              Email
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="block mb-4">
              Password
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <p className="text-center text-sm mt-4">
              
                href="#"
                onClick={() => router.push("/forgot-password")}
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </a>
            </p>
          </form>
        )}

        {/* Register Form */}
        {!isLogin && (
          <form onSubmit={handleRegister}>
            <label className="block mb-2">
              Email
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="block mb-2">
              Password
              <Input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label className="block mb-4">
              Confirm Password
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
        )}

        <p className="text-center text-gray-500 text-sm mt-4">
          By logging in or registering, you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
