import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase/firebase"; // Adjust the path as needed
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { updateEmail, updateProfile } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setDisplayName(user.displayName || "");
      setEmail(user.email || "");
    } else {
      router.push("/login"); // Redirect if not logged in
    }
  }, [router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, { displayName });
        await updateEmail(user, email);
        toast.success("Profile updated successfully!");
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      toast.error(err.message || "Failed to update profile");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded">
        <h1 className="text-xl font-bold text-center mb-4">Your Profile</h1>
        <form onSubmit={handleUpdate}>
          <label className="block mb-2">
            Display Name
            <Input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </label>
          <label className="block mb-4">
            Email
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </label>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
