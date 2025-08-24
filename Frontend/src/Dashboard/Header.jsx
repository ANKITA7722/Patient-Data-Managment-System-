import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../css/Dashboard/Header.css";
import AdminProfile from "../admin/AdminProfile";

const Header = ({ onToggleSidebar, isSidebarOpen, isMobileView }) => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button className="menu-btn" onClick={onToggleSidebar}>
          {isSidebarOpen ? <FaBars /> :  <FaTimes />}
        </button>
        <h2 className="logo">Hospital Admin Dashboard</h2>
      </div>

      <div className="header-right">
        <input type="text" placeholder="Search users..." className="search-input" />
        <AdminProfile />
      </div>
    </header>
  );
};

export default Header;


