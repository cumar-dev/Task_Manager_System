import { Route, Routes } from "react-router-dom";
import RegisterPage from "./Pages/Auth/RegisterPage";
import LoginPage from "./Pages/Auth/LoginPage";
import HomePage from "./Pages/HomePage";
import DashboardPage from "./Pages/DashboardPage/DashboardPage";
import ProtectedRout from "./Pages/Auth/ProtectedRout";
import AdminPrtectedRout from "./Pages/Auth/AdminPrtectedRout";
import Admin from "./Pages/DashboardPage/Admin";
function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
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
      <Route path="/home" element={<HomePage />}/>
    </Routes>
  );
}

export default App;
