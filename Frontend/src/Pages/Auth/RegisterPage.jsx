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
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-4 py-10 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />

      {/* Blur Effects */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <Card className="rounded-3xl border border-border bg-card/80 backdrop-blur-md shadow-xl">
          <CardHeader className="flex flex-col items-center mb-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              ✓
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-muted-foreground text-center">
              Create your Task Manager account and start organizing your work.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Omar Ahmed"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="omar@example.com"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    className="pr-10"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirm Password
                </Label>

                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={
                      showConfirmPassword ? "text" : "password"
                    }
                    placeholder="********"
                    className="pr-10"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onCheckedChange={(checked) =>
                    setAgreed(checked === true)
                  }
                />

                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  I agree to the{" "}
                  <span className="text-primary hover:underline">
                    Terms
                  </span>{" "}
                  and{" "}
                  <span className="text-primary hover:underline">
                    Privacy Policy
                  </span>
                </label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full"
                disabled={!agreed}
              >
                Create Account
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center pb-6">
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;