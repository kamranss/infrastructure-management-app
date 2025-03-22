import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FormRegister from "../Components/Forms/FormRegister";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Surname: "",
    UserName: "",
    Email: "",
    Password: "",
    ConfirmedPassword: "",
  });
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});
  // const history = useHistory(); // Initialize the history object

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(
        "https://localhost:7066/api/Account/register",

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response);

      if (response.status === 201) {
        // Redirect to the verifyEmail page upon receiving an OK response
        // navigate("/verifyEmail");
        localStorage.setItem("userEmail", formData.Email);
        localStorage.setItem("userOTP", "");
        window.location.href = "/verifyEmail";
      } else if (response.status === 400) {
        console.log("Response:", response);
        // Check if response data contains validation errors
        if (response.data && response.data.errors) {
          console.log("Validation errors:", response.data.errors);

          // Update the state with the validation errors
          setValidationErrors(response.data.errors);
        } else {
          console.error("Validation errors not found in response data.");
        }
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <Container className="register_Container" maxWidth="sm">
      <FormRegister
        formData={formData}
        validationErrors={validationErrors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export default Register;
