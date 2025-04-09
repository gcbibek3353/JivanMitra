"use client";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useFirebase } from "@/firebase/firebaseConfig";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[loading,setLoading]=useState(false)
  const router = useRouter();
  const { signInWithEmail, signInWithGoogle, signInWithGithub } = useFirebase();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // important!
    if (!email || !password) {
      toast.error("Fill in both fields");
      return;
    }
    setLoading(true)
    try {
      await signInWithEmail(email, password);
      console.log('control here');
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Email sign-in failed");
    } finally{
      setLoading(false)
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Google sign-in failed");
    }
  };

  const handleGithubLogin = async () => {
    try {
      await signInWithGithub();
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "GitHub sign-in failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-black">Login</h2>
        <p className="text-sm text-center text-gray-500 mt-1">
          Access your account by logging in below
        </p>

        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={handleGithubLogin}
            className="w-full border border-gray-300 rounded-lg py-2 flex justify-center items-center gap-2 hover:bg-gray-100"
          >
            <FaGithub className="text-xl" />
            GitHub
          </button>
          <button
            onClick={handleGoogleLogin}
            className="w-full border border-gray-300 rounded-lg py-2 flex justify-center items-center gap-2 hover:bg-gray-100"
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

        <form className="space-y-4" onSubmit={handleEmailLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
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

          <div className="flex justify-between text-sm text-gray-500">
            <label className="flex items-center gap-1">
              <input type="checkbox" className="accent-indigo-600" />
              Remember me
            </label>
            <a href="#" className="text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
          type="submit"
          disabled={loading}
          className={`w-full bg-indigo-600 text-white py-2 rounded-lg transition-all ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-indigo-700"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"
                ></path>
              </svg>
              Logging in...
            </div>
          ) : (
            "Log in"
          )}
        </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
