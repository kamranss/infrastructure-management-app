import React from "react";
import { NavLink } from "react-router-dom";
// import { AiFillAppstore } from "react-icons/ai";
import ExportExcel from "../ExportExcel";
// import {IoAppsSharp} from "react-icons/io"

const HeaderNav = () => {
  return (
    <div className="headernav_container">
      <div className="main">
        <NavLink
          to="/EquipmentPage"
          className={({ isActive }) =>
            isActive ? "active header_nav_icon" : "header_nav_icon"
          }
        >
          {/* <AiFillAppstore className="icon" /> */}
          <i class="fa-solid fa-list"></i>
        </NavLink>
        <NavLink
          to="/mppage"
          className={({ isActive }) =>
            isActive ? "active header_nav_icon" : "header_nav_icon"
          }
        >
          <i class="fa-solid fa-bars-progress"></i>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "active header_nav_icon" : "header_nav_icon"
          }
          to="/usageHistory"
        >
          <i class="fa-solid fa-calendar-check"></i>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "active header_nav_icon" : "header_nav_icon"
          }
          to="/department"
        >
          <i class="fa-solid fa-warehouse"></i>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "active header_nav_icon" : "header_nav_icon"
          }
          to="/department"
        >
          <i class="fa-solid fa-cart-shopping"></i>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "active header_nav_icon" : "header_nav_icon"
          }
          to="/"
        >
          <i class="fa-solid fa-chart-line"></i>
        </NavLink>
        <NavLink className="header_nav_icon" to="/department">
          <i class="fa-solid fa-user-gear"></i>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "active header_nav_icon" : "header_nav_icon"
          }
          to="/administration"
        >
          <i class="fa-solid fa-sliders"></i>
        </NavLink>
      </div>
      <div className="main_excel">
        <ExportExcel />
      </div>
    </div>
  );
};

export default HeaderNav;
