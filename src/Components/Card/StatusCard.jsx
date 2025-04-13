// src/Components/Cards/StatusCard.jsx

import React from "react";
import { Paper, Typography } from "@mui/material";

const StatusCard = ({ title, value, color }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        textAlign: "center",
        color: color || "inherit",
        borderTop: `4px solid ${color || "#1976d2"}`,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 500 }}>
        {title}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Paper>
  );
};

export default StatusCard;
