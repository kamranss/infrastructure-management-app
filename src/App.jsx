import "./App.scss";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderNav from "./components/Common/HeaderNav";
import Dashboard from "./pages/dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorBoundary from "./Components/ErrorBoundary";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Grid } from "@mui/material";
import "font-awesome/css/font-awesome.min.css";
import { useLocation } from "react-router-dom";

// Theme customization
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

  // Hide HeaderNav for Login and Register pages
  const hideHeaderNav =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <ThemeProvider theme={theme} style={{ width: "100%" }}>
      {/* Set height to 100vh to make the page use full height */}
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          minHeight: "100vh", // Ensure the full page is covered
          width: "100%",
          display: "flex",
          flexDirection: "column", // Stack content vertically
        }}
      >
        <div style={{ flexGrow: 1 }}>
          {/* Conditionally render HeaderNav */}
          {!hideHeaderNav && <HeaderNav />}

          {/* Wrap the Routes inside ErrorBoundary */}
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Add more routes here as needed */}
            </Routes>
          </ErrorBoundary>
        </div>
      </Box>
    </ThemeProvider>
  );
};

const AppWrapper = () => (
  <Router>
    <App /> {/* Router wrapper around the App */}
  </Router>
);

export default AppWrapper;
