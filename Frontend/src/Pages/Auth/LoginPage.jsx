import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f6f6] px-4">

      {/* Card */}
      <Card className="w-full max-w-md shadow-xl border border-gray-200 rounded-2xl bg-white">

        <CardHeader className="text-center space-y-3">
          <div className="mx-auto h-12 w-12 rounded-xl bg-black text-white flex items-center justify-center">
            ✓
          </div>

          <CardTitle className="text-3xl font-bold">
            Welcome Back
          </CardTitle>

          <CardDescription>
            Sign in to continue managing your tasks
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input placeholder="omar@example.com" type="email" />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Password</Label>

                <Link
                  to="/forgot-password"
                  className="text-sm text-gray-500 hover:text-black"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center gap-2">
              <Checkbox
                checked={rememberMe}
                onCheckedChange={setRememberMe}
              />
              <label className="text-sm text-gray-600">
                Remember me
              </label>
            </div>

            {/* Button */}
            <Button className="w-full bg-black text-white hover:bg-gray-900 rounded-xl">
              Sign In
            </Button>

          </form>
        </CardContent>

        <CardFooter className="flex justify-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="ml-1 text-black font-medium hover:underline"
          >
            Create Account
          </Link>
        </CardFooter>

      </Card>
    </div>
  );
};

export default LoginPage;