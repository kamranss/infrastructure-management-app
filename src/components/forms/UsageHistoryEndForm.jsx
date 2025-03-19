import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const UsageHistoryEndForm = ({ rowId, handleClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [endDate, setEndDate] = useState("");
  const [endUsageHourValue, setEndUsageHourValue] = useState("");

  const MySwal = withReactContent(Swal);
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});

    // Create a FormData object
    const formData = new FormData();
    const formattedEndDate = formatDate(endDate);
    formData.append("EndDate", formattedEndDate || null);
    formData.append("EndUsageHourValue", endUsageHourValue || null);
    formData.append("UsageHistoryId", rowId || null);

    try {
      // Send the PATCH request
      const response = await fetch(
        "https://localhost:7066/api/UsageHistory/EndUsageHistory",
        {
          method: "PATCH",
          body: formData,
        }
      );

      // Handle the response, e.g., show a success message
      if (response.ok) {
        handleClose();
        MySwal.fire({
          icon: "success",
          title: "Success!",
          text: "UH ended successfully.",
          customClass: {
            // Add your custom CSS class here for SweetAlert2 modal
            popup: "my-swal-modal",
          },
        }).then(() => {
          window.location.href = "/UsageHistory";
          // closeModal();
        });

        // Clear the form fields
        setEndDate("");
        setEndUsageHourValue("");
      } else if (response.status === 400) {
        // Bad request with validation errors
        const errorData = await response.json();
        console.log("Validation errors:", errorData);

        // Update the state with the validation errors
        setValidationErrors(errorData.errors);
      } else {
        const errorMessage = await response.text();
        console.error("Error:", errorMessage);
      }
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error submitting data:", error);
      // Show an error message using SweetAlert2
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit data. Please try again later.",
      });
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString();
  };

  return (
    <form className="uh_Form_Container" onSubmit={handleSubmit}>
      <FormGroup className="formGroup">
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            classes: {
              root: "inputRoot",
              focused: "inputFocused",
            },
          }}
        />
      </FormGroup>
      <FormGroup className="formGroup">
        <TextField
          label="End Usage Hour Value"
          type="text"
          value={endUsageHourValue}
          onChange={(e) => setEndUsageHourValue(e.target.value)}
          required
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            classes: {
              root: "inputRoot",
              focused: "inputFocused",
            },
          }}
        />
      </FormGroup>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default UsageHistoryEndForm;
