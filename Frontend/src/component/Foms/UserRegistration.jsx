// import React, { useState } from "react";
// import "../../css/Form/UserRegistration.css";

// const UserRegistration = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     gender: "",
//     email: "",
//     mobile: "",
//     dob: "",
//     branch: "",
//     cast: "",
//   });

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // validation
//     if (
//       !formData.name ||
//       !formData.gender ||
//       !formData.email ||
//       !formData.mobile ||
//       !formData.dob ||
//       !formData.branch ||
//       !formData.cast
//     ) {
//       setMessage("Please fill all fields");
//       return;
//     }

//     if (!/^\d{10}$/.test(formData.mobile)) {
//       setMessage("Mobile number must be 10 digits");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:3000/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setMessage("Registration successful! User logged in.");
//         setFormData({
//           name: "",
//           gender: "",
//           email: "",
//           mobile: "",
//           dob: "",
//           branch: "",
//           cast: "",
//         });

//         // clear message after 3 seconds
//         setTimeout(() => setMessage(""), 3000);
//       } else {
//         setMessage("Error saving user!");
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage("Server error! Make sure json-server is running.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="registration-container">
//       <h2>Patient Registration Form</h2>
//       <form className="registration-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />

//         <select
//           name="gender"
//           value={formData.gender}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="mobile"
//           placeholder="Mobile Number"
//           value={formData.mobile}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="date"
//           name="dob"
//           value={formData.dob}
//           onChange={handleChange}
//           required
//         />

//         <select
//           name="branch"
//           value={formData.branch}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Branch</option>
//           <option value="Ashoka Garden">Ashoka Garden</option>
//           <option value="Awadh Puri">Awadh Puri</option>
//         </select>

//         <select
//           name="cast"
//           value={formData.cast}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Cast</option>
//           <option value="Hindu">Hindu</option>
//           <option value="Muslim">Muslim</option>
//           <option value="Other">Christian</option>
//           <option value="Other">Sikh</option>
//           <option value="Other">Buddhist</option>
//           <option value="Other">Jain</option>
//           <option value="Other">Other</option>
//         </select>

//         <button type="submit" disabled={loading}>
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>
//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// };

// export default UserRegistration;



import React, { useState } from "react";
import "../../css/Form/UserRegistration.css";

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    mobile: "",
    date: "",
    branch: "",
    cast: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.gender ||
      !formData.email ||
      !formData.mobile ||
      !formData.date ||
      !formData.branch ||
      !formData.cast
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
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Registration successful!");
        setFormData({
          name: "",
          gender: "",
          email: "",
          mobile: "",
          date: "",
          branch: "",
          cast: "",
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

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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
            <option value="Ashoka Garden">Ashoka Garden</option>
            <option value="Awadh Puri">Awadh Puri</option>
          </select>

          <select
            name="cast"
            value={formData.cast}
            onChange={handleChange}
            required
          >
            <option value="">Select Cast</option>
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
