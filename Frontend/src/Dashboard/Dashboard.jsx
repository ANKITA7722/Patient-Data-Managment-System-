import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import UsersTable from "./UsersTable";
import "../css/Dashboard/Dashboard.css";
//import AdminProfile from "../admin/AdminProfile";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  // const adminName = "Admin"; // You can make this dynamic

  const [adminName, setAdminName] = useState("Admin User"); // ✅ login ke baad set hoga
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch users from JSON
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  // const handleLogout = () => {
  //   window.location.href = "/admin-login";
  // };

  const handleLogout = () => {
    setAdminName(""); // ✅ logout hone par naam hatao
    setMessage("Admin logged out successfully!");
    sessionStorage.removeItem("admin"); // ✅ session clear

    setTimeout(() => setMessage(""), 3000); // ✅ 3 sec baad message hide
  };



  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const ashokaCount = users.filter((u) => u.branch === "Ashoka Garden").length;
  const awadhCount = users.filter((u) => u.branch === "Awadh Puri").length;

  return (
    <div className="dashboard-container">
      {/* <button className="menu-btn" onClick={toggleSidebar}>
        ☰
      </button> */}
      {/* <Sidebar isOpen={isOpen} /> */}
      <div className="main-content">
        {/* <Header adminName={adminName} onLogout={handleLogout} /> */}
       
        <div className="dashboard-cards">
          <div className="card">Total Users: {users.length}</div>
          <div className="card">Ashoka Garden: {ashokaCount}</div>
          <div className="card">Awadh Puri: {awadhCount}</div>
          <div className="card">Messages Sent: 0</div>
        </div>

        <UsersTable users={users} />
        
      </div>

      {/* <div>
      <AdminProfile adminName={adminName} onLogout={handleLogout} />
      {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}
    </div> */}

<h1> hii i am ankita </h1>
    </div>
  );
};

export default Dashboard;