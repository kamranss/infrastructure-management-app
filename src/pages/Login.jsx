import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box"; // Added Box for margin and padding

const Login = () => {
  const [formData, setFormData] = useState({
    UserNameOrEmail: "",
    Password: "",
    RememberMe: false,
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "https://localhost:7066/api/Account/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Login successful", response);

      if (response.status === 200) {
        // Login successful
        if (response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
          window.location.href = "/home";
        }
      } else if (response.status === 400) {
        // Validation errors
        setValidationErrors(response.data);
      } else {
        // Handle other error cases
        console.error("Login error", response);
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <Container
      className="login_Container"
      maxWidth="sm"
      width="1450px"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box mb={2}>
              {" "}
              {/* Added margin-bottom */}
              <TextField
                fullWidth
                variant="outlined"
                label="Username or Email"
                name="UserNameOrEmail"
                value={formData.UserNameOrEmail}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                  style: { color: "#0f6466" }, // Customize placeholder color
                }}
              />
              {validationErrors.UserNameOrEmail && (
                <span className="validation-error">
                  {validationErrors.UserNameOrEmail}
                </span>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mb={2}>
              {" "}
              {/* Added margin-bottom */}
              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                name="Password"
                type="password"
                value={formData.Password}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                  style: { color: "#0f6466" }, // Customize placeholder color
                }}
              />
              {validationErrors.Password && (
                <span className="validation-error">
                  {validationErrors.Password}
                </span>
              )}
            </Box>
          </Grid>
        </Grid>
        <Box mt={2}>
          {" "}
          {/* Added margin-top */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Box>
      </form>
      <Box mt={2} textAlign="center">
        <NavLink to="/Register">
          Don't have an account?{" "}
          <span className="register_here">Register here</span>
        </NavLink>
      </Box>
    </Container>
  );
};

export default Login;
