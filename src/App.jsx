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
import EquipmentPage from "./pages/EquipmentPage";

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

          {/* Wrap the Routes inside ErrorBoundary */}
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/equipmentpage" element={<EquipmentPage />} />
              <Route path="/chat" element={<ChatPage />} />
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
