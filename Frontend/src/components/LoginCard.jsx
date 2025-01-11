import React, { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserContext } from "../context/UserContext";
import { useSelector } from "react-redux"; // Add this to access theme from Redux store
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const theme = useSelector((state) => state.theme.theme); // Get theme from Redux store
  const navigate = useNavigate();

  async function login(e) {
    if (e) e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill out all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/v1/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Email or password does not match");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return;
      }

      const userInfo = await response.json();
      setUserInfo(userInfo);
      toast.success("Login successful! Redirecting to homepage...");

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  const handleTestLogin = () => {
    setEmail("testuser2025@gmail.com");
    setPassword("12345678");
  };

  return (
    <div className="w-full max-w-md space-y-6 px-4 sm:px-8 lg:px-12">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-orange-500 text-center">LOG IN</h1>

      <form className="space-y-6" onSubmit={login}>
        {/* Email Field */}
        <div className="flex flex-col">
          <Label
            htmlFor="email"
            className={`text-sm mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-800"
            }`}
          >
            Sign in with email address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            className={`rounded-full px-4 py-3 focus:ring-2 focus:ring-orange-500 text-sm md:text-base ${
              theme === "dark"
                ? "bg-[#2a1a3e] text-white placeholder-gray-400"
                : "bg-gray-100 text-gray-900 placeholder-gray-500"
            }`}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col relative">
          <Label
            htmlFor="password"
            className={`text-sm mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-800"
            }`}
          >
            Enter password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter password"
              className={`rounded-full px-4 py-3 focus:ring-2 focus:ring-orange-500 text-sm md:text-base w-full pr-12 ${
                theme === "dark"
                  ? "bg-[#2a1a3e] text-white placeholder-gray-400"
                  : "bg-gray-100 text-gray-900 placeholder-gray-500"
              }`}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-orange-500"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 font-bold"
        >
          Log in
        </Button>
      </form>

      {/* Test Login */}
      <div className="text-center text-sm text-gray-400 mt-6">
        Or use the test login
      </div>
      <Button
        onClick={handleTestLogin}
        className="w-full bg-gray-500 hover:bg-gray-600 text-white rounded-full py-3 font-bold"
      >
        Test Login
      </Button>

      {/* Footer */}
      <p
        className={`text-center text-xs mt-6 ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}
      >
        By logging in, you agree to our{" "}
        <span className="underline">Terms and Conditions</span>.
      </p>
    </div>
  );
};

export default LoginCard;
