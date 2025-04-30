// import React, { useState } from "react";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import dayjs from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import {
//   Box,
//   Typography,
//   Drawer,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Checkbox,
//   TextField,
//   Button,
//   Grid,
//   Divider,
// } from "@mui/material";
// import axios from "axios";

// const MpAssignSettingDrawer = ({
//   open,
//   onClose,
//   equipments,
//   mpId,
//   onSuccess,
// }) => {
//   const [selectedId, setSelectedId] = useState(null);
//   const [formData, setFormData] = useState({
//     startValue: "",
//     sequenceValue: "",
//     sequenceDateValue: "",
//     resetDate: "",
//   });

//   const handleSelect = (equipment) => {
//     const isSelected = selectedId === equipment.id;
//     if (isSelected) {
//       // unselect
//       setSelectedId(null);
//       setFormData({
//         startValue: "",
//         sequenceValue: "",
//         sequenceDateValue: "",
//         resetDate: "",
//       });
//     } else {
//       // select and set startValue
//       setSelectedId(equipment.id);
//       setFormData((prev) => ({
//         ...prev,
//         startValue: equipment.currentValue ?? 0,
//       }));
//     }
//   };

//   const handleChange = (field) => (event) => {
//     setFormData((prev) => ({ ...prev, [field]: event.target.value }));
//   };
//   console.log("EQUIPMENTS:", equipments);

//   const handleSubmit = async () => {
//     if (!selectedId) return;
//     try {
//       await axios.post(`/api/MaintenanceSetting/assign`, {
//         equipmentId: selectedId,
//         maintenancePlanId: Number(mpId),
//         startValue: Number(formData.startValue),
//         sequenceValue: Number(formData.sequenceValue),
//         sequenceDateValue: Number(formData.sequenceDateValue),
//         resetDate: formData.resetDate,
//       });
//       onSuccess();
//       onClose();
//     } catch (error) {
//       console.error("Failed to assign setting:", error);
//     }
//   };

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: {
//           width: "50%",
//           height: "65%",
//           marginTop: "auto",
//           borderTopLeftRadius: 16,
//           borderBottomLeftRadius: 16,
//           overflow: "hidden",
//           p: 2,
//           bgcolor: "#f9f9f9",
//         },
//       }}
//     >
//       <Typography variant="h6" gutterBottom>
//         Assign Maintenance Setting
//       </Typography>

//       <Grid container spacing={2} mb={2}>
//         <Grid item xs={12} md={3}>
//           <TextField
//             fullWidth
//             label="Start Value"
//             value={formData.startValue}
//             disabled
//           />
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <TextField
//             fullWidth
//             label="Sequence Value"
//             value={formData.sequenceValue}
//             onChange={handleChange("sequenceValue")}
//             disabled={!selectedId}
//           />
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <TextField
//             fullWidth
//             label="Sequence Date Value"
//             value={formData.sequenceDateValue}
//             onChange={handleChange("sequenceDateValue")}
//             disabled={!selectedId}
//           />
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <TextField
//             fullWidth
//             label="Reset Date"
//             type="date"
//             value={formData.resetDate}
//             onChange={handleChange("resetDate")}
//             InputLabelProps={{ shrink: true }}
//             disabled={!selectedId}
//           />
//         </Grid>
//       </Grid>

//       <Divider sx={{ my: 2 }} />

//       <Box flexGrow={1} overflow="auto">
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>Select</TableCell>
//               <TableCell>ID</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Current Value</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {equipments?.items?.map((eq) => {
//               const isSelected = selectedId === eq.id;
//               return (
//                 <TableRow key={eq.id}>
//                   <TableCell>
//                     <Checkbox
//                       checked={isSelected}
//                       onChange={() => handleSelect(eq)}
//                       disabled={selectedId !== null && !isSelected}
//                     />
//                   </TableCell>
//                   <TableCell>{eq.id}</TableCell>
//                   <TableCell>{eq.name}</TableCell>
//                   <TableCell>{eq.description}</TableCell>
//                   <TableCell>
//                     <Box
//                       sx={{
//                         backgroundColor:
//                           eq.status?.toUpperCase() === "ACTIVE"
//                             ? "green"
//                             : "brown",
//                         color: "#fff",
//                         px: 1.5,
//                         py: 0.5,
//                         borderRadius: 1,
//                         fontSize: "0.75rem",
//                         textTransform: "capitalize",
//                         display: "inline-block",
//                       }}
//                     >
//                       {eq.status}
//                     </Box>
//                   </TableCell>
//                   <TableCell>{eq.currentValue ?? 0}</TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </Box>

//       <Box mt={2} display="flex" justifyContent="flex-end">
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSubmit}
//           disabled={!selectedId}
//         >
//           Assign Setting
//         </Button>
//       </Box>
//     </Drawer>
//   );
// };

