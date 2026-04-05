"use client";

import { useState } from "react";
import UnitManagementContent from "@/components/unit-management/UnitManagementContent";
import Sidebar from "@/components/layout/Sidebar";
import UnitManagementNavbar from "@/components/unit-management/UnitManagementNavbar";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="relative flex min-h-screen bg-gray-100">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div
        className={`fixed inset-0 z-40 md:hidden ${
          isSidebarOpen ? "" : "pointer-events-none"
        }`}
        aria-hidden={!isSidebarOpen}
      >
        <div
          onClick={closeSidebar}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`relative h-full w-64 transform transition-transform duration-300 ease-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar mobile onClose={closeSidebar} />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <UnitManagementNavbar onMenuClick={openSidebar} />
        <UnitManagementContent />
      </div>
    </div>
  );
}
