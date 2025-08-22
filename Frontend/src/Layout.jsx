// import React from "react";
// import { Outlet } from "react-router-dom";

// import "./css/Layout.css"
// import Sidebar from "./Dashboard/Sidebar";
// import Header from "./Dashboard/Header";

// const Layout = () => {
//   return (
//     <div className="layout-container">

//       {/* Sidebar */}
//       <aside className="sidebar">
//         <Sidebar />
//       </aside>

//       {/* Right Side (Header + Content) */}
//       <div className="main-content">
//         <header className="header">
//           <Header/>
//         </header>

//         {/* Changing Content */}
//         <div className="page-content">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./css/Layout.css";

import Sidebar from "./Dashboard/Sidebar";
import Header from "./Dashboard/Header";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`layout-container ${isOpen ? "" : "no-sidebar"}`}>
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "" : "closed"}`}>
        <Sidebar />
      </aside>

      {/* Toggle Button always visible */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "⮜" : "☰"}
      </button>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <Header />
        </header>

        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
