// import React, { useState } from "react";
// import "../css/Dashboard/Settings.css"; // Import normal CSS

// function Settings() {
//   // ✅ State variables
//   const [branches, setBranches] = useState([]);
//   const [newBranchName, setNewBranchName] = useState("");
//   const [newBranchShortName, setNewBranchShortName] = useState("");
//   const [editBranchId, setEditBranchId] = useState(null);

//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");

//   // ✅ FIX: initialize message as object, not undefined
//   const [message, setMessage] = useState({ text: "", type: "" });

//   // ✅ Helper function to clear message
//   const clearMessage = () => setMessage({ text: "", type: "" });

//   // ✅ Header rendering function
//   const renderHeader = (title, showBack = false) => (
//     <header className="header">
//       {showBack && (
//         <button className="back-btn" onClick={() => window.history.back()}>
//           ← Back
//         </button>
//       )}
//       <h1>{title}</h1>
//     </header>
//   );

//   // ✅ Branch handlers
//   const handleAddBranch = () => {
//     if (!newBranchName || !newBranchShortName) {
//       setMessage({ text: "Please fill all fields.", type: "error" });
//       return;
//     }

//     const newBranch = {
//       id: Date.now(),
//       name: newBranchName,
//       code: newBranchShortName,
//     };
//     setBranches([...branches, newBranch]);
//     setNewBranchName("");
//     setNewBranchShortName("");
//     setMessage({ text: "Branch added successfully!", type: "success" });
//   };

//   const handleEditBranch = (id) => {
//     const branch = branches.find((b) => b.id === id);
//     setNewBranchName(branch.name);
//     setNewBranchShortName(branch.code);
//     setEditBranchId(id);
//   };

//   const handleUpdateBranch = () => {
//     setBranches(
//       branches.map((b) =>
//         b.id === editBranchId
//           ? { ...b, name: newBranchName, code: newBranchShortName }
//           : b
//       )
//     );
//     setEditBranchId(null);
//     setNewBranchName("");
//     setNewBranchShortName("");
//     setMessage({ text: "Branch updated successfully!", type: "success" });
//   };

//   const handleDeleteBranch = (id) => {
//     setBranches(branches.filter((b) => b.id !== id));
//     setMessage({ text: "Branch deleted successfully!", type: "info" });
//   };

//   // ✅ Password change handler
//   const handleChangePassword = () => {
//     if (!currentPassword || !newPassword || !confirmNewPassword) {
//       setMessage({ text: "All password fields are required.", type: "error" });
//       return;
//     }

//     if (newPassword !== confirmNewPassword) {
//       setMessage({ text: "Passwords do not match.", type: "error" });
//       return;
//     }

//     setMessage({ text: "Password changed successfully!", type: "success" });
//     setCurrentPassword("");
//     setNewPassword("");
//     setConfirmNewPassword("");
//   };

//   return (
//     <div className="settings-container">
      

//       <div className="settings-box">
//         <h2>Application Settings</h2>

//         {/* ✅ Message Section */}
//         {message.text && (
//           <div className={`message ${message.type}`}>{message.text}</div>
//         )}

//         {/* ✅ Branch Section */}
//         <section className="branch-section">
//           <h3>1. Clinic Branch Settings</h3>

//           <div className="branch-inputs">
//             <input
//               type="text"
//               value={newBranchName}
//               onChange={(e) => setNewBranchName(e.target.value)}
//               placeholder="Branch Name"
//             />
//             <input
//               type="text"
//               value={newBranchShortName}
//               onChange={(e) => setNewBranchShortName(e.target.value.toUpperCase())}
//               placeholder="Short Code (e.g., AG001)"
//             />
//             <button onClick={editBranchId ? handleUpdateBranch : handleAddBranch}>
//               {editBranchId ? "Update Branch" : "Add Branch"}
//             </button>
//           </div>

//           {editBranchId && (
//             <button className="cancel-btn" onClick={clearMessage}>
//               Cancel Edit
//             </button>
//           )}

//           {/* ✅ Branch Table */}
//           <table>
//             <thead>
//               <tr>
//                 <th>Branch Name</th>
//                 <th>Short Code</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {branches.length > 0 ? (
//                 branches.map((b) => (
//                   <tr key={b.id}>
//                     <td>{b.name}</td>
//                     <td>{b.code}</td>
//                     <td>
//                       <button onClick={() => handleEditBranch(b.id)}>Edit</button>
//                       <button onClick={() => handleDeleteBranch(b.id)}>Delete</button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="3" className="no-branch">
//                     No branches found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </section>

//         {/* ✅ Change Password Section */}
//         <section className="password-section">
//           <h3>2. Change Password (Admin)</h3>
//           <input
//             type="password"
//             placeholder="Current Password"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="New Password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Confirm New Password"
//             value={confirmNewPassword}
//             onChange={(e) => setConfirmNewPassword(e.target.value)}
//           />
//           <button className="change-password-btn" onClick={handleChangePassword}>
//             Change Password
//           </button>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default Settings;



import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Dashboard/Settings.css";

