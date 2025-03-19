import React from "react";
// import { Tabs, Tab, AppBar } from "@material-ui/core";
// import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const SideBarEquipment = ({ activeTab, onTabChange }) => {
  return (
    <div className="department_sidebar">
      <div className="heading">
        <h2 className="heading_name">Divission List</h2>
      </div>
      <NavLink
        className={`division-name ${activeTab === 1 ? "active" : ""}`}
        onClick={() => onTabChange(0)}
      >
        <i class="fa-solid fa-angle-right"></i>
        <span className="span">001 - Mechanical</span>
      </NavLink>
      <NavLink
        className={`division-name ${activeTab === 2 ? "active" : ""}`}
        onClick={() => onTabChange(1)}
      >
        <i class="fa-solid fa-angle-right"></i>
        <span className="span">002 - Railway</span>
      </NavLink>
      <NavLink
        className={`division-name ${activeTab === 3 ? "active" : ""}`}
        onClick={() => onTabChange(2)}
      >
        <i class="fa-solid fa-angle-right"></i>
        <span className="span">003 - Cranes</span>
      </NavLink>
      <NavLink
        className={`division-name ${activeTab === 4 ? "active" : ""}`}
        onClick={() => onTabChange(3)}
      >
        <i class="fa-solid fa-angle-right"></i>
        <span className="span">004 - Building</span>
      </NavLink>
      <NavLink
        className={`division-name ${activeTab === 5 ? "active" : ""}`}
        onClick={() => onTabChange(4)}
      >
        <i class="fa-solid fa-angle-right"></i>
        <span className="span">005 - Transport</span>
      </NavLink>
      <NavLink
        className={`division-name ${activeTab === 6 ? "active" : ""}`}
        onClick={() => onTabChange(5)}
      >
        <i class="fa-solid fa-angle-right"></i>
        <span className="span">006 - Marine fleet</span>
      </NavLink>
      <NavLink
        className={`division-name ${activeTab === 7 ? "active" : ""}`}
        onClick={() => onTabChange(6)}
      >
        <i class="fa-solid fa-angle-right"></i>
        <span className="span">007 - Engineering</span>
      </NavLink>
      <NavLink
        className={`division-name ${activeTab === 8 ? "active" : ""}`}
        onClick={() => onTabChange(7)}
      >
        <i class="fa-solid fa-angle-right"></i>
        <span className="span">008 - Electrical</span>
      </NavLink>
      <NavLink
        className={`division-name ${activeTab === 9 ? "active" : ""}`}
        onClick={() => onTabChange(8)}
      >
        <i class="fa-solid fa-angle-right"></i>
        <span className="span">009 - Rigging Loft</span>
      </NavLink>
    </div>
  );
};

export default SideBarEquipment;
