import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import PaginationComponent2 from "../Common/PaginationComponent2";
import axios from "axios";

const MpServiceDrawer = ({ open, onClose, maintenancePlan, equipmentId }) => {
  const [services, setServices] = useState({ items: [], totalCount: 0 });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const fetchServices = async (pageNumber = 1) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_API_MP_SERVICES_BY_MP
        }/${maintenancePlan?.id}`,
        {
          params: { pageNumber, pageSize },
        }
      );
      console.log("Service data:", res.data);
      setServices(res.data || { items: [], totalCount: 0 });
    } catch (error) {
      console.error("Failed to fetch services:", error);
      setServices({ items: [], totalCount: 0 });
    }
  };

  useEffect(() => {
    if (open && maintenancePlan?.id) {
      fetchServices(page);
    }
  }, [open, maintenancePlan?.id, page, pageSize]);

  const renderActionButton = (type) => {
    switch (type?.toLowerCase()) {
      case "replace":
        return <Button variant="outlined">Replace</Button>;
      case "refill":
        return <Button variant="outlined">Refill</Button>;
      case "checkup":
        return <Button variant="outlined">Checkup</Button>;
      default:
        return <span style={{ color: "gray" }}>Unknown</span>;
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "37%",
          height: "65%",
          marginTop: "17%",
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          overflow: "hidden",
          p: 2,
          bgcolor: "#f9f9f9",
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        Maintenance Plan Services
      </Typography>

      {/* Top Card */}
      <Box p={2} mb={2} borderRadius={2} bgcolor="#e3f2fd">
        <Typography variant="subtitle1" fontWeight="bold">
          {maintenancePlan?.name || "N/A"}
        </Typography>
        <Typography variant="body2">
          {maintenancePlan?.description || "No description"}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Service Table */}
      <Box component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Service Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.items.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.serviceDescription}</TableCell>
                <TableCell>{service.serviceType}</TableCell>
                <TableCell>{renderActionButton(service.serviceType)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <PaginationComponent2
        size={pageSize}
        setSize={setPageSize}
        page={page}
        setPage={setPage}
        count={services.totalCount}
        recordSize={pageSize}
      />
    </Drawer>
  );
};

export default MpServiceDrawer;
