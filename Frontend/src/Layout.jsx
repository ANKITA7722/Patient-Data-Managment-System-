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


import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Dashboard/Sidebar";
import Header from "./Dashboard/Header";

import "./css/Layout.css";

// const Layout = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isMobileView, setIsMobileView] = useState(false);
//    const [currentPage, setCurrentPage] = useState('dashboard');

//     const handleLogout = () => {
//     alert('Logged out successfully!');
//   };

//   // Track window width and update isMobileView & sidebar visibility
//   useEffect(() => {
//     const handleResize = () => {
//       const isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed
//       setIsMobileView(isMobile);
//       if (isMobile) {
//         setIsOpen(false); // hide sidebar on mobile by default
//       } else {
//         setIsOpen(true); // show sidebar on desktop
//       }
//     };

//     handleResize(); // Initialize on mount

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Toggle sidebar open/close
//   const toggleSidebar = () => setIsOpen((prev) => !prev);

//   return (
//     <> 
//     <div className={`layout-container ${isOpen ? "" : "no-sidebar"}`}>
//       {/* Sidebar */}
//       <aside className={`sidebar ${isOpen ? "" : "closed"}`}>
//         <Sidebar />
//       </aside>

//       {/* Main content */}
//       <div className="main-content">
//         <header className="header">
//           <Header
//             onToggleSidebar={toggleSidebar}
//             isSidebarOpen={isOpen}
//             isMobileView={isMobileView}
//           />
//         </header>
        
//         <div className="page-content">
          
//           <Outlet />
//         </div>
//       </div>
//     </div>
//      <div>
//       <Header
//         title="Settings"
//         backEnabled={true}
//         setCurrentPage={setCurrentPage}
//         handleLogout={handleLogout}
//       />
//       <p>Welcome to your dashboard page!</p>
//     </div>
//     </>
//   );
// };

// export default Layout;


// import React, { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "./Dashboard/Sidebar";
// import Header from "./Dashboard/Header";
// import "./css/Layout.css";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleLogout = () => {
    alert("Logged out successfully!");
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsMobileView(isMobile);
      setIsOpen(!isMobile); // hide on mobile, show on desktop
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className={`layout-container ${isOpen ? "" : "no-sidebar"}`}>
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "" : "closed"}`}>
        <Sidebar />
      </aside>

      {/* Main Content */}
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

        {/* Dynamic Content */}
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;















