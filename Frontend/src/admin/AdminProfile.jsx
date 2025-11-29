import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Admin/AdminProfile.css";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

const AdminProfile = () => {
  const [adminName, setAdminName] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const menuRef = useRef();
  const navigate = useNavigate();

  // ✅ GET ADMIN FROM SESSION
  useEffect(() => {
    const adminData = sessionStorage.getItem("admin");

    if (adminData) {
      const admin = JSON.parse(adminData);
      setAdminName(admin.name); // ✅ show real admin name
    } else {
      navigate("/admin-login"); // ✅ safeguard
    }
  }, [navigate]);


  // ✅ LOGOUT
  const handleLogout = () => {
    sessionStorage.removeItem("admin");
    setMessage("Admin logged out successfully!");

    setTimeout(() => {
      setMessage("");
      navigate("/admin-login");
    }, 1200);
  };


  // ✅ CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div className="profile-container" ref={menuRef}>

      {/* Profile trigger */}
      <div
        className="profile-trigger"
        onClick={() => setOpen(!open)}
      >
        <img
          src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg"
          alt="Admin"
          className="profile-img"
        />

        <span className="profile-name">
          {adminName || "Admin"}
        </span>
      </div>


      {/* Dropdown */}
      {open && (
        <div className="profile-dropdown">
          <div className="welcome">WELCOME!</div>

          <ul>
            <li>
              <FaUser className="icon" /> {adminName}
            </li>

            <li onClick={handleLogout} className="logout">
              <FaSignOutAlt className="icon" /> Logout
            </li>
          </ul>
        </div>
      )}

      {message && (
        <p className="logout-message">{message}</p>
      )}

    </div>
  );
};

export default AdminProfile;
