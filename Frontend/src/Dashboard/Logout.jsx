import React from 'react';
import { ChevronLeft, User } from 'lucide-react';
import '../css/Dashboard/Logout.css'; // Import external CSS file


const Logout = ({ title = "Settings", backEnabled = false, setCurrentPage, handleLogout }) => {
  // Safeguard if props are missing
  const goBack = () => {
    if (setCurrentPage) setCurrentPage("dashboard");
  };

  const logoutNow = () => {
    if (handleLogout) {
      handleLogout();
    } else {
      alert("Logged out successfully!");
    }
  };

  return (
    <div className="logout-header">
      {/* Left side: Back button + Title */}
      <div className="logout-header-left">
        {backEnabled && (
          <button onClick={goBack} className="back-btn">
            <ChevronLeft size={24} className="back-icon" />
          </button>
        )}
        <h1 className="logout-title">{title}</h1>
      </div>

      {/* Right side: User icon + Logout button */}
      <div className="logout-header-right">
        <div className="user-circle">
          <User size={24} className="user-icon" />
        </div>
        <button onClick={logoutNow} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
