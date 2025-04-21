// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   CircularProgress,
//   Grid,
//   Typography,
//   Button,
//   Box,
//   Paper,
//   Card,
//   CardContent,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { App_Base_URL } from "../constants/apiRoutes";

// import AssetStatusChangeModal from "../Components/Modals/AssetStatusChangeModal";
// import AssetAddMpModal from "../Components/Modals/AssetAddMpModal";
// import AssetAddPartModal from "../Components/Modals/AssetAddPartModal";
// import AssetAddMpSettingModal from "../Components/Modals/AssetAddMpSettingModal";
// import TableAssetPart from "../Components/Tables/TableAssetPart";
// import TableAssetMp from "../Components/Tables/TableAssetMp";
// import TableEquipmentMp from "../Components/Tables/TableEquipmentMp";

// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
// } from "@tanstack/react-table";

// const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
// const AssetDetails = () => {
//   const { id: rowId } = useParams();
//   const [equipmentDetail, setEquipmentDetail] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const [modals, setModals] = useState({
//     status: false,
//     part: false,
//     mp: false,
//     delete: false,
//     mpSettings: false,
//   });

//   const toggleModal = (name, value = true) => {
//     setModals((prev) => ({ ...prev, [name]: value }));
//   };

//   useEffect(() => {
//     if (!rowId) return;

//     axios
//       .get(`https://localhost:7066/api/Equipment`, {
//         params: { id: rowId },
//       })
//       .then((response) => {
//         setEquipmentDetail(response.data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching equipment detail:", error);
//         setIsLoading(false);
//       });
//   }, [rowId]);

//   const refreshEquipmentDetails = async () => {
//     try {
//       const response = await axios.get(`https://localhost:7066/api/Equipment`, {
//         params: { id: rowId },
//       });
//       setEquipmentDetail(response.data);
//       setModals({
//         status: false,
//         part: false,
//         mp: false,
//         delete: false,
//         mpSettings: false,
//       });
//     } catch (error) {
//       console.error("Error refreshing equipment details:", error);
//     }
//   };

//   const mpColumns = [
//     { accessorKey: "name", header: "Name" },
//     { accessorKey: "description", header: "Description" },
//     { accessorKey: "dueDate", header: "Due Date" },
//   ];
//   const mpTable = useReactTable({
//     data: equipmentDetail?.mpList || [],
//     columns: mpColumns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   // const imageUrl = equipmentDetail?.imagUrl
//   //   ? `${imageBaseUrl}${equipmentDetail.imagUrl}`
//   // : null;

//   const imageUrl = "/assets/images/assetmanagement2.png";

//   if (isLoading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!equipmentDetail) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <Typography variant="h6" color="error">
//           No equipment detail found.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     // <Box p={2}>
//     //   <Grid container spacing={2} mb={2}>
//     //     {/* Card 1: Open Maintenance Plans */}
//     //     <Grid item xs={12} md={6}>
//     //       <Paper elevation={3} sx={{ p: 2 }}>
//     //         <Typography variant="h6" gutterBottom>
//     //           Open Maintenance Plans
//     //         </Typography>
//     //         <Typography variant="h4" color="primary">
//     //           {
//     //             (equipmentDetail?.mpList || []).filter(
//     //               (mp) => mp.status !== "COMPLETED"
//     //             ).length
//     //           }
//     //         </Typography>
//     //         <Box mt={2}>
//     //           {(equipmentDetail?.mpList || [])
//     //             .filter((mp) => mp.status !== "COMPLETED")
//     //             .slice(0, 5) // limit for now
//     //             .map((mp, index) => (
//     //               <Box key={index} mb={1}>
//     //                 <Typography variant="subtitle2">
//     //                   • {mp.name} — Due:{" "}
//     //                   {mp.dueDate
//     //                     ? new Date(mp.dueDate).toLocaleDateString()
//     //                     : "N/A"}
//     //                 </Typography>
//     //               </Box>
//     //             ))}
//     //         </Box>
//     //       </Paper>
//     //     </Grid>

