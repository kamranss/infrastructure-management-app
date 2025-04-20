// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Grid,
//   Typography,
//   Button,
//   CircularProgress,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   MenuItem,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import axios from "axios";
// import CommonCard from "../Components/Common/CommonCard";
// import CommonTable from "../Components/Common/CommonTable";

// const MpDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [mpData, setMpData] = useState(null);
//   const [originalMpData, setOriginalMpData] = useState(null);
//   const [services, setServices] = useState([]);
//   const [equipments, setEquipments] = useState([]);
//   const [metricTypes, setMetricTypes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [statusDialog, setStatusDialog] = useState({
//     open: false,
//     value: null,
//   });
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "info",
//   });

//   const API_BASE = import.meta.env.VITE_API_BASE_URL;
//   const API_MP_ITEM = import.meta.env.VITE_API_MP_ITEM;
//   const API_MP_DELETE = import.meta.env.VITE_API_MP_DELETE;
//   const API_MP_TOGGLE_ACTIVE = import.meta.env.VITE_API_MP_TOGGLE_ACTIVE;
//   const API_MP_UPDATE = import.meta.env.VITE_API_MP_UPDATE;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [mpRes, metricsRes] = await Promise.all([
//           axios.get(`${API_BASE}${API_MP_ITEM}/${id}`),
//           axios.get(`${API_BASE}/api/MaintenancePlan/MetricType`),
//         ]);
//         setMpData(mpRes.data);
//         setOriginalMpData(mpRes.data);
//         setMetricTypes(metricsRes.data);
//       } catch (err) {
//         console.error("Failed to fetch MP or metrics:", err);
//       } finally {
//         setLoading(false);
//       }

//       axios
//         .get(`${API_BASE}/api/Service/ByMp/${id}`)
//         .then((res) => setServices(res.data))
//         .catch(() => setServices([]));
//       axios
//         .get(`${API_BASE}/api/Equipment/ByMp/${id}`)
//         .then((res) => setEquipments(res.data))
//         .catch(() => setEquipments([]));
//     };

//     if (id) fetchData();
//   }, [id]);

//   const handleDeleteConfirm = async () => {
//     try {
//       await axios.delete(`${API_BASE}${API_MP_DELETE}/${id}`);
//       setDeleteDialogOpen(false);
//       navigate("/maintenanceoverview");
//     } catch (err) {
//       console.error("Failed to delete MP:", err);
//       setDeleteDialogOpen(false);
//     }
//   };

//   const handleStatusChange = async () => {
//     try {
//       await axios.patch(
//         `${API_BASE}${API_MP_TOGGLE_ACTIVE}/${id}/IsActive`,
//         null,
//         {
//           params: { isActive: statusDialog.value },
//         }
//       );
//       const updated = await axios.get(`${API_BASE}${API_MP_ITEM}/${id}`);
//       setMpData(updated.data);
//       setStatusDialog({ open: false, value: null });
//       setSnackbar({
//         open: true,
//         message: "Status updated successfully",
//         severity: "success",
//       });
//     } catch (err) {
//       console.error("Failed to change status:", err);
//       setStatusDialog({ open: false, value: null });
//       setSnackbar({
//         open: true,
//         message: "Failed to update status",
//         severity: "error",
//       });
//     }
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(`${API_BASE}${API_MP_UPDATE}/${id}`, mpData);
//       setEditMode(false);
//       setSnackbar({
//         open: true,
//         message: "MP updated successfully",
//         severity: "success",
//       });
//       setOriginalMpData(mpData);
//     } catch (err) {
//       console.error("Update failed:", err);
//       setSnackbar({ open: true, message: "Update failed", severity: "error" });
//     }
//   };

//   const hasChanges = JSON.stringify(mpData) !== JSON.stringify(originalMpData);

//   const mpStatusColor =
//     mpData?.isActive === true
//       ? "green"
//       : mpData?.isActive === false
//       ? "gray"
//       : "purple";

//   const countReached = (mpData?.mpTimeList || []).filter(
//     (m) => m.isReached
//   ).length;

//   const serviceColumns = [
//     { field: "name", headerName: "Name" },
//     { field: "description", headerName: "Description" },
//     { field: "type", headerName: "Type" },
//   ];

//   const equipmentColumns = [
//     { field: "name", headerName: "Name" },
//     { field: "model", headerName: "Model" },
//     { field: "department", headerName: "Department" },
//   ];

