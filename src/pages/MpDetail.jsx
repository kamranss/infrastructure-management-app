// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Box, CircularProgress, Snackbar, Alert, Grid } from "@mui/material";
// import axios from "axios";

// import MpStatusCard from "../Components/MpDetailComponents/MpStatusCard";
// import MpActionsCard from "../Components/MpDetailComponents/MpActionsCard";
// import MpInfoForm from "../Components/MpDetailComponents/MpInfoForm";
// import MpSummaryCards from "../Components/MpDetailComponents/MpSummaryCards";
// import MpTables from "../Components/MpDetailComponents/MpTables";
// import MpDialogs from "../Components/MpDetailComponents/MpDialogs";
// import MpAddServiceModal from "../Components/MpDetailComponents/MpAddServiceModal"; // ✅ Modal import

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
//   const [isServiceModalOpen, setIsServiceModalOpen] = useState(false); // ✅ New

//   const API_BASE = import.meta.env.VITE_API_BASE_URL;
//   const API_MP_ITEM = import.meta.env.VITE_API_MP_ITEM;
//   const API_MP_METRIC_TYPES = import.meta.env.VITE_API_MP_METRIC_TYPES;
//   const API_MP_SERVICES_BY_MP = import.meta.env.VITE_API_MP_SERVICES_BY_MP;
//   const API_MP_EQUIPMENTS_BY_MP = import.meta.env.VITE_API_MP_EQUIPMENTS_BY_MP;
//   const API_MP_DELETE = import.meta.env.VITE_API_MP_DELETE;
//   const API_MP_TOGGLE_ACTIVE = import.meta.env.VITE_API_MP_TOGGLE_ACTIVE;
//   const API_MP_UPDATE = import.meta.env.VITE_API_MP_UPDATE;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [mpRes, metricsRes] = await Promise.all([
//           axios.get(`${API_BASE}${API_MP_ITEM}/${id}`),
//           axios.get(`${API_BASE}${API_MP_METRIC_TYPES}`),
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
//         .get(`${API_BASE}${API_MP_SERVICES_BY_MP}/${id}`)
//         .then((res) => setServices(res.data))
//         .catch(() => setServices([]));

//       axios
//         .get(`${API_BASE}${API_MP_EQUIPMENTS_BY_MP}/${id}`)
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

//   const handleStatusChange = async (newStatus) => {
//     try {
//       await axios.patch(
//         `${API_BASE}${API_MP_TOGGLE_ACTIVE}/${id}/IsActive`,
//         null,
//         { params: { isActive: newStatus } }
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
//       await axios.put(`${API_BASE}${API_MP_UPDATE}/${id}`, {
//         id: Number(id),
//         code: mpData.code,
//         name: mpData.name,
//         description: mpData.description,
//         metricType: mpData.metricType,
//       });
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

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box p={2}>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={4}>
//           <MpStatusCard
//             status={mpData?.status}
//             isActive={mpData?.isActive}
//             onSetStatus={(newStatus) =>
//               setStatusDialog({ open: true, value: newStatus })
//             }
//           />
//           <MpActionsCard
//             onDelete={() => setDeleteDialogOpen(true)}
//             onEdit={() => setEditMode(true)}
//             onAddServices={() => setIsServiceModalOpen(true)} // ✅
//           />
//           <MpInfoForm
//             mpData={mpData}
//             setMpData={setMpData}
//             originalMpData={originalMpData}
//             editMode={editMode}
//             metricTypes={metricTypes}
//             onCancel={() => {
//               setEditMode(false);
//               setMpData(originalMpData);
//             }}
//             onSave={handleSave}
//             hasChanges={hasChanges}
//           />
//         </Grid>

//         <Grid item xs={12} md={8}>
//           <MpSummaryCards
//             services={services}
//             equipments={equipments}
//             mpData={mpData}
//           />
//           <MpTables services={services} equipments={equipments} />
//         </Grid>
//       </Grid>

//       <MpDialogs
//         deleteDialogOpen={deleteDialogOpen}
//         onCloseDelete={() => setDeleteDialogOpen(false)}
//         onConfirmDelete={handleDeleteConfirm}
//         statusDialog={statusDialog}
//         onCloseStatus={() => setStatusDialog({ open: false, value: null })}
//         onConfirmStatus={(value) => handleStatusChange(value)}
//       />

//       <MpAddServiceModal
//         isOpen={isServiceModalOpen}
//         onClose={() => setIsServiceModalOpen(false)}
//         mpId={id}
//         onServiceAddSuccess={() => {
//           axios
//             .get(`${API_BASE}${API_MP_SERVICES_BY_MP}/${id}`)
//             .then((res) => setServices(res.data))
//             .catch(() => setServices([]));
//         }}
//       />

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
import { Box, CircularProgress, Snackbar, Alert, Grid } from "@mui/material";
import axios from "axios";