//     //     {/* Card 2: Equipment Overview */}
//     //     <Grid item xs={12} md={6}>
//     //       <Paper elevation={3} sx={{ p: 2 }}>
//     //         <Typography variant="h6" gutterBottom>
//     //           Equipment Condition
//     //         </Typography>
//     //         <Typography variant="body1">
//     //           <strong>Condition:</strong>{" "}
//     //           {equipmentDetail.condition || "Not specified"}
//     //         </Typography>
//     //         <Typography variant="body1">
//     //           <strong>Cycle:</strong>{" "}
//     //           {equipmentDetail.cycle || "Unknown cycle info"}
//     //         </Typography>
//     //         <Typography variant="body1">
//     //           <strong>Runtime:</strong>{" "}
//     //           {equipmentDetail.runtimeHours
//     //             ? `${equipmentDetail.runtimeHours} hours`
//     //             : "Not available"}
//     //         </Typography>
//     //       </Paper>
//     //     </Grid>
//     //   </Grid>
//     //   <Grid container spacing={2}>
//     //     {/* Left Side - Info */}
//     //     <Grid item xs={12} md={6}>
//     //       <Paper elevation={3} sx={{ p: 2 }}>
//     //         <Typography variant="h5" gutterBottom>
//     //           Equipment Information
//     //         </Typography>
//     //         {[
//     //           "name",
//     //           "description",
//     //           "type",
//     //           "department",
//     //           "manufacture",
//     //           "model",
//     //           "operationSite",
//     //         ].map((key) => (
//     //           <Box
//     //             key={key}
//     //             display="flex"
//     //             justifyContent="space-between"
//     //             mb={1}
//     //           >
//     //             <Typography variant="body1" fontWeight="bold">
//     //               {key}:
//     //             </Typography>
//     //             <Typography variant="body1">
//     //               {equipmentDetail[key] || "-"}
//     //             </Typography>
//     //           </Box>
//     //         ))}
//     //       </Paper>
//     //     </Grid>

//     //     {/* Right Side - Status & Actions */}
//     //     <Grid item xs={12} md={6}>
//     //       <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
//     //         <Typography variant="h6" gutterBottom>
//     //           Status
//     //         </Typography>
//     //         <Typography
//     //           variant="body1"
//     //           sx={{
//     //             color: "white",
//     //             backgroundColor:
//     //               equipmentDetail.status === "ACTIVE"
//     //                 ? "green"
//     //                 : equipmentDetail.status === "INACTIVE"
//     //                 ? "gray"
//     //                 : equipmentDetail.status === "REPAIR"
//     //                 ? "orange"
//     //                 : equipmentDetail.status === "IN_USE"
//     //                 ? "blue"
//     //                 : equipmentDetail.status === "CONCERVATED"
//     //                 ? "purple"
//     //                 : "default",
//     //             p: 1,
//     //             borderRadius: 1,
//     //           }}
//     //         >
//     //           {equipmentDetail.status}
//     //         </Typography>

//     //         <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
//     //           <Button variant="contained" onClick={() => toggleModal("status")}>
//     //             Change Status
//     //           </Button>
//     //           <Button variant="outlined" onClick={() => toggleModal("part")}>
//     //             Add Part
//     //           </Button>
//     //           <Button variant="outlined" onClick={() => toggleModal("mp")}>
//     //             Add MP
//     //           </Button>
//     //           <Button
//     //             color="error"
//     //             variant="contained"
//     //             onClick={() => toggleModal("delete")}
//     //           >
//     //             Delete
//     //           </Button>
//     //           <Button
//     //             color="warning"
//     //             variant="contained"
//     //             onClick={() => toggleModal("mpSettings")}
//     //           >
//     //             Set Reset
//     //           </Button>
//     //         </Box>
//     //       </Paper>

//     //       <Paper elevation={3} sx={{ p: 2 }}>
//     //         <Typography variant="h6">Current Values</Typography>
//     //         {["currentValue", "squenceValue", "resetValue"].map((key) => (
//     //           <Box
//     //             key={key}
//     //             display="flex"
//     //             justifyContent="space-between"
//     //             mb={1}
//     //           >
//     //             <Typography variant="body1" fontWeight="bold">
//     //               {key}:
//     //             </Typography>
//     //             <Typography variant="body1">
//     //               {equipmentDetail[key] || "-"}
//     //             </Typography>
//     //           </Box>
//     //         ))}
//     //       </Paper>
//     //     </Grid>

//     //     {/* Tables */}
//     //     <Grid item xs={12} md={6}>
//     //       <Typography variant="h6" gutterBottom>
//     //         Maintenance Plans
//     //       </Typography>
//     //       <Paper>
//     //         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//     //           <thead>
//     //             {mpTable.getHeaderGroups().map((headerGroup) => (
//     //               <tr key={headerGroup.id}>
//     //                 {headerGroup.headers.map((header) => (
//     //                   <th
//     //                     key={header.id}
//     //                     style={{
//     //                       borderBottom: "1px solid gray",
//     //                       padding: "8px",
//     //                     }}
//     //                   >
//     //                     {flexRender(
//     //                       header.column.columnDef.header,
//     //                       header.getContext()
//     //                     )}
//     //                   </th>
//     //                 ))}
//     //               </tr>
//     //             ))}
//     //           </thead>
//     //           <tbody>
//     //             {mpTable.getRowModel().rows.map((row) => (
//     //               <tr key={row.id}>
//     //                 {row.getVisibleCells().map((cell) => (
//     //                   <td key={cell.id} style={{ padding: "8px" }}>
//     //                     {flexRender(
//     //                       cell.column.columnDef.cell,
//     //                       cell.getContext()
//     //                     )}
//     //                   </td>
//     //                 ))}
//     //               </tr>
//     //             ))}
//     //           </tbody>
//     //         </table>
//     //       </Paper>
//     //     </Grid>

