import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../lib/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { KeyRound, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { resetPassword, loading, message, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(token, password);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-4 py-10 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-info/10" />

      {/* Blur Effects */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-info/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <Card className="rounded-3xl border border-border bg-card/80 backdrop-blur-md shadow-xl">
          <CardHeader className="flex flex-col items-center text-center pt-10 pb-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-4">
              <KeyRound className="text-primary" size={28} />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              Reset Password
            </CardTitle>
            <CardDescription className="mt-2 text-sm text-muted-foreground text-center leading-relaxed">
              Enter your new password below to reset your account password.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {message && (
                <Alert className="border-green-500/50 bg-green-500/10">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-600 text-sm">
                    {message}
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert className="border-destructive/50 bg-destructive/10">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <AlertDescription className="text-destructive text-sm">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center pb-8 pt-2">
            <p className="text-sm text-muted-foreground text-center">
              Remember your password?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                Back to Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
