// import React, { useState, useEffect } from "react";
// import "../css/Dashboard/UserTable.css";

// const UsersTable = () => {
//   const [users, setUsers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 10;

//   useEffect(() => {
//     fetch("http://localhost:3000/users")
//       .then((res) => res.json())
//       .then((data) => setUsers(data))
//       .catch((err) => console.error(err));
//   }, []);

//   // Pagination logic
//   const indexOfLast = currentPage * usersPerPage;
//   const indexOfFirst = indexOfLast - usersPerPage;
//   const currentUsers = users.slice(indexOfFirst, indexOfLast);

//   const paginate = (pageNum) => setCurrentPage(pageNum);

//   return (
//     <div className="users-table">
//       <h3>Patients Data</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>No.</th>
//             <th>Name</th>
//             <th>Gender</th>
//             <th>Email</th>
//             <th>Mobile</th>
//             <th>DOB</th>
//             <th>Branch</th>
//             <th>Cast</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentUsers.map((user, index) => (
//             <tr key={user.id}>
//               <td>{indexOfFirst + index + 1}</td> {/* Auto row number */}
//               <td>{user.name}</td>
//               <td>{user.gender}</td>
//               <td>{user.email}</td>
//               <td>{user.mobile}</td>
//               <td>{user.dob}</td>
//               <td>{user.branch}</td>
//               <td>{user.cast}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="pagination">
//         {Array.from(
//           { length: Math.ceil(users.length / usersPerPage) },
//           (_, i) => (
//             <button key={i + 1} onClick={() => paginate(i + 1)}>
//               {i + 1}
//             </button>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default UsersTable;


import React, { useState, useEffect } from "react";
import "../css/Dashboard/UserTable.css";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  // Pagination logic
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNum) => setCurrentPage(pageNum);

  return (
    <div className="users-table">
      <h3 className="table-title">Patients Data</h3>
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>DOB</th>
              <th>Branch</th>
              <th>Cast</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{indexOfFirst + index + 1}</td>
                <td>{user.name}</td>
                <td>{user.gender}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.dob}</td>
                <td>{user.branch}</td>
                <td>{user.cast}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        {Array.from(
          { length: Math.ceil(users.length / usersPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default UsersTable;