//     //     <Grid item xs={12} md={6}>
//     //       <Typography variant="h6" gutterBottom>
//     //         Parts
//     //       </Typography>
//     //       <TableEquipmentPart parts={equipmentDetail.partList} />
//     //     </Grid>

//     //     {/* Image */}
//     //     <Grid item xs={12}>
//     //       <Typography variant="h6" gutterBottom>
//     //         Equipment Image
//     //       </Typography>
//     //       {imageUrl ? (
//     //         <Box
//     //           component="img"
//     //           src={imageUrl}
//     //           sx={{ width: 300, borderRadius: 2 }}
//     //         />
//     //       ) : (
//     //         <Typography>No image available</Typography>
//     //       )}
//     //     </Grid>
//     //   </Grid>

//     //   {/* Modals */}
//     //   <EquipmentStatusChangeModal
//     //     isOpen={modals.status}
//     //     onClose={() => toggleModal("status", false)}
//     //     equipmentId={equipmentDetail.id}
//     //     onStatusChangeSuccess={refreshEquipmentDetails}
//     //   />
//     //   <EquipmentAddPartModal
//     //     isOpen={modals.part}
//     //     onClose={() => toggleModal("part", false)}
//     //     equipmentId={equipmentDetail.id}
//     //     onMpaddSuccess={refreshEquipmentDetails}
//     //   />
//     //   <EquipmentAddMpModal
//     //     isOpen={modals.mp}
//     //     onClose={() => toggleModal("mp", false)}
//     //     equipmentId={equipmentDetail.id}
//     //     onMpaddSuccess={refreshEquipmentDetails}
//     //   />
//     //   <EquipmentAddMpSettingModal
//     //     isOpen={modals.mpSettings}
//     //     onClose={() => toggleModal("mpSettings", false)}
//     //     equipmentId={equipmentDetail.id}
//     //     onMpaddSuccess={refreshEquipmentDetails}
//     //   />
//     // </Box>
//     <Box p={2}>
//       <Grid container spacing={2}>
//         {/* Left Side */}
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               {/* Equipment Image */}
//             </Typography>
//             {imageUrl ? (
//               <Box
//                 component="img"
//                 src={imageUrl}
//                 alt="Equipment"
//                 sx={{
//                   width: "100%",
//                   maxHeight: 200,
//                   borderRadius: 2,
//                   objectFit: "cover",
//                 }}
//               />
//             ) : (
//               <Typography>No image available</Typography>
//             )}
//           </Paper>
//           <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
//             <Typography variant="h6">Status</Typography>
//             <Typography
//               sx={{
//                 color: "white",
//                 backgroundColor:
//                   equipmentDetail.status === "ACTIVE" ? "green" : "gray",
//                 p: 1,
//                 borderRadius: 1,
//               }}
//             >
//               {equipmentDetail.status}
//             </Typography>
//             <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
//               <Button variant="contained" onClick={() => toggleModal("status")}>
//                 Change Status
//               </Button>
//               <Button variant="outlined" onClick={() => toggleModal("part")}>
//                 Add Part
//               </Button>
//               <Button variant="outlined" onClick={() => toggleModal("mp")}>
//                 Add MP
//               </Button>
//               <Button
//                 variant="contained"
//                 color="error"
//                 onClick={() => toggleModal("delete")}
//               >
//                 Delete
//               </Button>
//               <Button
//                 variant="contained"
//                 color="warning"
//                 onClick={() => toggleModal("mpSettings")}
//               >
//                 Set Reset
//               </Button>
//             </Box>
//           </Paper>

//           <Paper elevation={3} sx={{ p: 2 }}>
//             <Typography variant="h6">Equipment Info</Typography>
//             {[
//               "name",
//               "description",
//               "type",
//               "department",
//               "manufacture",
//               "model",
//               "operationSite",
//             ].map((key) => (
//               <Box
//                 key={key}
//                 display="flex"
//                 justifyContent="space-between"
//                 mb={1}
//               >
//                 <Typography fontWeight="bold">{key}:</Typography>
//                 <Typography>{equipmentDetail[key] || "-"}</Typography>
//               </Box>
//             ))}
//           </Paper>
//         </Grid>

