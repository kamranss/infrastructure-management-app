import { NavLink } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";
import PaginationComponent2 from "../Components/Common/PaginationComponent2";
import SideBarAssets from "../Components/SideBars/SideBarAssets";
import TableHeader from "../Components/TableHeader";
import TableAsset from "../Components/Tables/TableAsset";
import { useNavigate } from "react-router-dom";
//url
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const EQUIPMENT_ENDPOINT =
  API_BASE_URL + import.meta.env.VITE_API_EQUIPMENT_PATH;

import EquipmentModal from "../Components/Modals/EquipmentModal";

import Dialog from "@mui/material/Dialog"; // Import Dialog component
import DialogContent from "@mui/material/DialogContent"; // Import DialogContent component

const AssetsPage = () => {
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

  // Filtering logic
  const [filter, setFilter] = useState({
    name: "",
    operationSite: "",
    type: "",
    mpTimeOnly: false,
  });

  const filteredRows = (data?.items || [])
    .filter((row) => {
      const matchesName = row.name
        ?.toLowerCase()
        .includes(filter.name.toLowerCase());
      const matchesSite = row.operationSite
        ?.toLowerCase()
        .includes(filter.operationSite.toLowerCase());
      const matchesType = row.type
        ?.toLowerCase()
        .includes(filter.type.toLowerCase());
      const matchesMpTime = !filter.mpTimeOnly || row.mpTime === false;

      return matchesName && matchesSite && matchesType && matchesMpTime;
    })
    .sort((a, b) => {
      const aMp = a.mpTime === false ? 1 : 0;
      const bMp = b.mpTime === false ? 1 : 0;
      return bMp - aMp; // bring false (needs attention) to top
    });
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
      <div className="dep-mid">
        <SideBarAssets activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="page-content">
          <div>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ backgroundColor: "#e3f2fd" }}>
                  <CardContent>
                    <Typography variant="h6" color="primary">
                      Total Assets
                    </Typography>
                    <Typography variant="h4">154</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ backgroundColor: "#fff3e0" }}>
                  <CardContent>
                    <Typography variant="h6" color="orange">
                      In Maintenance
                    </Typography>
                    <Typography variant="h4">21</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ backgroundColor: "#ede7f6" }}>
                  <CardContent>
                    <Typography variant="h6" color="purple">
                      Available
                    </Typography>
                    <Typography variant="h4">99</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ backgroundColor: "#fce4ec" }}>
                  <CardContent>
                    <Typography variant="h6" color="secondary">
                      Out of Service
                    </Typography>
                    <Typography variant="h4">12</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <div className="asset-page-filter">
              {/* <div>Filters</div> */}
              <input
                type="text"
                placeholder="Asset Name"
                className="filter-input"
                value={filter.name}
                onChange={(e) => setFilter({ ...filter, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Operation Site"
                className="filter-input"
                value={filter.operationSite}
                onChange={(e) =>
                  setFilter({ ...filter, operationSite: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Asset Type"
                className="filter-input"
                value={filter.type}
                onChange={(e) => setFilter({ ...filter, type: e.target.value })}
              />
              <label className="mp-checkbox">
                <input
                  type="checkbox"
                  checked={filter.mpTimeOnly}
                  onChange={(e) =>
                    setFilter({ ...filter, mpTimeOnly: e.target.checked })
                  }
                />
                MP Time Reached
              </label>
            </div>

            <TableHeader />

            {activeTab === 0 && data && (
              <TableAsset
                className="table"
                thead={Object.keys(data?.items?.[0])}
                rows={filteredRows}
                onRowClick={(rowId) => handleTableRowClick(rowId)}
              />
            )}
            {activeTab === 1 && data && (
              <TableAsset
                className="table"
                thead={Object.keys(data?.items?.[0])}
                rows={filteredRows}
                onRowClick={(rowId) => handleTableRowClick(rowId)}
              />
            )}
            {activeTab === 2 && data && (
              <TableAsset
                className="table"
                thead={Object.keys(data?.items?.[0])}
                rows={filteredRows}
                onRowClick={(rowId) => handleTableRowClick(rowId)}
              />
            )}
            {activeTab === 3 && data && (
              <TableAsset
                className="table"
                thead={Object.keys(data?.items?.[0])}
                rows={filteredRows}
                onRowClick={(rowId) => handleTableRowClick(rowId)}
              />
            )}
            {activeTab === 4 && data && (
              <TableAsset
                className="table"
                thead={Object.keys(data?.items?.[0])}
                rows={filteredRows}
                onRowClick={(rowId) => handleTableRowClick(rowId)}
              />
            )}
            {activeTab === 5 && data && (
              <TableAsset
                className="table"
                thead={Object.keys(data?.items?.[0])}
                rows={filteredRows}
                onRowClick={(rowId) => handleTableRowClick(rowId)}
              />
            )}
            {activeTab === 6 && data && (
              <TableAsset
                className="table"
                thead={Object.keys(data?.items?.[0])}
                rows={filteredRows}
                onRowClick={(rowId) => handleTableRowClick(rowId)}
              />
            )}
            {activeTab === 7 && data && (
              <TableAsset
                className="table"
                thead={Object.keys(data?.items?.[0])}
                rows={filteredRows}
                onRowClick={(rowId) => handleTableRowClick(rowId)}
              />
            )}
            {activeTab === 8 && data && (
              <TableAsset
                className="table"
                thead={Object.keys(data?.items?.[0])}
                rows={filteredRows}
                onRowClick={(rowId) => handleTableRowClick(rowId)}
              />
            )}
            <PaginationComponent2
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

export default AssetsPage;

// import { NavLink } from "react-router-dom";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Grid, Card, CardContent, Typography } from "@mui/material";
// import PaginationComponent2 from "../Components/Common/PaginationComponent2";
// import SideBarAssets from "../Components/SideBars/SideBarAssets";
// import TableHeader from "../Components/TableHeader";
// import TableAsset from "../Components/Tables/TableAsset";

// // URL
// export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// export const EQUIPMENT_ENDPOINT =
//   API_BASE_URL + import.meta.env.VITE_API_EQUIPMENT_PATH;

// const AssetsPage = () => {
//   const [page, setPage] = useState(1);
//   const [size, setSize] = useState(10);
//   const [activeTab, setActiveTab] = useState(0);
//   const [data, setData] = useState();
//   const [modalData, setModalData] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const apiEndpoints = Array(9).fill(
//     "https://localhost:7066/api/Equipment/FindEquipmentsByDepartmentId"
//   );

//   const [filter, setFilter] = useState({
//     name: "",
//     operationSite: "",
//     type: "",
//     mpTimeOnly: false,
//   });

//   const filteredRows = (data?.items || [])
//     .filter((row) => {
//       const matchesName = row.name
//         ?.toLowerCase()
//         .includes(filter.name.toLowerCase());
//       const matchesSite = row.operationSite
//         ?.toLowerCase()
//         .includes(filter.operationSite.toLowerCase());
//       const matchesType = row.type
//         ?.toLowerCase()
//         .includes(filter.type.toLowerCase());
//       // const matchesMpTime = !filter.mpTimeOnly || row.mpTime === true;
//       // const matchesMpTime = !filter.mpTimeOnly || row.mpTimeCompleted === false;
//       const matchesMpTime =
//         !filter.mpTimeOnly || row.mpTime === false || row.mpTime === null;

//       return matchesName && matchesSite && matchesType && matchesMpTime;
//     })
//     // .sort((a, b) => {
//     //   const aMp = a.mpTime === true ? 1 : 0;
//     //   const bMp = b.mpTime === true ? 1 : 0;
//     //   return bMp - aMp;
//     // });
//     .sort((a, b) => {
//       const aMp = a.mpTimeCompleted === false ? 1 : 0;
//       const bMp = b.mpTimeCompleted === false ? 1 : 0;
//       return bMp - aMp; // false (needs attention) comes first
//     });

//   const fetchData = (index) => {
//     const endpoint = apiEndpoints[index];
//     axios
//       .get(endpoint, {
//         params: { page: page, pageSize: size, id: index + 1 },
//       })
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     fetchData(activeTab);
//   }, [activeTab, page, size]);

//   const handleTableRowClick = async (rowId) => {
//     try {
//       const response = await axios.get(`https://localhost:7066/api/Equipment`, {
//         params: { id: rowId },
//       });
//       const responseData = response.data;
//       setModalData(responseData);
//       setIsModalOpen(true);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <div className="department-main">
//       <div className="dep-mid">
//         <SideBarAssets activeTab={activeTab} onTabChange={setActiveTab} />
//         <div className="page-content">
//           <Grid container spacing={2} sx={{ mb: 3 }}>
//             <Grid item xs={12} sm={6} md={3}>
//               <Card sx={{ backgroundColor: "#e3f2fd" }}>
//                 <CardContent>
//                   <Typography variant="h6" color="primary">
//                     Total Assets
//                   </Typography>
//                   <Typography variant="h4">154</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Card sx={{ backgroundColor: "#fff3e0" }}>
//                 <CardContent>
//                   <Typography variant="h6" color="orange">
//                     In Maintenance
//                   </Typography>
//                   <Typography variant="h4">21</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Card sx={{ backgroundColor: "#ede7f6" }}>
//                 <CardContent>
//                   <Typography variant="h6" color="purple">
//                     Available
//                   </Typography>
//                   <Typography variant="h4">99</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Card sx={{ backgroundColor: "#fce4ec" }}>
//                 <CardContent>
//                   <Typography variant="h6" color="secondary">
//                     Out of Service
//                   </Typography>
//                   <Typography variant="h4">12</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>

//           <div className="asset-page-filter">
//             <input
//               type="text"
//               placeholder="Asset Name"
//               className="filter-input"
//               value={filter.name}
//               onChange={(e) => setFilter({ ...filter, name: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Operation Site"
//               className="filter-input"
//               value={filter.operationSite}
//               onChange={(e) =>
//                 setFilter({ ...filter, operationSite: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Asset Type"
//               className="filter-input"
//               value={filter.type}
//               onChange={(e) => setFilter({ ...filter, type: e.target.value })}
//             />
//             <label className="mp-checkbox">
//               <input
//                 type="checkbox"
//                 checked={filter.mpTimeOnly}
//                 onChange={(e) =>
//                   setFilter({ ...filter, mpTimeOnly: e.target.checked })
//                 }
//               />
//               MP Time Reached
//             </label>
//           </div>

//           <TableHeader />

//           {data && (
//             <TableAsset
//               className="table"
//               thead={Object.keys(data?.items?.[0] || {})}
//               rows={filteredRows}
//               onRowClick={handleTableRowClick}
//             />
//           )}

//           <PaginationComponent2
//             page={page}
//             setPage={setPage}
//             recordSize={size}
//             count={data?.totalCount}
//             size={size}
//             setSize={setSize}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssetsPage;