// export default MpAssignSettingDrawer;

import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Box,
  Typography,
  Drawer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  TextField,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import axios from "axios";

const MpAssignSettingDrawer = ({
  open,
  onClose,
  equipments,
  mpId,
  onSuccess,
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    startValue: "",
    sequenceValue: "",
    sequenceDateValue: "",
    resetDate: "",
  });

  const handleSelect = (equipment) => {
    const isSelected = selectedId === equipment.id;
    if (isSelected) {
      setSelectedId(null);
      setFormData({
        startValue: "",
        sequenceValue: "",
        sequenceDateValue: "",
        resetDate: "",
      });
    } else {
      setSelectedId(equipment.id);
      setFormData((prev) => ({
        ...prev,
        startValue: equipment.currentValue ?? 0,
      }));
    }
  };

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  //   const handleSubmit = async () => {
  //     if (!selectedId) return;
  //     try {
  //       await axios.post(`/api/MaintenanceSetting/assign`, {
  //         equipmentId: selectedId,
  //         maintenancePlanId: Number(mpId),
  //         startValue: Number(formData.startValue),
  //         sequenceValue: Number(formData.sequenceValue),
  //         sequenceDateValue: Number(formData.sequenceDateValue),
  //         resetDate: formData.resetDate,
  //       });
  //       onSuccess();
  //       onClose();
  //     } catch (error) {
  //       console.error("Failed to assign setting:", error);
  //     }
  //   };

  const handleSubmit = async () => {
    if (!selectedId) return;

    const payload = {
      equipmentId: selectedId,
      maintenancePlanId: Number(mpId),
      startValue: Number(formData.startValue),
      sequenceValue: Number(formData.sequenceValue),
      sequenceDateValue: Number(formData.sequenceDateValue),
      resetDate: formData.resetDate,
    };

    console.log("📤 Payload to API:", payload); // 👈 Log here

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_API_MAINTENANCE_SETTING_ASSIGN
        }`,
        payload
      );
      onSuccess();
      onClose();
    } catch (error) {
     
      if (error.response) {
        console.error("Backend message:", error.response.data);
        console.error("Failed to assign setting:", error);
    }
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "50%",
          height: "65%",
          marginTop: "auto",
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          overflow: "hidden",
          p: 2,
          bgcolor: "#f9f9f9",
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        Assign Maintenance Setting
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Start Value"
            value={formData.startValue}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Sequence Value"
            value={formData.sequenceValue}
            onChange={handleChange("sequenceValue")}
            disabled={!selectedId}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Sequence Date Value"
            value={formData.sequenceDateValue}
            onChange={handleChange("sequenceDateValue")}
            disabled={!selectedId}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Reset Date"
              value={formData.resetDate ? dayjs(formData.resetDate) : null}
              onChange={(newValue) =>
                setFormData((prev) => ({
                  ...prev,
                  resetDate: newValue ? newValue.toISOString() : "",
                }))
              }
              disabled={!selectedId}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Box flexGrow={1} overflow="auto">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Current Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipments?.items?.map((eq) => {
              const isSelected = selectedId === eq.id;
              return (
                <TableRow key={eq.id}>
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handleSelect(eq)}
                      disabled={selectedId !== null && !isSelected}
                    />
                  </TableCell>
                  <TableCell>{eq.id}</TableCell>
                  <TableCell>{eq.name}</TableCell>
                  <TableCell>{eq.description}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        backgroundColor:
                          eq.status?.toUpperCase() === "ACTIVE"
                            ? "green"
                            : "brown",
                        color: "#fff",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: "0.75rem",
                        textTransform: "capitalize",
                        display: "inline-block",
                      }}
                    >
                      {eq.status}
                    </Box>
                  </TableCell>
                  <TableCell>{eq.currentValue ?? 0}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>

      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!selectedId}
        >
          Assign Setting
        </Button>
      </Box>
    </Drawer>
  );
};

export default MpAssignSettingDrawer;
