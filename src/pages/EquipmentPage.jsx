// import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
// import TableComponent from "../Components/Table";
// import TableMui from "../Components/TableMui";
import PaginationComponent from "../Components/PaginationComponent";
import SideBarEquipment from "../Components/SideBarEquipment";
import TableHeader from "../Components/TableHeader";
import TableEquipment from "../Components/Tables/TableEquipment";
import EquipmentModal from "../Components/Modals/EquipmentModal";
// import HeaderNav from "../Components/Common/HeaderNav";
import Dialog from "@mui/material/Dialog"; // Import Dialog component
import DialogContent from "@mui/material/DialogContent"; // Import DialogContent component

const EquipmentPage = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [activeTab, setActiveTab] = useState(0); // Track the active tab
  const [data, setData] = useState();
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const apiEndpoints = [
    "https://localhost:7066/api/Equipment/FindEquipmentsByDepartmentId",
    "https://localhost:7066/api/Equipment/FindEquipmentsByDepartmentId",
    "https://localhost:7066/api/Equipment/FindEquipmentsByDepartmentId",
    "https://localhost:7066/api/Equipment/FindEquipmentsByDepartmentId",
    "https://localhost:7066/api/Equipment/FindEquipmentsByDepartmentId",
    "https://localhost:7066/api/Equipment/FindEquipmentsByDepartmentId",
    "https://localhost:7066/api/Equipment/FindEquipmentsByDepartmentId",
    "https://localhost:7066/api/Equipment/FindEquipmentsByDepartmentId",
    "https://localhost:7066/api/Equipment/FindEquipmentsByDepartmentId",
  ];

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleTableRowClick = async (rowId) => {
    console.log("handleTableRowClick called with rowId:", rowId);
    try {
      const response = await axios.get(`https://localhost:7066/api/Equipment`, {
        params: { id: rowId }, // Pass rowId as a parameter
      });
      const responseData = response.data;
      console.log("Fetched data:", responseData);
      setModalData(responseData);
      setIsModalOpen(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData = (index) => {
    const endpoint = apiEndpoints[index];

    axios
      .get(endpoint, {
        params: { page: page, pageSize: size, id: index + 1 },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData(activeTab); // Call fetchData with the activeTab index
  }, [activeTab, page, size]);

  console.log(data);

  return (
    <div className="department-main">
      {/* <Dialog open={isModalOpen} onClose={handleModalClose}>
        <DialogContent>
          
        </DialogContent>
      </Dialog> */}
      {/* <HeaderNav />;
      {modalData && (
        <EquipmentModal
          isOpen={isModalOpen}
          handleClose={handleModalClose}
          modalData={modalData}
        />
      )} */}
      <div className="dep-mid">
        <SideBarEquipment activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="page-content">
          <div>
            <TableHeader />

            {activeTab === 0 && data && (
              <TableEquipment
                className="table"
                thead={Object.keys(data?.items?.[0])}
                rows={data?.items}
                onRowClick={(rowId) => handleTableRowClick(rowId)}
              />
            )}
            {activeTab === 1 && data && (
              <TableEquipment
                className="table"
                thead={Object.keys(data?.items?.[0])}
                rows={data?.items}
                onRowClick={(rowId) => handleTableRowClick(rowId)} // Pass the row click handler
              />
            )}
            {activeTab === 2 && data && (
              <TableEquipment
                className="table"
                thead={Object.keys(data?.items?.[0])}
                rows={data?.items}
                onRowClick={(rowId) => handleTableRowClick(rowId)} // Pass the row click handler
              />
            )}
            {activeTab === 3 && data && (
              <TableEquipment
                className="table"
                thead={Object.keys(data?.items?.[0])}
                rows={data?.items}
                onRowClick={(rowId) => handleTableRowClick(rowId)} // Pass the row click handler
              />
            )}
            {activeTab === 4 && data && (
              <TableEquipment
                className="table"
                thead={Object.keys(data?.items?.[0])}
                rows={data?.items}
                onRowClick={(rowId) => handleTableRowClick(rowId)} // Pass the row click handler
              />
            )}
            {activeTab === 5 && data && (
              <TableEquipment
                className="table"
                thead={Object.keys(data?.items?.[0])}
                rows={data?.items}
                onRowClick={(rowId) => handleTableRowClick(rowId)} // Pass the row click handler
              />
            )}
            {activeTab === 6 && data && (
              <TableEquipment
                className="table"
                thead={Object.keys(data?.items?.[0])}
                rows={data?.items}
                onRowClick={(rowId) => handleTableRowClick(rowId)} // Pass the row click handler
              />
            )}
            {activeTab === 7 && data && (
              <TableEquipment
                className="table"
                thead={Object.keys(data?.items?.[0])}
                rows={data?.items}
                onRowClick={(rowId) => handleTableRowClick(rowId)} // Pass the row click handler
              />
            )}
            {activeTab === 8 && data && (
              <TableEquipment
                className="table"
                thead={Object.keys(data?.items?.[0])}
                rows={data?.items}
                onRowClick={(rowId) => handleTableRowClick(rowId)} // Pass the row click handler
              />
            )}
            <PaginationComponent
              page={page}
              setPage={setPage}
              recordSize={size}
              count={data?.totalCount} // *4
              size={size}
              setSize={setSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentPage;