//         {/* Right Side */}
//         <Grid item xs={12} md={8}>
//           <Grid container spacing={2} mb={2}>
//             {/* Open Maintenance Plans Card */}
//             <Grid item xs={12} sm={6} md={4}>
//               <Card sx={{ backgroundColor: "#E3F2FD" }}>
//                 <CardContent>
//                   <Typography variant="h6" color="primary">
//                     Open Maintenance Plans
//                   </Typography>
//                   <Typography variant="h4">
//                     {
//                       (equipmentDetail?.mpList || []).filter(
//                         (mp) => mp.status !== "COMPLETED"
//                       ).length
//                     }
//                   </Typography>
//                   {(equipmentDetail?.mpList || [])
//                     .filter((mp) => mp.status !== "COMPLETED")
//                     .slice(0, 5)
//                     .map((mp, idx) => (
//                       <Typography variant="body2" key={idx}>
//                         • {mp.name} —{" "}
//                         {new Date(mp.dueDate).toLocaleDateString()}
//                       </Typography>
//                     ))}
//                 </CardContent>
//               </Card>
//             </Grid>

//             {/* Equipment Condition Card */}
//             <Grid item xs={12} sm={6} md={4}>
//               <Card sx={{ backgroundColor: "#F1F8E9" }}>
//                 <CardContent>
//                   <Typography variant="h6" color="success.main">
//                     Equipment Condition
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Condition:</strong>{" "}
//                     {equipmentDetail.condition || "Not specified"}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Cycle:</strong>{" "}
//                     {equipmentDetail.cycle || "Unknown cycle info"}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Runtime:</strong>{" "}
//                     {equipmentDetail.runtimeHours
//                       ? `${equipmentDetail.runtimeHours} hours`
//                       : "Not available"}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>

//             {/* Current Values Card */}
//             <Grid item xs={12} sm={6} md={4}>
//               <Card sx={{ backgroundColor: "#FFF3E0" }}>
//                 <CardContent>
//                   <Typography variant="h6" color="warning.main">
//                     Current Values
//                   </Typography>
//                   {["currentValue", "squenceValue", "resetValue"].map((key) => (
//                     <Typography variant="body1" key={key}>
//                       <strong>{key}:</strong> {equipmentDetail[key] || "-"}
//                     </Typography>
//                   ))}
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>

//           <Grid container spacing={2}>
//             {/* <Grid item xs={12} md={6}>
//               <Typography variant="h6">Maintenance Plans</Typography>
//               <Paper>
//                 <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                   <thead>
//                     {mpTable.getHeaderGroups().map((headerGroup) => (
//                       <tr key={headerGroup.id}>
//                         {headerGroup.headers.map((header) => (
//                           <th
//                             key={header.id}
//                             style={{
//                               padding: "8px",
//                               borderBottom: "1px solid gray",
//                             }}
//                           >
//                             {flexRender(
//                               header.column.columnDef.header,
//                               header.getContext()
//                             )}
//                           </th>
//                         ))}
//                       </tr>
//                     ))}
//                   </thead>
//                   <tbody>
//                     {mpTable.getRowModel().rows.map((row) => (
//                       <tr key={row.id}>
//                         {row.getVisibleCells().map((cell) => (
//                           <td key={cell.id} style={{ padding: "8px" }}>
//                             {flexRender(
//                               cell.column.columnDef.cell,
//                               cell.getContext()
//                             )}
//                           </td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </Paper>
//             </Grid> */}

//             <Grid item xs={12} md={6}>
//               <Typography variant="h6">Maintenance Plans</Typography>
//               <TableAssetMp maintenancePlans={equipmentDetail.mpList} />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Typography variant="h6">Parts</Typography>
//               <TableAssetPart parts={equipmentDetail.partList} />
//             </Grid>
//           </Grid>

//           {/* <Grid item xs={12} mt={2}>
//             <Typography variant="h6">Equipment Image</Typography>
//             {imageUrl ? (
//               <Box
//                 component="img"
//                 src={imageUrl}
//                 sx={{ width: 300, borderRadius: 2 }}
//               />
//             ) : (
//               <Typography>No image available</Typography>
//             )}
//           </Grid> */}
//         </Grid>
//       </Grid>

