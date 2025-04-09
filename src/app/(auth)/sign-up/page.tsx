"use client";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useFirebase } from "@/firebase/firebaseConfig";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const firebase = useFirebase();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      await firebase.signUpWithEmail(email, password);
      toast.success("You have successfully signed up");
      router.push("/sign-in");
    } catch (err: any) {
      toast.error(err.message || "Signup failed");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await firebase.signInWithGoogle();
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Google sign-in failed");
    }
  };

  const handleGithubSignup = async () => {
    try {
      await firebase.signInWithGithub();
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "GitHub sign-in failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-black">
          Welcome to Jeevan Mitra
        </h2>
        <p className="text-sm text-center text-gray-500 mt-1">
          Please enter your details to sign up
        </p>

        <div className="flex items-center gap-4 mt-6">
          <button
            className="w-full border border-gray-300 rounded-lg py-2 flex justify-center items-center gap-2 hover:bg-gray-100"
            onClick={handleGithubSignup}
          >
            <FaGithub className="text-xl" />
            GitHub
          </button>
          <button
            className="w-full border border-gray-300 rounded-lg py-2 flex justify-center items-center gap-2 hover:bg-gray-100"
            onClick={handleGoogleSignup}
          >
            <FcGoogle className="text-xl" />
            Google
          </button>
        </div>

        <div className="flex items-center gap-2 my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <form className="space-y-4" >
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? "🙈" : "👁️"}
            </button>
          </div>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            placeholder="Enter your age"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            type="number"
            placeholder="Enter your height (in cm)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />

          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <button
            type="submit"
            onClick={handleSignup}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all"
          >
            Sign up
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/sign-in" className="text-indigo-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
