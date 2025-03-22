import React from "react";
// import ExportExcel from "../Components/Common/Export/ExportExcel";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { Download } from "@mui/icons-material";

// import { List as ListIcon } from "@mui/icons-material";
import ExportExcel from "../ExportExcel";
import {
  FaList,
  FaTasks,
  FaCalendarCheck,
  FaWarehouse,
  FaShoppingCart,
  FaChartLine,
  FaUserCog,
  FaSlidersH,
} from "react-icons/fa";
import {
  List as ListIcon,
  TaskAlt,
  CalendarMonth,
  Warehouse,
  ShoppingCart,
  ShowChart,
  ManageAccounts,
  Tune,
} from "@mui/icons-material";

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
          <ListIcon className="icon" />
        </NavLink>
        <NavLink
          to="/mppage"
          className={({ isActive }) =>
            isActive ? "active header_nav_icon" : "header_nav_icon"
          }
        >
          <TaskAlt className="icon" />
        </NavLink>
        <NavLink
          to="/usageHistory"
          className={({ isActive }) =>
            isActive ? "active header_nav_icon" : "header_nav_icon"
          }
        >
          <CalendarMonth className="icon" />
        </NavLink>
        <NavLink
          to="/department"
          className={({ isActive }) =>
            isActive ? "active header_nav_icon" : "header_nav_icon"
          }
        >
          <Warehouse className="icon" />
        </NavLink>
        <NavLink
          to="/department"
          className={({ isActive }) =>
            isActive ? "active header_nav_icon" : "header_nav_icon"
          }
        >
          <ShoppingCart className="icon" />
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "active header_nav_icon" : "header_nav_icon"
          }
        >
          <ShowChart className="icon" />
        </NavLink>

        <NavLink
          to="/department"
          className={({ isActive }) =>
            isActive ? "active header_nav_icon" : "header_nav_icon"
          }
        >
          <ManageAccounts className="icon" />
        </NavLink>
        <NavLink
          to="/administration"
          className={({ isActive }) =>
            isActive ? "active header_nav_icon" : "header_nav_icon"
          }
        >
          <Tune className="icon" />
        </NavLink>

        <div className="main_excel">
          {" "}
          <ExportExcel />
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;
