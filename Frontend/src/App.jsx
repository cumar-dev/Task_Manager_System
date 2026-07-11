import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./lib/store/authStore";

import RegisterPage from "./Pages/Auth/RegisterPage";
import LoginPage from "./Pages/Auth/LoginPage";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";

import HomePage from "./Pages/HomePage";
import Admin from "./Pages/DashboardPage/Admin";

import ProtectedRout from "./Pages/Auth/ProtectedRout";
import AdminPrtectedRout from "./Pages/Auth/AdminPrtectedRout";


import ProfilePage from "./Pages/DashboardPage/ProfilePage";
import DashboardLayout from "./Pages/DashboardLayout";
import OverviewPage from "./Pages/DashboardPage/OverviewPage";
import AllTasksPage from "./Pages/DashboardPage/AllTasksPage";
import Header from "./Pages/Header";



const noHeaderRoutes = ["/login", "/register", "/forget-password"];

function Layout({ children }) {
  const location = useLocation();

  const hideHeader =
    noHeaderRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/reset-password");

  return (
    <>
      {!hideHeader && <Header />}
      {children}
     
    </>
  );
}

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Layout>
      <Routes>
        {/* Root */}
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRout>
              <HomePage />
            </ProtectedRout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRout>
              <DashboardLayout />
            </ProtectedRout>
          }
        >
          <Route index element={<OverviewPage />} />
          <Route path="tasks" element={<AllTasksPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route
          path="/profile"
          element={
            <ProtectedRout>
              <ProfilePage />
            </ProtectedRout>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <AdminPrtectedRout>
              <Admin />
            </AdminPrtectedRout>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
