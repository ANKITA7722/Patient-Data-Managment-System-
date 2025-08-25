// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // Components / Pages
// import Dashboard from "./Dashboard/Dashboard";
// import UserRegistration from "./component/Foms/UserRegistration";
// import UsersTable from "./Dashboard/UsersTable";
// import Sidebar from "./Dashboard/Sidebar";
// import Layout from "./Layout"; // ✅ Corrected

// const App = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   return (
//     <Router>
//       <div style={{ display: "flex" }}>
//         {/* Sidebar */}
//         <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

//         {/* Main Content Area */}
//         <div style={{ flex: 1, padding: "20px" }}>
//           <Routes>
//             <Route path="/" element={<Layout />} /> {/* Default Home */}
//             <Route index element={<Dashboard />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/userregistration" element={<UserRegistration />} />
//             <Route path="/usertable" element={<UsersTable />} />
//             {/* <Route path="/logout" element={<Logout />} /> */}
//             <Route path="*" element={<p>Page Not Found</p>} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;

//======================================================================

//Secound code

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components / Pages
import Dashboard from "./Dashboard/Dashboard";
import UserRegistration from "./component/Foms/UserRegistration";
import UsersTable from "./Dashboard/UsersTable";
import Layout from "./Layout"; // Layout includes Sidebar + Header + Outlet
import AdminLogin from "./admin/adminLogin";
import AdminProfile from "./admin/AdminProfile";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes outside Layout (No sidebar/header) */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-profile" element={<AdminProfile />} />

        {/* Routes with Layout (includes Sidebar + Header) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="userregistration" element={<UserRegistration />} />
          <Route path="usertable" element={<UsersTable />} />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

// //=======================================================================