//   if (loading)
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress />
//       </Box>
//     );

//   return (
//     <Box p={2}>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={4}>
//           <Paper sx={{ p: 2, mb: 2 }}>
//             <Typography variant="h6"></Typography>
//             <Typography
//               sx={{
//                 backgroundColor: mpStatusColor,
//                 color: "white",
//                 borderRadius: 1,
//                 p: 1,
//                 mt: 1,
//                 textAlign: "center",
//               }}
//             >
//               {mpData?.status || "-"} |{" "}
//               {mpData?.isActive ? "Active" : "Inactive"}
//             </Typography>
//             <Box mt={2} display="flex" gap={1} flexWrap="wrap">
//               <Button
//                 variant="outlined"
//                 color="success"
//                 onClick={() => setStatusDialog({ open: true, value: true })}
//               >
//                 Set Active
//               </Button>
//               <Button
//                 variant="outlined"
//                 color="warning"
//                 onClick={() => setStatusDialog({ open: true, value: false })}
//               >
//                 Set Inactive
//               </Button>
//             </Box>
//           </Paper>

//           <Paper sx={{ p: 2, mb: 2 }}>
//             <Typography variant="h6" mb={1}>
//               Actions
//             </Typography>
//             <Box display="flex" flexWrap="wrap" gap={1}>
//               <Button
//                 variant="contained"
//                 color="error"
//                 fullWidth
//                 onClick={() => setDeleteDialogOpen(true)}
//               >
//                 Delete
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 onClick={() => setEditMode(true)}
//               >
//                 Update
//               </Button>
//             </Box>
//           </Paper>

//           <CommonCard title="Maintenance Plan Info" color="#E3F2FD">
//             <Grid container spacing={2}>
//               {[
//                 ["name", "Name"],
//                 ["code", "Code"],
//                 ["description", "Description"],
//                 ["createdBy", "Created By"],
//                 ["modifiedBy", "Modified By"],
//               ].map(([field, label]) => (
//                 <Grid item xs={6} key={field}>
//                   <TextField
//                     label={label}
//                     value={mpData[field] || ""}
//                     onChange={(e) =>
//                       setMpData({ ...mpData, [field]: e.target.value })
//                     }
//                     fullWidth
//                     disabled={!editMode}
//                   />
//                 </Grid>
//               ))}
//               <Grid item xs={6}>
//                 <TextField
//                   select
//                   label="Metric Type"
//                   value={mpData.metricType || ""}
//                   onChange={(e) =>
//                     setMpData({ ...mpData, metricType: e.target.value })
//                   }
//                   fullWidth
//                   disabled={!editMode}
//                 >
//                   {metricTypes.map((option) => (
//                     <MenuItem key={option} value={option}>
//                       {option}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   label="Created Date"
//                   value={mpData.createdDate?.split("T")[0] || ""}
//                   fullWidth
//                   disabled
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   label="Updated Date"
//                   value={mpData.updatedDate?.split("T")[0] || ""}
//                   fullWidth
//                   disabled
//                 />
//               </Grid>
//               {editMode && (
//                 <Grid
//                   item
//                   xs={12}
//                   display="flex"
//                   justifyContent="flex-end"
//                   gap={2}
//                   mt={1}
//                 >
//                   <Button
//                     variant="outlined"
//                     color="inherit"
//                     onClick={() => {
//                       setEditMode(false);
//                       setMpData(originalMpData);
//                     }}
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="success"
//                     onClick={handleSave}
//                     disabled={!hasChanges}
//                   >
//                     Save
//                   </Button>
//                 </Grid>
//               )}
//             </Grid>
//           </CommonCard>
//         </Grid>

//         <Grid item xs={12} md={8}>
//           <Grid container spacing={2} mb={2}>
//             <Grid item xs={12} sm={4}>
//               <CommonCard title="Services in MP" color="#F1F8E9">
//                 <Typography variant="h4">{services.length}</Typography>
//               </CommonCard>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <CommonCard title="Used by Equipments" color="#FFF3E0">
//                 <Typography variant="h4">{equipments.length}</Typography>
//               </CommonCard>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <CommonCard title="Active MP Time Count" color="#FFEBEE">
//                 <Typography variant="h4">{countReached}</Typography>
//               </CommonCard>
//             </Grid>
//           </Grid>