//       {/* Modals */}
//       <AssetStatusChangeModal
//         isOpen={modals.status}
//         onClose={() => toggleModal("status", false)}
//         equipmentId={equipmentDetail.id}
//         onStatusChangeSuccess={refreshEquipmentDetails}
//       />
//       <AssetAddPartModal
//         isOpen={modals.part}
//         onClose={() => toggleModal("part", false)}
//         equipmentId={equipmentDetail.id}
//         onMpaddSuccess={refreshEquipmentDetails}
//       />
//       <AssetAddMpModal
//         isOpen={modals.mp}
//         onClose={() => toggleModal("mp", false)}
//         equipmentId={equipmentDetail.id}
//         onMpaddSuccess={refreshEquipmentDetails}
//       />
//       <AssetAddMpSettingModal
//         isOpen={modals.mpSettings}
//         onClose={() => toggleModal("mpSettings", false)}
//         equipmentId={equipmentDetail.id}
//         onMpaddSuccess={refreshEquipmentDetails}
//       />
//     </Box>
//   );
// };

// export default AssetDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Grid, Typography, Box } from "@mui/material";

import { App_Base_URL } from "../constants/apiRoutes";

import AssetStatusChangeModal from "../Components/Modals/AssetStatusChangeModal";
import AssetAddMpModal from "../Components/Modals/AssetAddMpModal";
import AssetAddPartModal from "../Components/Modals/AssetAddPartModal";
import AssetAddMpSettingModal from "../Components/Modals/AssetAddMpSettingModal";
import TableAssetPart from "../Components/Tables/TableAssetPart";
import TableAssetMp from "../Components/Tables/TableAssetMp";

import AssetImageCard from "../Components/AssetDetailComponents/AssetImageCard";
import AssetStatusActions from "../Components/AssetDetailComponents/AssetStatusActions";
import AssetInfoCard from "../Components/AssetDetailComponents/AssetInfoCard";
import AssetSummaryCards from "../Components/AssetDetailComponents/AssetSummaryCards";

const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
const AssetDetails = () => {
  const { id: rowId } = useParams();
  const [equipmentDetail, setEquipmentDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [modals, setModals] = useState({
    status: false,
    part: false,
    mp: false,
    delete: false,
    mpSettings: false,
  });

  const toggleModal = (name, value = true) => {
    setModals((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!rowId) return;

    axios
      .get(`https://localhost:7066/api/Equipment`, {
        params: { id: rowId },
      })
      .then((response) => {
        setEquipmentDetail(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching equipment detail:", error);
        setIsLoading(false);
      });
  }, [rowId]);

  const refreshEquipmentDetails = async () => {
    try {
      const response = await axios.get(`https://localhost:7066/api/Equipment`, {
        params: { id: rowId },
      });
      setEquipmentDetail(response.data);
      setModals({
        status: false,
        part: false,
        mp: false,
        delete: false,
        mpSettings: false,
      });
    } catch (error) {
      console.error("Error refreshing equipment details:", error);
    }
  };

  const imageUrl = "/assets/images/assetmanagement2.png";

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!equipmentDetail) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography variant="h6" color="error">
          No equipment detail found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {/* Left Side */}
        <Grid item xs={12} md={4}>
          <AssetImageCard imageUrl={imageUrl} />
          <AssetStatusActions
            status={equipmentDetail.status}
            onToggle={toggleModal}
          />
          <AssetInfoCard detail={equipmentDetail} />
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} md={8}>
          <AssetSummaryCards detail={equipmentDetail} />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Maintenance Plans</Typography>
              <TableAssetMp maintenancePlans={equipmentDetail.mpList} />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6">Parts</Typography>
              <TableAssetPart parts={equipmentDetail.partList} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Modals */}
      <AssetStatusChangeModal
        isOpen={modals.status}
        onClose={() => toggleModal("status", false)}
        equipmentId={equipmentDetail.id}
        onStatusChangeSuccess={refreshEquipmentDetails}
      />
      <AssetAddPartModal
        isOpen={modals.part}
        onClose={() => toggleModal("part", false)}
        equipmentId={equipmentDetail.id}
        onMpaddSuccess={refreshEquipmentDetails}
      />
      <AssetAddMpModal
        isOpen={modals.mp}
        onClose={() => toggleModal("mp", false)}
        equipmentId={equipmentDetail.id}
        onMpaddSuccess={refreshEquipmentDetails}
      />
      <AssetAddMpSettingModal
        isOpen={modals.mpSettings}
        onClose={() => toggleModal("mpSettings", false)}
        equipmentId={equipmentDetail.id}
        onMpaddSuccess={refreshEquipmentDetails}
      />
    </Box>
  );
};

export default AssetDetails;
