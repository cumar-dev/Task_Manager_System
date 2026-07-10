import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./../components/Layout/Sidebar";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#F1F5F9] overflow-hidden">

      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white">
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;