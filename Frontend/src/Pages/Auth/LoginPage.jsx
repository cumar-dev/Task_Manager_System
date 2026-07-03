import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

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
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/api/apiClient";
import { extractErrorMessages } from "../../../utils/errorUtils";
import { toast } from "sonner";
import { useAuthStore } from "../../lib/store/authStore";
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const { setAuth, user, token } = useAuthStore();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const logInMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      if (!data?.token) return;

      const user = data.user;
      const token = data.token;
      if (!token) return;
      setAuth(user, token);

      if (rememberMe) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));

        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }

      toast.success("Login successful!");

      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("error", error);
      setError(extractErrorMessages(error));
    },
  });

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    const user = localStorage.getItem("user") || sessionStorage.getItem("user");

    if (token && user) {
      setAuth(JSON.parse(user), token);
      navigate("/dashboard");
    }
  }, [navigate, setAuth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValues.email || !formValues.password) {
      setError("All fields are required");
      toast.error("Please fill all fields.");
      return;
    }
    console.log("LoginInfo", formValues);
    logInMutation.mutate({
      email: formValues.email,
      password: formValues.password,
    });
    toast.success("login be successfully");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f6f6] px-4">
      {/* Card */}
      <Card className="w-full max-w-md shadow-xl border border-gray-200 rounded-2xl bg-white">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto h-12 w-12 rounded-xl bg-black text-white flex items-center justify-center">
            ✓
          </div>

          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>

          <CardDescription>
            Sign in to continue managing your tasks
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 mb-4">
              <p className="text-sm font-medium text-destructive">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                name="email"
                placeholder="omar@example.com"
                type="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Password</Label>

                <Link
                  to="/forget-password"
                  className="text-sm text-gray-500 hover:text-black"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pr-10"
                  value={formValues.password}
                  onChange={handleChange}
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
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>

            {/* Button */}
            <Button type="submit" className="w-full">
              {isloading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Login account...
                </span>
              ) : (
                "Sign in"
              )}
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
