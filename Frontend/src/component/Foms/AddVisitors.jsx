import React, { useState, useEffect } from "react";
import "../../css/Form/UserRegistration.css";

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    time: "",
    mobile: "",
    date: "",
    branch: "",
    religion: "",
  });

  const [branches, setBranches] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch branches from API
  useEffect(() => {
    fetch("http://localhost:3000/branches")
      .then((res) => res.json())
      .then((data) => setBranches(data))
      .catch((err) => {
        console.error("Branch API Error:", err);
        setMessage("Failed to load branches!");
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.time ||
      !formData.mobile ||
      !formData.date ||
      !formData.branch ||
      !formData.religion
    ) {
      setMessage("Please fill all fields");
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      setMessage("Mobile number must be 10 digits");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Registration successful!");
        setFormData({
          name: "",
          time: "",
          mobile: "",
          date: "",
          branch: "",
          religion: "",
        });

        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Error saving user!");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error! Make sure json-server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <h2>Patient Registration Form</h2>

      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

         
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.name}>
                {branch.name}
              </option>
            ))}
          </select>

          <select
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            required
          >
            <option value="">Select Religion</option>
            <option value="Hindu">Hindu</option>
            <option value="Muslim">Muslim</option>
            <option value="Christian">Christian</option>
            <option value="Sikh">Sikh</option>
            <option value="Buddhist">Buddhist</option>
            <option value="Jain">Jain</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UserRegistration;
