import "./App.scss";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderNav from "./Components/Common/HeaderNav";
import Header from "./Components/Common/Header";
import Dashboard from "./pages/dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatPage from "./pages/ChatPage";
import ErrorBoundary from "./Components/ErrorBoundary";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Grid } from "@mui/material";
import "font-awesome/css/font-awesome.min.css";
import { useLocation } from "react-router-dom";
import AssetsPage from "./pages/AssetsPage";
import InventoryPage from "./pages/InventoryPage";
import AssetDetails from "./pages/AssetDetails";
import AssetCreate from "./pages/AssetCreate";
import MaintenanceOverview from "./pages/MaintenanceOverview";
import MpDetail from "./pages/MpDetail";
import AssetUtilization from "./pages/AssetUtilization";

// const isAssetDetailsPage = location.pathname.startsWith("/assetdetails");
// const imageUrl = "/assets/images/assetmanagement.png";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const App = () => {
  const location = useLocation();

  // Hide HeaderNav and header for Login and Register pages
  const hideHeader =
    location.pathname === "/login" || location.pathname === "/register";
  const hideHeaderNav =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <ThemeProvider theme={theme} style={{ width: "100%" }}>
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flexGrow: 1 }}>
          {/* Conditionally render HeaderNav and Header */}
          {!hideHeader && <Header />}
          {!hideHeaderNav && <HeaderNav />}

          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/assetsPage" element={<AssetsPage />} />
              <Route path="/inventorypage" element={<InventoryPage />} />{" "}
              <Route path="/assetdetails/:id" element={<AssetDetails />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/assetcreate" element={<AssetCreate />} />
              <Route path="/maintenance-plan/:id" element={<MpDetail />} />
              <Route path="/usageHistory" element={<AssetUtilization />} />
              <Route
                path="/maintenanceoverview"
                element={<MaintenanceOverview />}
              />
            </Routes>
          </ErrorBoundary>
        </div>
      </Box>
    </ThemeProvider>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
