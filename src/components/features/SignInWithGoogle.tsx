// src/components/features/SignInWithGoogle.tsx
"use client";
import { supabase } from "@/utils/supabase"; // Changed import

export default function SignInWithGoogle() {
  const handleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="flex items-center justify-center bg-white text-gray-700 font-semibold py-2 px-4 rounded-full border border-gray-300 hover:bg-gray-100 transition duration-300 ease-in-out"
    >
      <img 
        src="/google.svg" 
        alt="Google logo" 
        className="w-6 h-6 mr-2" 
      />
      Sign in with Google
    </button>
  );
}