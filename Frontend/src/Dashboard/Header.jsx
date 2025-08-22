
import React from "react";
import { FaBars } from "react-icons/fa";
import "../css/Dashboard/Header.css";
import AdminProfile from "../admin/AdminProfile";

const Header = ({ adminName, onLogout, onToggleSidebar }) => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        {/* Bars icon for mobile toggle */}
        {/* <button className="menu-btn" onClick={onToggleSidebar}>
          <FaBars />
        </button> */}
        <h2 className="logo">Hospital Admin Dashboard</h2>
      </div>

      <div className="header-right">
        <input
          type="text"
          placeholder="Search users..."
          className="search-input"
        />

         <AdminProfile/> 

        {/* <div className="admin-profile">
          <AdminProfile/> 
          </div>  */}
          </div>
    
    </header>
  );
};

export default Header;