import MpStatusCard from "../Components/MpDetailComponents/MpStatusCard";
import MpActionsCard from "../Components/MpDetailComponents/MpActionsCard";
import MpInfoForm from "../Components/MpDetailComponents/MpInfoForm";
import MpSummaryCards from "../Components/MpDetailComponents/MpSummaryCards";
import MpTables from "../Components/MpDetailComponents/MpTables";
import MpDialogs from "../Components/MpDetailComponents/MpDialogs";
import MpAddServiceModal from "../Components/MpDetailComponents/MpAddServiceModal";

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
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const API_MP_ITEM = import.meta.env.VITE_API_MP_ITEM;
  const API_MP_METRIC_TYPES = import.meta.env.VITE_API_MP_METRIC_TYPES;
  const API_MP_SERVICES_BY_MP = import.meta.env.VITE_API_MP_SERVICES_BY_MP;
  const API_MP_EQUIPMENTS_BY_MP = import.meta.env.VITE_API_MP_EQUIPMENTS_BY_MP;
  const API_MP_DELETE = import.meta.env.VITE_API_MP_DELETE;
  const API_MP_TOGGLE_ACTIVE = import.meta.env.VITE_API_MP_TOGGLE_ACTIVE;
  const API_MP_UPDATE = import.meta.env.VITE_API_MP_UPDATE;
  const API_MP_REMOVE_SERVICE = import.meta.env.VITE_API_MP_REMOVE_SERVICE;

  const fetchMpAndMetrics = async () => {
    try {
      const [mpRes, metricsRes] = await Promise.all([
        axios.get(`${API_BASE}${API_MP_ITEM}/${id}`),
        axios.get(`${API_BASE}${API_MP_METRIC_TYPES}`),
      ]);
      setMpData(mpRes.data);
      setOriginalMpData(mpRes.data);
      setMetricTypes(metricsRes.data);
    } catch (error) {
      console.error("Failed to fetch MP or metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API_BASE}${API_MP_SERVICES_BY_MP}/${id}`, {
        params: {
          page: 1,
          pageSize: 10,
        },
      });
      setServices(res.data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
      setServices([]);
    }
  };
  const fetchEquipments = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}${API_MP_EQUIPMENTS_BY_MP.replace("{mpId}", id)}`
      );
      setEquipments(res.data);
    } catch (error) {
      console.warn("Equipments API not ready yet:", error);
      setEquipments([]);
    }
  };

  const fetchServicesAndEquipments = async () => {
    await fetchServices();
    await fetchEquipments();
  };

  useEffect(() => {
    if (id) {
      fetchMpAndMetrics();
      fetchServicesAndEquipments();
    }
  }, [id]);

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${API_BASE}${API_MP_DELETE}/${id}`);
      navigate("/maintenanceoverview");
    } catch (error) {
      console.error("Failed to delete MP:", error);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.patch(
        `${API_BASE}${API_MP_TOGGLE_ACTIVE}/${id}/IsActive`,
        null,
        { params: { isActive: newStatus } }
      );
      const updated = await axios.get(`${API_BASE}${API_MP_ITEM}/${id}`);
      setMpData(updated.data);
      setStatusDialog({ open: false, value: null });
      setSnackbar({
        open: true,
        message: "Status updated",
        severity: "success",
      });
    } catch (error) {
      console.error("Failed to update status:", error);
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
      setOriginalMpData(mpData);
      setSnackbar({ open: true, message: "MP updated", severity: "success" });
    } catch (error) {
      console.error("Failed to update MP:", error);
      setSnackbar({ open: true, message: "Update failed", severity: "error" });
    }
  };

  const handleRemoveService = async (serviceId) => {
    if (!confirm("Are you sure you want to remove this service?")) return;
    try {
      await axios.delete(
        `${API_BASE}${API_MP_REMOVE_SERVICE}/${id}/RemoveService`,
        {
          params: { serviceId },
        }
      );
      setSnackbar({
        open: true,
        message: "Service removed",
        severity: "success",
      });
      fetchServices(); // Only reload services
    } catch (error) {
      console.error("Failed to remove service:", error);
      setSnackbar({
        open: true,
        message: "Failed to remove service",
        severity: "error",
      });
    }
  };

  const hasChanges = JSON.stringify(mpData) !== JSON.stringify(originalMpData);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <MpStatusCard
            status={mpData?.status}
            isActive={mpData?.isActive}
            onSetStatus={(newStatus) =>
              setStatusDialog({ open: true, value: newStatus })
            }
          />
          <MpActionsCard
            onDelete={() => setDeleteDialogOpen(true)}
            onEdit={() => setEditMode(true)}
            onAddServices={() => setIsServiceModalOpen(true)}
          />
          <MpInfoForm
            mpData={mpData}
            setMpData={setMpData}
            originalMpData={originalMpData}
            editMode={editMode}
            metricTypes={metricTypes}
            onCancel={() => {
              setEditMode(false);
              setMpData(originalMpData);
            }}
            onSave={handleSave}
            hasChanges={hasChanges}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <MpSummaryCards
            services={services}
            equipments={equipments}
            mpData={mpData}
          />
          <MpTables
            services={services}
            equipments={equipments}
            onRemoveService={handleRemoveService}
          />
        </Grid>
      </Grid>

      <MpDialogs
        deleteDialogOpen={deleteDialogOpen}
        onCloseDelete={() => setDeleteDialogOpen(false)}
        onConfirmDelete={handleDeleteConfirm}
        statusDialog={statusDialog}
        onCloseStatus={() => setStatusDialog({ open: false, value: null })}
        onConfirmStatus={(value) => handleStatusChange(value)}
      />

      <MpAddServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        mpId={id}
        onServiceAddSuccess={fetchServices}
      />

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
