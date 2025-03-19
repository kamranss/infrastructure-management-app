import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
// import "./Header.css"; // Make sure to import your CSS file

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="nav-buttons">
          {/* NavLink to the Login page */}
          <NavLink
            to="/login"
            className="nav-link"
            activeClassName="active-link"
          >
            Login
          </NavLink>
          {/* NavLink to the Register page */}
          <NavLink
            to="/register"
            className="nav-link"
            activeClassName="active-link"
          >
            Register
          </NavLink>
        </div>
        <div className="userinfo">
          <h3 className="username">UserName</h3>
          <i className="fa-solid fa-user"></i>
        </div>
      </div>
    </div>
  );
};

export default Header;
