import React from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTachometerAlt, FaUsers, FaSignInAlt, FaUserPlus, FaSignOutAlt,FaCog, } from "react-icons/fa";
import "../css/Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {

  const handleLogout = () => {
    sessionStorage.removeItem("admin"); // remove admin session
    alert("Admin logged out successfully!");
    navigate("/admin-login"); // redirect to login page
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>Hospital Dashboard</h2>
      </div>

      <ul>
        <li>
          <Link to="/dashboard" onClick={toggleSidebar}>
            <FaTachometerAlt className="menu-icon" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/visitordata" onClick={toggleSidebar}>
            <FaUsers className="menu-icon" /> Visitor Data
          </Link>
        </li>
        <li>
          <Link to="/admin-login" onClick={toggleSidebar}>
            <FaSignInAlt className="menu-icon" /> Login
          </Link>
        </li>
        <li>
          <Link to="/userregistration" onClick={toggleSidebar}>
            <FaUserPlus className="menu-icon" /> Registration
          </Link>
        </li>
        <li>
          <Link to="/logout"  onClick={handleLogout}>
            <FaSignOutAlt className="menu-icon" /> Logout
          </Link>
        </li>
        <li>
          <Link to="/settings" onClick={toggleSidebar}>
            <FaCog className="menu-icon" /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;



