import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Dashboard/Sidebar";
import Header from "./Dashboard/Header";

import "./css/Layout.css";


const Layout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleLogout = () => {
    alert("Logged out successfully!");
  };


  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsMobileView(isMobile);
      setIsOpen(!isMobile); 
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className={`layout-container ${isOpen ? "" : "no-sidebar"}`}>
     
      <aside className={`sidebar ${isOpen ? "" : "closed"}`}>
        <Sidebar />
      </aside>

      <div className="main-content">
        <header className="header">
          <Header
            title={currentPage === "dashboard" ? "Dashboard" : "Settings"}
            backEnabled={currentPage !== "dashboard"}
            setCurrentPage={setCurrentPage}
            handleLogout={handleLogout}
            onToggleSidebar={toggleSidebar}
            isSidebarOpen={isOpen}
            isMobileView={isMobileView}
          />
        </header>

        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;















