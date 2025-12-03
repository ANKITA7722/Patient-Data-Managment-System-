import React, { useEffect, useState } from "react";
import "../css/Dashboard/VisitorRecords.css";
import { Search, Download } from "lucide-react";

const API_USERS = "http://localhost:3000/visitors";
const API_BRANCHES = "http://localhost:3000/branches";

const VisitorRecords = () => {

  const [visitors, setVisitors] = useState([]);
  const [branches, setBranches] = useState([]);

  const [filterDate, setFilterDate] = useState("");
  const [filterTime, setFilterTime] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [filterReligion, setFilterReligion] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  
  useEffect(() => {
    fetch(API_USERS)
      .then(res => res.json())
      .then(data => setVisitors(data))
      .catch(err => console.error("Users API Error:", err));
  }, []);


  useEffect(() => {
    fetch(API_BRANCHES)
      .then(res => res.json())
      .then(data => setBranches(data))
      .catch(err => console.error("Branch API Error:", err));
  }, []);

  
  const filteredVisitors = visitors.filter(v => {

    const matchesDate = filterDate
      ? v.date === filterDate
      : true;

    const matchesTime = filterTime
      ? v.time === filterTime
      : true;

    const matchesBranch = filterBranch
      ? v.branch === filterBranch || v.branchName === filterBranch
      : true;

    const matchesReligion = filterReligion
      ? v.religion === filterReligion
      : true;

    const searchText = searchQuery.toLowerCase();

    const matchesSearch = searchQuery
      ? v.name?.toLowerCase().includes(searchText) ||
        v.branch?.toLowerCase().includes(searchText) ||
        v.religion?.toLowerCase().includes(searchText) ||
        v.mobile?.includes(searchText)
      : true;

    return (
      matchesDate &&
      matchesTime &&
      matchesBranch &&
      matchesReligion &&
      matchesSearch
    );
  });

  
  const handleDownloadCSV = () => {
    if (filteredVisitors.length === 0) {
      alert("No data to download");
      return;
    }

    const headers = [
      "Name",
      "Mobile",
      "Religion",
      "Branch",
      "Date",
      "Time"
    ];

    const rows = filteredVisitors.map(v => [
      v.name,
      v.mobile,
      v.religion,
      v.branch,
      v.date,
      v.time
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map(r => r.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "Visitors.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="visitor-page">

      <h2 className="page-title">Visitor Records</h2>

      <div className="visitor-container">

        <div className="filters-section">

          <div className="filters-grid">

            <input
              type="date"
              value={filterDate}
              onChange={e => setFilterDate(e.target.value)}
              className="filter-input"
            />

            <input
              type="time"
              value={filterTime}
              onChange={e => setFilterTime(e.target.value)}
              className="filter-input"
            />

            <select
              value={filterBranch}
              onChange={e => setFilterBranch(e.target.value)}
              className="filter-input"
            >
              <option value="">Filter by Branch</option>

              {branches.map(b => (
                <option key={b.id} value={b.name}>
                  {b.name}
                </option>
              ))}

            </select>

            <select
              value={filterReligion}
              onChange={e => setFilterReligion(e.target.value)}
              className="filter-input"
            >
              <option value="">Filter by Religion</option>
              <option value="Hindu">Hindu</option>
              <option value="Muslim">Muslim</option>
              <option value="Sikh">Sikh</option>
              <option value="Jain">Jain</option>
              <option value="Christian">Christian</option>
              <option value="Other">Other</option>
            </select>

            <div className="search-box">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search by Name, Branch, Mobile..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="filter-input search-input"
              />
            </div>

          </div>

     
          <div className="filter-buttons">

            <button
              className="clear-btn"
              onClick={() => {
                setFilterDate("");
                setFilterTime("");
                setFilterBranch("");
                setFilterReligion("");
                setSearchQuery("");
              }}
            >
              Clear Filters
            </button>

            <button className="download-btn" onClick={handleDownloadCSV}>
              <Download size={20} className="btn-icon" />
              Download CSV
            </button>

          </div>

        </div>

   
        <div className="table-container">

          <table className="visitor-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Religion</th>
                <th>Branch</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>

              {filteredVisitors.length > 0 ? (
                filteredVisitors.map((v, i) => (
                  <tr key={v.id || i}>
                    <td>{i + 1}</td>
                    <td>{v.name}</td>
                    <td>{v.mobile}</td>
                    <td>{v.religion}</td>
                    <td>{v.branch}</td>
                    <td>{v.date}</td>
                    <td>{v.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    No visitor records found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default VisitorRecords;
