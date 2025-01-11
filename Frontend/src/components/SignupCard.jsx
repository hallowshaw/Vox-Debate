import React, { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const SignupCard = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function signup(e) {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill out all fields", { autoClose: 2000 });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { autoClose: 2000 });
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/users/register`,
        { name: username, email, password },
        { withCredentials: true }
      );

      if (response.data) {
        setUserInfo(response.data);
        toast.success("Signup successful! Redirecting to homepage...", {
          autoClose: 2000,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred. Please try again.", {
        autoClose: 2000,
      });
    }
  }

  return (
    <div className="w-full max-w-md space-y-6 px-4 sm:px-8 lg:px-12">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-orange-500 text-center mb-4">
        SIGN UP
      </h1>
      <form className="space-y-6" onSubmit={signup}>
        {/* Username Field */}
        <div className="flex flex-col">
          <Label
            htmlFor="username"
            className="text-sm mb-2 text-gray-700 dark:text-gray-300"
          >
            Choose a username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-full px-4 py-3 bg-white dark:bg-[#2a1a3e] text-gray-700 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 text-sm md:text-base"
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col">
          <Label
            htmlFor="email"
            className="text-sm mb-2 text-gray-700 dark:text-gray-300"
          >
            Enter a valid email address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-full px-4 py-3 bg-white dark:bg-[#2a1a3e] text-gray-700 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 text-sm md:text-base"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col relative">
          <Label
            htmlFor="password"
            className="text-sm mb-2 text-gray-700 dark:text-gray-300"
          >
            Enter password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-full px-4 py-3 bg-white dark:bg-[#2a1a3e] text-gray-700 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 text-sm md:text-base w-full pr-12"
              autoComplete="off"
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

        {/* Confirm Password Field */}
        <div className="flex flex-col relative">
          <Label
            htmlFor="confirm-password"
            className="text-sm mb-2 text-gray-700 dark:text-gray-300"
          >
            Confirm password
          </Label>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              placeholder="Re-enter password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="rounded-full px-4 py-3 bg-white dark:bg-[#2a1a3e] text-gray-700 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 text-sm md:text-base w-full pr-12"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-orange-500"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Signup Button */}
        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 font-bold"
        >
          Sign up
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-xs text-gray-700 dark:text-gray-400 mt-6">
        By registering, you agree to our{" "}
        <span className="underline">Terms and Conditions</span>.
      </p>
    </div>
  );
};

export default SignupCard;
