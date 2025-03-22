import React, { useEffect } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
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

// Register the chart.js components
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
