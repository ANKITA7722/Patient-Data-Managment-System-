import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Dashboard from "./Dashboard/Dashboard";
import AddVisitors from "./component/Foms/AddVisitors"
import VisitorData from "./Dashboard/VisitorsData";
import Layout from "./Layout"; 
import AdminLogin from "./admin/adminLogin";
import AdminProfile from "./admin/AdminProfile";
import VisitorRecords from "./Dashboard/VisitorRecords";
import Settings from "./Dashboard/Settings";
import Logout from "./Dashboard/Logout";

const App = () => {
  return (
    <Router>
      <Routes>
       
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-profile" element={<AdminProfile />} />

        
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="addvisitors" element={<AddVisitors />} />
          <Route path="visitordata" element={<VisitorData />} />
          <Route path="visitorrecords" element={<VisitorRecords />} />
          <Route path="settings" element={<Settings/>} />
          <Route path="logout" element={<Logout/>} />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;







