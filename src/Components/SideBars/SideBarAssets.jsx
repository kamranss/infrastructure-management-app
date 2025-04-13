import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const DEPARTMENT_ENDPOINT = `${API_BASE_URL}${
  import.meta.env.VITE_DEPARTMENT_PATH
}`;

const SideBarAssets = ({ activeTab, onTabChange }) => {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `${DEPARTMENT_ENDPOINT}?page=1&pageSize=20`
        );
        setDepartments(response.data.items); // assuming your API returns { items: [...] }
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const filtered = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedDepartments = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="division_sidebar">
      <div className="heading">
        <h2 className="heading_name">Division List</h2>
      </div>

      <input
        type="text"
        placeholder="Find divisions..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1); // Reset to first page on filter
        }}
        className="division-filter"
      />

      {paginatedDepartments.map((dept, index) => {
        const actualIndex = (page - 1) * pageSize + index;
        return (
          <div
            key={dept.id}
            className={`division-item-wrapper ${
              activeTab === actualIndex ? "active" : ""
            }`}
            onClick={() => onTabChange(actualIndex)}
          >
            <NavLink className="division-item">
              <CorporateFareIcon className="division-icon" />
              <span className="span">{dept.name}</span>
            </NavLink>
          </div>
        );
      })}

      <div className="pagination-controls">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="page-btn"
        >
          Prev
        </button>
        <span className="page-indicator">
          Page {page} / {totalPages || 1}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="page-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SideBarAssets;