const API_URL = "http://localhost:3000/branches";

function Settings() {
  const [branches, setBranches] = useState([]);
  const [newBranchName, setNewBranchName] = useState("");
  const [newBranchShortName, setNewBranchShortName] = useState("");
  const [editBranchId, setEditBranchId] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const clearMessage = () => setMessage({ text: "", type: "" });

  // Load branches from JSON Server
  const loadBranches = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setBranches(res.data || []);
    } catch (err) {
      console.error("Load branches error:", err);
      setMessage({ text: "Failed to load branches from server.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBranches();
  }, []);

  // Add Branch
  const handleAddBranch = async () => {
    clearMessage();

    if (!newBranchName.trim() || !newBranchShortName.trim()) {
      setMessage({ text: "Please fill all fields.", type: "error" });
      return;
    }

    try {
      const payload = {
        name: newBranchName.trim(),
        code: newBranchShortName.trim(),
      };

      await axios.post(API_URL, payload);
      setMessage({ text: "Branch added successfully!", type: "success" });

      setNewBranchName("");
      setNewBranchShortName("");
      loadBranches();
    } catch (err) {
      console.error("Add branch error:", err);
      setMessage({ text: "API Error: Unable to add branch.", type: "error" });
    }
  };

  // Edit: Load to input
  const handleEditBranch = (id) => {
    clearMessage();
    const branch = branches.find((b) => b.id === id);

    if (!branch) {
      setMessage({ text: "Branch not found.", type: "error" });
      return;
    }

    setNewBranchName(branch.name);
    setNewBranchShortName(branch.code);
    setEditBranchId(id);
  };

  // Update Branch
  const handleUpdateBranch = async () => {
    clearMessage();

    if (!editBranchId) {
      setMessage({ text: "No branch selected for update.", type: "error" });
      return;
    }

    if (!newBranchName.trim() || !newBranchShortName.trim()) {
      setMessage({ text: "Please fill all fields.", type: "error" });
      return;
    }

    try {
      const payload = {
        name: newBranchName.trim(),
        code: newBranchShortName.trim(),
      };

      await axios.put(`${API_URL}/${editBranchId}`, payload);

      setMessage({ text: "Branch updated successfully!", type: "success" });

      setEditBranchId(null);
      setNewBranchName("");
      setNewBranchShortName("");
      loadBranches();
    } catch (err) {
      console.error("Update branch error:", err);
      setMessage({ text: "API Error: Unable to update branch.", type: "error" });
    }
  };

  // Delete Branch
  const handleDeleteBranch = async (id) => {
    clearMessage();

    if (!window.confirm("Delete this branch?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);

      setMessage({ text: "Branch deleted successfully.", type: "info" });

      if (editBranchId === id) {
        setEditBranchId(null);
        setNewBranchName("");
        setNewBranchShortName("");
      }

      loadBranches();
    } catch (err) {
      console.error("Delete branch error:", err);
      setMessage({ text: "API Error: Unable to delete branch.", type: "error" });
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    clearMessage();
    setEditBranchId(null);
    setNewBranchName("");
    setNewBranchShortName("");
  };

  // Change Password (Your old logic)
  const handleChangePassword = () => {
    clearMessage();

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setMessage({ text: "All password fields are required.", type: "error" });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage({ text: "Passwords do not match.", type: "error" });
      return;
    }

    setMessage({ text: "Password changed successfully!", type: "success" });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <div className="settings-container">
      <div className="settings-box">
        <h2>Application Settings</h2>

        {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

        {/* BRANCH SECTION */}
        <section className="branch-section">
          <h3>1. Clinic Branch Settings</h3>

          <div className="branch-inputs">
            <input
              type="text"
              value={newBranchName}
              onChange={(e) => setNewBranchName(e.target.value)}
              placeholder="Branch Name"
            />
            <input
              type="text"
              value={newBranchShortName}
              onChange={(e) =>
                setNewBranchShortName(e.target.value.toUpperCase())
              }
              placeholder="Short Code (e.g., AG001)"
            />

            <button onClick={editBranchId ? handleUpdateBranch : handleAddBranch}>
              {editBranchId ? "Update Branch" : "Add Branch"}
            </button>
          </div>

          {editBranchId && (
            <button className="cancel-btn" onClick={handleCancelEdit}>
              Cancel Edit
            </button>
          )}

          {loading ? (
            <p>Loading branches...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Branch Name</th>
                  <th>Short Code</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {branches.length ? (
                  branches.map((b) => (
                    <tr key={b.id}>
                      <td>{b.name}</td>
                      <td>{b.code}</td>
                      <td>
                        <button onClick={() => handleEditBranch(b.id)}>Edit</button>
                        <button onClick={() => handleDeleteBranch(b.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="no-branch">
                      No branches found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </section>

        {/* PASSWORD SECTION */}
        <section className="password-section">
          <h3>2. Change Password (Admin)</h3>

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />

          <button className="change-password-btn" onClick={handleChangePassword}>
            Change Password
          </button>
        </section>
      </div>
    </div>
  );
}

export default Settings;
