import React, { useEffect } from "react";
import { useAuthStore } from "../../lib/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api/apiClient";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, LayoutDashboard, Loader, LoaderCircle, ShieldOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const AdminPrtectedRout = ({ children }) => {
  const { user, token, clearAuth, setAuth, isAuthenticated } = useAuthStore();
  console.log("Token:", token);
  console.log("User:", user);
  console.log("Authenticated:", isAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();
  const { data, error, isError, isSuccess, isLoading } = useQuery({
    queryKey: ["currentUser"],
    enabled: !!token, // Query only runs when token exists
    retry: 1,
    queryFn: async () => {
      console.log("token", token);
      // const response = await api.get("/auth/profile");
      const response = await api.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response 1:", response);
      console.log("response 2:", response.data);

      return response.data;
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      setAuth(data.user ?? data, token);
    }
  }, [data, isSuccess, setAuth, token]);

  useEffect(() => {
    if (isError) {
      return clearAuth();
    }
  }, [isError, clearAuth, error]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Verifying your account...
          </p>
        </div>
      </div>
    );
  }
  // No token
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (isError) {
    console.log("error here", isError);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user) {
    console.log("user not found", user);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== "admin") {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-4 overflow-hidden">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 via-background to-warning/10" />

      {/* Blur Effects */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-destructive/10 blur-3xl" />
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-warning/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <Card className="rounded-3xl border border-border bg-card/80 backdrop-blur-md shadow-xl">

          <CardHeader className="flex flex-col items-center text-center pt-10 pb-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 border border-destructive/20 mb-4">
              <ShieldOff className="text-destructive" size={32} />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              Access Denied
            </CardTitle>
            <CardDescription className="mt-2 text-sm text-muted-foreground text-center leading-relaxed">
              You don't have permission to view this page.
              This area is restricted to{" "}
              <span className="font-semibold text-foreground">admin users</span> only.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-3 pt-6">
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={16} className="mr-2" />
              Go Back
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/dashboard")}
            >
              <LayoutDashboard size={16} className="mr-2" />
              Go to Dashboard
            </Button>
          </CardContent>

          <CardFooter className="justify-center pb-8 pt-2">
            <p className="text-xs text-muted-foreground text-center">
              If you think this is a mistake, please contact your{" "}
              <span className="font-medium text-foreground">system administrator</span>.
            </p>
          </CardFooter>

        </Card>
      </div>
    </div>
  );
}
  return children;
};

export default AdminPrtectedRout;
