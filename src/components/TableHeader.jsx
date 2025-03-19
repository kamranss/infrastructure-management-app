import React from "react";
// import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const TableHeader = () => {
  return (
    <div className="tableHeadContainer">
      <div className="tableHead">
        <div className="tableHeadBox">
          <NavLink className="header_nav_icon" to="/CreateEquipment">
            <i class="fa-regular fa-square-plus"></i>
          </NavLink>
          <NavLink className="header_nav_icon" to="/EquipmentPage">
            <i class="fa-solid fa-cloud-arrow-down"></i>
          </NavLink>
          <NavLink className="header_nav_icon" to="/EquipmentPage">
            <i class="fa-solid fa-eye-slash"></i>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
