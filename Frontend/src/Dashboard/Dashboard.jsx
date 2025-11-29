import React, { useEffect, useState } from "react";
import UsersTable from "./VisitorsData";
import "../css/Dashboard/Dashboard.css";
import { FaUserFriends, FaHospital, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

//import AdminProfile from "../admin/AdminProfile";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
const navigate = useNavigate();
  // const adminName = "Admin"; // You can make this dynamic

  const [adminName, setAdminName] = useState("Admin User"); // ✅ login ke baad set hoga
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch users from JSON
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);


  // const handleAddUser = () => {
  //   navigate("/userregistration");
  // };


  const handleAddUser = (e) => {
   e.preventDefault();
  navigate("/addvisitors");
};


const handleViewRecords = (e) => {
   e.preventDefault();
  navigate("/visitorrecords");
};



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
      
      
      <div className="main-content">
        
       
        <div className="dashboard-cards">
          {/* Total Users */}
          <div className="card card-1">
            <div className="card-left">
              <h3>Total Visitors</h3>
              <button onClick={handleAddUser}>Add Visitor</button>
            </div>
            <div className="card-right">
              <div className="circle">{users.length}</div>
            </div>
          </div>

          {/* Ashoka Garden */}
          <div className="card card-2">
            <div className="card-left">
              <h3>Visitor Records</h3>
              <button onClick={handleViewRecords}>View Records</button>
            </div>
            <div className="card-right">
              <div className="circle">
                <FaHospital />
              </div>
            </div>
          </div>



          {/* Awadh Puri */}
          <div className="card card-3">
            <div className="card-left">
              <h3>Awadh Puri</h3>
              <button onClick={handleAddUser}>Add User</button>
            </div>
            <div className="card-right">
              <div className="circle">
                <FaUserFriends />
              </div>
            </div>
          </div>


          {/* Messages */}
          <div className="card card-4">
            <div className="card-left">
              <h3>Messages Sent</h3>
              <button onClick={handleAddUser}>Add User</button>
            </div>
            <div className="card-right">
              <div className="circle">
                <FaEnvelope />
              </div>
            </div>
          </div>
        

        </div>

        <UsersTable users={users} />
        
      </div>

      {/* <div>
      <AdminProfile adminName={adminName} onLogout={handleLogout} />
      {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}
    </div> */}


    </div>
  );
};

export default Dashboard;

