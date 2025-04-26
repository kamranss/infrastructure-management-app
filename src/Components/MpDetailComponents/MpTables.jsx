import React from "react";
import { Grid, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CommonTable from "../Common/CommonTable";

const MpTables = ({ services, equipments, onRemoveService }) => {
  const serviceColumns = [
    { field: "name", headerName: "Name" },
    { field: "description", headerName: "Description" },
    { field: "type", headerName: "Type" },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => onRemoveService(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const equipmentColumns = [
    { field: "name", headerName: "Name" },
    { field: "model", headerName: "Model" },
    { field: "department", headerName: "Department" },
  ];

  return (
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
  );
};

export default MpTables;
