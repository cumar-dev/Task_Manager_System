import { Route, Routes } from "react-router-dom";
import RegisterPage from "./Pages/Auth/RegisterPage";
import LoginPage from "./Pages/Auth/LoginPage";
import HomePage from "./Pages/HomePage";
import DashboardPage from "./Pages/DashboardPage/DashboardPage";
import ProtectedRout from "./Pages/Auth/ProtectedRout";
import AdminPrtectedRout from "./Pages/Auth/AdminPrtectedRout";
import Admin from "./Pages/DashboardPage/Admin";
import ResetPassword from "./Pages/Auth/ResetPassword";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/home" element={<HomePage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRout>
            <DashboardPage />
          </ProtectedRout>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminPrtectedRout>
            <Admin />
          </AdminPrtectedRout>
        }
      />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
