// import React, { useState, useEffect, useRef } from "react";
// import "../css/Admin/AdminProfile.css"; 


// import {
//   FaUser,
//   FaCog,
//   FaCalendarAlt,
//   FaLifeRing,
//   FaSignOutAlt,
// } from "react-icons/fa";


// const ProfileMenu = ({ adminName, onLogout }) => {
//   const [open, setOpen] = useState(false);
//   const menuRef = useRef();

//   // close on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="profile-container" ref={menuRef}>
//       {/* Profile top */}
//       <div className="profile-trigger" onClick={() => setOpen(!open)}>
//         <img
//           src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg"
//         //   alt="Admin"
//           className="profile-img"
//         />
//         <span className="profile-name">{adminName}</span>
//       </div>

//       {/* Dropdown */}
//       {open && (
//         <div className="profile-dropdown">
//           <div className="welcome">WELCOME!</div>
//           <ul>
//             <li>
//               <FaUser className="icon" /> My Profile
//             </li>
//             <li>
//               <FaCog className="icon" /> Settings
//             </li>
//             <li>
//               <FaCalendarAlt className="icon" /> Activity
//             </li>
//             <li>
//               <FaLifeRing className="icon" /> Support
//             </li>
//             <li onClick={onLogout} className="logout">
//               <FaSignOutAlt className="icon" /> Logout
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileMenu;

import React, { useState, useEffect, useRef } from "react";
import "../css/Admin/AdminProfile.css";
import {
  FaUser,
  FaCog,
  FaCalendarAlt,
  FaLifeRing,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminProfile = ({ adminName, onLogout }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="profile-container" ref={menuRef}>
      {/* Profile top */}
      <div className="profile-trigger" onClick={() => setOpen(!open)}>
        <img
          src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg"
          alt="Admin"
          className="profile-img"
        />
        {adminName && <span className="profile-name">{adminName}</span>}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="profile-dropdown">
          <div className="welcome">WELCOME!</div>
          <ul>
            <li>
              <FaUser className="icon" /> My Profile
            </li>
            <li>
              <FaCog className="icon" /> Settings
            </li>
            <li>
              <FaCalendarAlt className="icon" /> Activity
            </li>
            <li>
              <FaLifeRing className="icon" /> Support
            </li>
            <li
              onClick={() => {
                onLogout();
                setOpen(false);
              }}
              className="logout"
            >
              <FaSignOutAlt className="icon" /> Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;


