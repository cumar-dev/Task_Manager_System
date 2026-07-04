import React, { useEffect } from "react";
import { useAuthStore } from "../../lib/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api/apiClient";
import { Navigate, useLocation } from "react-router-dom";
import { Loader, LoaderCircle } from "lucide-react";
const ProtectedRout = ({ children }) => {
  const { user, token, clearAuth, setAuth, isAuthenticated } = useAuthStore();
  console.log("Token:", token);
  console.log("User:", user);
  console.log("Authenticated:", isAuthenticated);
  const location = useLocation();

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
      clearAuth();
    }
  }, [isError, clearAuth, error]);

  // No token

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
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

  const storedToken =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!storedToken) {
    return <Navigate to="/login" replace />;
  }

  if (isError) {
    console.log("error here", isError);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user) {
    console.log("user not found", user);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRout;