//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <Typography variant="h6" gutterBottom>
//                 Services in this MP
//               </Typography>
//               <CommonTable columns={serviceColumns} rows={services} />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Typography variant="h6" gutterBottom>
//                 Equipments using this MP
//               </Typography>
//               <CommonTable columns={equipmentColumns} rows={equipments} />
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>

//       <Dialog
//         open={deleteDialogOpen}
//         onClose={() => setDeleteDialogOpen(false)}
//       >
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           Are you sure you want to delete this Maintenance Plan?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDeleteConfirm} color="error">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog
//         open={statusDialog.open}
//         onClose={() => setStatusDialog({ open: false, value: null })}
//       >
//         <DialogTitle>Confirm Status Change</DialogTitle>
//         <DialogContent>
//           Are you sure you want to set this MP as{" "}
//           <strong>{statusDialog.value ? "Active" : "Inactive"}</strong>?
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => setStatusDialog({ open: false, value: null })}
//             color="primary"
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleStatusChange}
//             color={statusDialog.value ? "success" : "warning"}
//           >
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//       >
//         <Alert
//           severity={snackbar.severity}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default MpDetail;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import CommonCard from "../Components/Common/CommonCard";
import CommonTable from "../Components/Common/CommonTable";

const MpDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mpData, setMpData] = useState(null);
  const [originalMpData, setOriginalMpData] = useState(null);
  const [services, setServices] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [metricTypes, setMetricTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusDialog, setStatusDialog] = useState({
    open: false,
    value: null,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const API_MP_ITEM = import.meta.env.VITE_API_MP_ITEM;
  const API_MP_DELETE = import.meta.env.VITE_API_MP_DELETE;
  const API_MP_TOGGLE_ACTIVE = import.meta.env.VITE_API_MP_TOGGLE_ACTIVE;
  const API_MP_UPDATE = import.meta.env.VITE_API_MP_UPDATE;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mpRes, metricsRes] = await Promise.all([
          axios.get(`${API_BASE}${API_MP_ITEM}/${id}`),
          axios.get(`${API_BASE}/api/MaintenancePlan/MetricType`),
        ]);
        setMpData(mpRes.data);
        setOriginalMpData(mpRes.data);
        setMetricTypes(metricsRes.data);
      } catch (err) {
        console.error("Failed to fetch MP or metrics:", err);
      } finally {
        setLoading(false);
      }

      axios
        .get(`${API_BASE}/api/Service/ByMp/${id}`)
        .then((res) => setServices(res.data))
        .catch(() => setServices([]));
      axios
        .get(`${API_BASE}/api/Equipment/ByMp/${id}`)
        .then((res) => setEquipments(res.data))
        .catch(() => setEquipments([]));
    };

    if (id) fetchData();
  }, [id]);

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${API_BASE}${API_MP_DELETE}/${id}`);
      setDeleteDialogOpen(false);
      navigate("/maintenanceoverview");
    } catch (err) {
      console.error("Failed to delete MP:", err);
      setDeleteDialogOpen(false);
    }
  };

  const handleStatusChange = async () => {
    try {
      await axios.patch(
        `${API_BASE}${API_MP_TOGGLE_ACTIVE}/${id}/IsActive`,
        null,
        {
          params: { isActive: statusDialog.value },
        }
      );
      const updated = await axios.get(`${API_BASE}${API_MP_ITEM}/${id}`);
      setMpData(updated.data);
      setStatusDialog({ open: false, value: null });
      setSnackbar({
        open: true,
        message: "Status updated successfully",
        severity: "success",
      });
    } catch (err) {
      console.error("Failed to change status:", err);
      setStatusDialog({ open: false, value: null });
      setSnackbar({
        open: true,
        message: "Failed to update status",
        severity: "error",
      });
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API_BASE}${API_MP_UPDATE}/${id}`, {
        id: Number(id),
        code: mpData.code,
        name: mpData.name,
        description: mpData.description,
        metricType: mpData.metricType,
      });
      setEditMode(false);
      setSnackbar({
        open: true,
        message: "MP updated successfully",
        severity: "success",
      });
      setOriginalMpData(mpData);
    } catch (err) {
      console.error("Update failed:", err);
      setSnackbar({ open: true, message: "Update failed", severity: "error" });
    }
  };

  const hasChanges = JSON.stringify(mpData) !== JSON.stringify(originalMpData);

  const mpStatusColor =
    mpData?.isActive === true
      ? "green"
      : mpData?.isActive === false
      ? "gray"
      : "purple";

  const countReached = (mpData?.mpTimeList || []).filter(
    (m) => m.isReached
  ).length;

  const serviceColumns = [
    { field: "name", headerName: "Name" },
    { field: "description", headerName: "Description" },
    { field: "type", headerName: "Type" },
  ];

  const equipmentColumns = [
    { field: "name", headerName: "Name" },
    { field: "model", headerName: "Model" },
    { field: "department", headerName: "Department" },
  ];

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6"></Typography>
            <Typography
              sx={{
                backgroundColor: mpStatusColor,
                color: "white",
                borderRadius: 1,
                p: 1,
                mt: 1,
                textAlign: "center",
              }}
            >
              {mpData?.status || "-"} |{" "}
              {mpData?.isActive ? "Active" : "Inactive"}
            </Typography>
            <Box mt={2} display="flex" gap={1} flexWrap="wrap">
              <Button
                variant="outlined"
                color="success"
                onClick={() => setStatusDialog({ open: true, value: true })}
              >
                Set Active
              </Button>
              <Button
                variant="outlined"
                color="warning"
                onClick={() => setStatusDialog({ open: true, value: false })}
              >
                Set Inactive
              </Button>
            </Box>
          </Paper>

          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" mb={1}>
              Actions
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setEditMode(true)}
              >
                Update
              </Button>
            </Box>
          </Paper>

          <CommonCard title="Maintenance Plan Info" color="#E3F2FD">
            <Grid container spacing={2}>
              {["name", "code", "description", "createdBy", "modifiedBy"].map(
                (field, idx) => (
                  <Grid item xs={6} key={field}>
                    <TextField
                      label={field
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^\w/, (c) => c.toUpperCase())}
                      value={mpData[field] || ""}
                      onChange={(e) =>
                        setMpData({ ...mpData, [field]: e.target.value })
                      }
                      fullWidth
                      disabled={!editMode || field === "modifiedBy"}
                    />
                  </Grid>
                )
              )}
              <Grid item xs={6}>
                <TextField
                  select
                  label="Metric Type"
                  value={mpData.metricType || ""}
                  onChange={(e) =>
                    setMpData({ ...mpData, metricType: e.target.value })
                  }
                  fullWidth
                  disabled={!editMode}
                >
                  {metricTypes.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Created Date"
                  value={mpData.createdDate?.split("T")[0] || ""}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Updated Date"
                  value={mpData.updatedDate?.split("T")[0] || ""}
                  fullWidth
                  disabled
                />
              </Grid>
              {editMode && (
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="flex-end"
                  gap={2}
                  mt={1}
                >
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => {
                      setEditMode(false);
                      setMpData(originalMpData);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSave}
                    disabled={!hasChanges}
                  >
                    Save
                  </Button>
                </Grid>
              )}
            </Grid>
          </CommonCard>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={4}>
              <CommonCard title="Services in MP" color="#F1F8E9">
                <Typography variant="h4">{services.length}</Typography>
              </CommonCard>
            </Grid>
            <Grid item xs={12} sm={4}>
              <CommonCard title="Used by Equipments" color="#FFF3E0">
                <Typography variant="h4">{equipments.length}</Typography>
              </CommonCard>
            </Grid>
            <Grid item xs={12} sm={4}>
              <CommonCard title="Active MP Time Count" color="#FFEBEE">
                <Typography variant="h4">{countReached}</Typography>
              </CommonCard>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Services in this MP
              </Typography>
              <CommonTable columns={serviceColumns} rows={services} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Equipments using this MP
              </Typography>
              <CommonTable columns={equipmentColumns} rows={equipments} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this Maintenance Plan?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={statusDialog.open}
        onClose={() => setStatusDialog({ open: false, value: null })}
      >
        <DialogTitle>Confirm Status Change</DialogTitle>
        <DialogContent>
          Are you sure you want to set this MP as{" "}
          <strong>{statusDialog.value ? "Active" : "Inactive"}</strong>?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setStatusDialog({ open: false, value: null })}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleStatusChange}
            color={statusDialog.value ? "success" : "warning"}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MpDetail;
