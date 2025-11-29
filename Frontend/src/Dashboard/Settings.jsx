import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Dashboard/Settings.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";

/* ================= API ENDPOINTS ================= */
const BRANCH_API = "http://localhost:3000/branches";
const ADMIN_API = "http://localhost:3000/admin";

function Settings() {
  /* ================= BRANCH STATES ================= */
  const [branches, setBranches] = useState([]);
  const [newBranchName, setNewBranchName] = useState("");
  const [newBranchShortName, setNewBranchShortName] = useState("");
  const [editBranchId, setEditBranchId] = useState(null);

  /* ================= ADMIN STATES ================= */
  const [admins, setAdmins] = useState([]);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [editAdminId, setEditAdminId] = useState(null);

  /* ================= COMMON ================= */
  const [message, setMessage] = useState({ text: "", type: "" });

  const clearMessage = () => setMessage({ text: "", type: "" });

  /* ================= LOAD DATA ================= */
  const loadBranches = async () => {
    try {
      const res = await axios.get(BRANCH_API);
      setBranches(res.data || []);
    } catch {
      setMessage({ text: "Failed to load branches", type: "error" });
    }
  };

  const loadAdmins = async () => {
    try {
      const res = await axios.get(ADMIN_API);
      setAdmins(res.data || []);
    } catch {
      setMessage({ text: "Failed to load admins", type: "error" });
    }
  };

  useEffect(() => {
    loadBranches();
    loadAdmins();
  }, []);

  /* ================= BRANCH CRUD ================= */
  const handleAddBranch = async () => {
    clearMessage();
    if (!newBranchName || !newBranchShortName) {
      return setMessage({ text: "Fill all branch fields", type: "error" });
    }

    try {
      await axios.post(BRANCH_API, {
        name: newBranchName,
        code: newBranchShortName,
      });
      setNewBranchName("");
      setNewBranchShortName("");
      loadBranches();
      setMessage({ text: "Branch Added", type: "success" });
    } catch {
      setMessage({ text: "Add branch failed", type: "error" });
    }
  };

  const handleEditBranch = (id) => {
    const branch = branches.find((b) => b.id === id);
    if (!branch) return;
    setNewBranchName(branch.name);
    setNewBranchShortName(branch.code);
    setEditBranchId(id);
  };

  const handleUpdateBranch = async () => {
    if (!editBranchId) return;
    try {
      await axios.put(`${BRANCH_API}/${editBranchId}`, {
        name: newBranchName,
        code: newBranchShortName,
      });
      setEditBranchId(null);
      setNewBranchName("");
      setNewBranchShortName("");
      loadBranches();
      setMessage({ text: "Branch Updated", type: "success" });
    } catch {
      setMessage({ text: "Update failed", type: "error" });
    }
  };

  const handleDeleteBranch = async (id) => {
    if (!window.confirm("Delete this branch?")) return;
    try {
      await axios.delete(`${BRANCH_API}/${id}`);
      loadBranches();
      setMessage({ text: "Branch Deleted", type: "info" });
    } catch {
      setMessage({ text: "Delete failed", type: "error" });
    }
  };

  /* ================= ADMIN CRUD ================= */
  const handleAddAdmin = async () => {
    clearMessage();
    if (!adminName || !adminEmail || !adminPassword) {
      return setMessage({ text: "Fill all admin fields", type: "error" });
    }
    try {
      await axios.post(ADMIN_API, {
        name: adminName,
        email: adminEmail,
        password: adminPassword,
      });
      setAdminName("");
      setAdminEmail("");
      setAdminPassword("");
      loadAdmins();
      setMessage({ text: "✅ Admin Added", type: "success" });
    } catch {
      setMessage({ text: "❌ Admin add failed", type: "error" });
    }
  };

  const handleEditAdmin = (admin) => {
    clearMessage();
    setEditAdminId(admin.id);
    setAdminName(admin.name);
    setAdminEmail(admin.email);
    setAdminPassword(admin.password);
  };

  const handleUpdateAdmin = async () => {
    clearMessage();
    if (!editAdminId)
      return setMessage({ text: "Select admin first", type: "error" });
    if (!adminName || !adminEmail || !adminPassword)
      return setMessage({ text: "Fill all admin fields", type: "error" });

    try {
      await axios.put(`${ADMIN_API}/${editAdminId}`, {
        id: editAdminId, // JSON server needs matching id
        name: adminName,
        email: adminEmail,
        password: adminPassword,
      });
      setEditAdminId(null);
      setAdminName("");
      setAdminEmail("");
      setAdminPassword("");
      loadAdmins();
      setMessage({ text: "Admin Updated", type: "success" });
    } catch {
      setMessage({ text: "Update failed", type: "error" });
    }
  };

  const handleDeleteAdmin = async (id) => {
    if (!window.confirm("Delete admin?")) return;
    try {
      await axios.delete(`${ADMIN_API}/${id}`);
      loadAdmins();
      setMessage({ text: "Admin Deleted", type: "info" });
    } catch {
      setMessage({ text: "Delete failed", type: "error" });
    }
  };

  const cancelAdminEdit = () => {
    clearMessage();
    setEditAdminId(null);
    setAdminName("");
    setAdminEmail("");
    setAdminPassword("");
  };

  /* ================= JSX ================= */
  return (
    <div className="settings-container">
      <div className="settings-box">
        <h2>Application Settings</h2>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        {/* ======= BRANCH SECTION ======= */}
        <section className="branch-section">
          <h3>1. Clinic Branch</h3>
          <div className="branch-inputs">
            <input
              placeholder="Branch Name"
              value={newBranchName}
              onChange={(e) => setNewBranchName(e.target.value)}
            />
            <input
              placeholder="Branch Code"
              value={newBranchShortName}
              onChange={(e) => setNewBranchShortName(e.target.value)}
            />
            <button
              onClick={editBranchId ? handleUpdateBranch : handleAddBranch}
            >
              {editBranchId ? "Update Branch" : "Add Branch"}
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((b) => (
                <tr key={b.id}>
                  <td>{b.name}</td>
                  <td>{b.code}</td>
                  <td>
                    <FiEdit
                      className="icon edit-icon"
                      onClick={() => handleEditBranch(b.id)}
                    />
                    <FiTrash2
                      className="icon delete-icon"
                      onClick={() => handleDeleteBranch(b.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ======= ADMIN SECTION ======= */}
        <section className="password-section">
          <h3>2. Admin Management</h3>
          <input
            placeholder="Admin Name"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
          <input
            placeholder="Admin Email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
          <div className="branch-inputs">
            <button onClick={editAdminId ? handleUpdateAdmin : handleAddAdmin}>
              {editAdminId ? "Update Admin" : "Add Admin"}
            </button>
            {editAdminId && (
              <button className="cancel-btn" onClick={cancelAdminEdit}>
                Cancel Edit
              </button>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.email}</td>
                  <td>{a.password}</td>
                  <td>
                    <FiEdit
                      className="icon edit-icon"
                      onClick={() => handleEditAdmin(a)}
                    />
                    <FiTrash2
                      className="icon delete-icon"
                      onClick={() => handleDeleteAdmin(a.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default Settings;
