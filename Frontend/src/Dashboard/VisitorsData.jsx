


import React, { useState, useEffect } from "react";
 import "../css/Dashboard/VisitorData.css";

const VisitorsData = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:3000/visitors")
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
      <h3 className="table-title">Visitors Data</h3>
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>time</th>
              <th>Date</th>
              <th>Branch</th>
              <th>Religion</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{indexOfFirst + index + 1}</td>
                <td>{user.name}</td>
                <td>{user.mobile}</td>
                <td>{user.time}</td>
                <td>{user.date}</td>
                <td>{user.branch}</td>
                <td>{user.religion}</td>
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

export default VisitorsData;
