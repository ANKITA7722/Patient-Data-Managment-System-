

// import React from "react";
// import { Link } from "react-router-dom";
// import { FaBars } from "react-icons/fa";
// import "../css/Sidebar.css";

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   return (
//     <div className={`sidebar ${isOpen ? "open" : ""}`}>
//       <div className="sidebar-header">
//         <h2>Hospital Dashboard</h2>
//         {/* <button className="menu-btn" onClick={toggleSidebar}>
//           <FaBars />
//         </button> */}
//       </div>

//       <ul>
//         <li><Link to="/dashboard" onClick={toggleSidebar}>Dashboard</Link></li>
//         <li><Link to="/usertable" onClick={toggleSidebar}>Users Data</Link></li>
//         <li><Link to="/admin-login" onClick={toggleSidebar}>Login</Link></li>
//         <li><Link to="/userregistration" onClick={toggleSidebar}>Registration</Link></li>
//         <li><Link to="/logout" onClick={toggleSidebar}>Logout</Link></li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;


import React from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTachometerAlt, FaUsers, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import "../css/Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
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
          <Link to="/usertable" onClick={toggleSidebar}>
            <FaUsers className="menu-icon" /> Users Data
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
          <Link to="/logout" onClick={toggleSidebar}>
            <FaSignOutAlt className="menu-icon" /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;



