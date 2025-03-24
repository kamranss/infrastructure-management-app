import React, { useState, useEffect } from "react";
import { Menu } from "@mui/icons-material";
import { Bar, Pie } from "react-chartjs-2";
import DashboardSidebar from "../Components/SideBars/DashboardSidebar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  Box,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Logic for fetching data or initializing the chart (if needed)
  }, []);

  // Bar chart data
  const barData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sales Stats",
        data: [65, 59, 80, 81, 56],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  // Pie chart data
  const pieData = {
    labels: ["New Users", "Subscribed Users", "Inactive Users"],
    datasets: [
      {
        data: [500, 300, 200], // Sample data
        backgroundColor: [
          "rgba(75, 192, 192, 0.4)",
          "rgba(255, 159, 64, 0.4)",
          "rgba(153, 102, 255, 0.4)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <DashboardSidebar open={sidebarOpen} onClose={toggleSidebar} />
      <Box
        sx={{
          flexGrow: 1,
          ml: sidebarOpen ? "240px" : 0,
          transition: "margin 0.3s",
        }}
      >
        {/* AppBar with toggle button */}
        <AppBar
          position="static"
          // maxWidth="40px"
          style={{ maxWidth: "40px" }}
          sx={{ backgroundColor: "transparent" }}
        >
          <Toolbar
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              ml: 20,
              width: "40px",
              height: "40px",
              zIndex: 2000, // Make sure it's on top of everything
              // backgroundColor: "#fff",
              color: "#000",
              // border: "1px solid #ccc",
              // "&:hover": {
              //   backgroundColor: "#eee",
              // },
            }}
          >
            <IconButton
              color="inherit"
              onClick={toggleSidebar}
              edge="start"
              sx={{
                position: "absolute",
                // top: 8,
                // left: 8,
                // ml: 0.001,
                width: "40px",
                height: "40px",
                zIndex: 2000, // Make sure it's on top of everything
                backgroundColor: "#fff",
                color: "#000",
                border: "5px solid #ccc",
                "&:hover": {
                  backgroundColor: "#d2b7f2",
                },
              }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" sx={{ marginLeft: 2 }}></Typography>
          </Toolbar>
        </AppBar>

        {/* Content area with padding & margin if sidebar is open */}
        <Box
          sx={{
            padding: 3,
            marginLeft: sidebarOpen ? "240px" : 0,
            transition: "margin 0.3s",
          }}
        >
          {/* Your Grid/cards/charts here */}
          <Typography variant="h4" mb={2}>
            Welcome to the Dashboard
          </Typography>
          {/* Add your existing Grid with cards/charts here */}
        </Box>
      </Box>
      <Grid container spacing={3}>
        {/* Arrived Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: "#E3F2FD" }}>
            <CardContent>
              <Typography variant="h6" color="blue">
                Arrived
              </Typography>
              <Typography variant="body1">
                Arrived (port entry): 12.09.2025, 22:48
              </Typography>
              <Typography variant="body1">
                Arrived (on yard): 12.09.2025, 22:48
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Departed Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: "#F3E5F5" }}>
            <CardContent>
              <Typography variant="h6" color="purple">
                Departed
              </Typography>
              <Typography variant="body1">
                Departed (from yard): 12.09.2025, 22:48
              </Typography>
              <Typography variant="body1">
                Departed (port exit): 12.09.2025, 22:48
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Dwell Time Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: "#FFF3E0" }}>
            <CardContent>
              <Typography variant="h6" color="orange">
                Dwell Time
              </Typography>
              <Typography variant="body1">
                Storage dwell time: 5 days, 54 min
              </Typography>
              <Typography variant="body1">
                Total dwell time: 5 days, 54 min
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Planned Location Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: "#F1F8E9" }}>
            <CardContent>
              <Typography variant="h6" color="teal">
                Planned Location
              </Typography>
              <Typography variant="body1">Planned Area: Area</Typography>
              <Typography variant="body1">
                Planned Location: Location
              </Typography>
              <Typography variant="body1">
                Planned Position: Position
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid container spacing={3}>
          {/* Bar Chart Card */}
          <Grid item xs={12} sm={6} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Sales Overview</Typography>
                <div
                  style={{
                    maxWidth: "500px",
                    margin: "0 auto",
                    height: "300px",
                  }}
                >
                  <Bar data={barData} />
                </div>
              </CardContent>
            </Card>
          </Grid>

          {/* Pie Chart Card */}
          <Grid item xs={12} sm={6} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">User Distribution</Typography>
                <div
                  style={{
                    maxWidth: "500px",
                    margin: "0 auto",
                    height: "300px",
                  }}
                >
                  <Pie data={pieData} />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Other Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Other Information</Typography>
              <Typography variant="h4">Data</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Current Location Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: "#E8F5E9" }}>
            <CardContent>
              <Typography variant="h6" color="green">
                Current Location
              </Typography>
              <Typography variant="body1">Location details: Area</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
