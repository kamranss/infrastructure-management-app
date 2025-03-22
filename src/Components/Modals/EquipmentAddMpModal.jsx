import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import {
  FormGroup,
  FormLabel,
  Button,
  TextField,
  styled,
  Autocomplete,
  debounce,
  Modal,
} from "@mui/material";

const EquipmentAddMpModal = ({
  isOpen,
  onClose,
  equipmentId,
  onMpaddSuccess,
}) => {
  const MySwal = withReactContent(Swal);

  const [validationErrors, setValidationErrors] = useState({});

  const [mpOption, setMpOptions] = useState([]);
  const [selectedMpId, setSelecMpId] = useState("");
  const [selectedMp, setSelectedMp] = useState(null);
  // const [selectedStatus, setSelectedStatus] = useState("");
  // const [selectedStatusId, setSelectedStatusId] = useState(""); // State to hold selected model ID
  const [searchQueryforStatus, setSearchQueryforStatus] = useState("");
  const [formDataa, setFormData] = useState({});

  const useStyles = styled((theme) => ({
    select: {
      width: "100%", // Adjust the width as needed
      "& .MuiSelect-select.MuiSelect-select": {
        paddingBottom: theme.spacing(1), // Adds spacing below the dropdown icon
      },
    },
  }));

  const fetchStatusOptions = async (name) => {
    try {
      const params = new URLSearchParams({
        name: name, // Use the search query as the 'name' parameter
      });

      const url = `https://localhost:7066/api/MaintenancePlan/DropDown?${params}`;
      const response = await axios.get(url);
      console.log("API response:", response.data); // Log the API response

      // if (response.data && Array.isArray(response.data)) {
      //   console.log("Fetched mp options:", response.data);
      //   setStatusOptions(response.data.name);
      if (Array.isArray(response.data)) {
        const options = response.data.map((option) => ({
          id: option.id,
          name: option.name,
        }));
        setMpOptions(options);
      } else {
        console.error(
          "API response does not contain an array of mp options:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchStatuses = debounce(fetchStatusOptions, 300);

  // useEffect(() => {
  //   if (isOpen) {
  //     // Fetch status options when the modal opens
  //     fetchStatusOptions(searchQueryforStatus);
  //   }
  // }, [searchQueryforStatus]);

  useEffect(() => {
    fetchStatusOptions(searchQueryforStatus);
  }, [searchQueryforStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});

    const formData = new FormData();
    // Include the selected status in the FormData

    console.log("Selected Status:", selectedMpId);
    console.log("Selected Status:", selectedMp);
    console.log("Selected Status:", mpOption);
    console.log("Selected Status:", selectedMp.name);
    console.log("Selected Status:", selectedMp.id);
    console.log("Equipment ID:", equipmentId);
    formData.append("equipmentId", equipmentId || null);
    formData.append("mpid", selectedMp ? selectedMpId : "");
    console.log(formData);

    try {
      const response = await axios.post(
        `https://localhost:7066/api/Equipment/AddMpToEquipment`,

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response);

      for (const entry of formData.entries()) {
        console.log(entry);
      }

      // Handle the response, e.g., show a success message
      if (response.status === 200) {
        console.log(formData);
        onClose();
        onMpaddSuccess();
        setSelectedMp("");
        setSearchQueryforStatus("");
        MySwal.fire({
          icon: "success",
          title: "Success!",
          text: "Status changed successfully.",
          customclassName: {
            popup: "my-swal-modal",
          },
        }).then(() => {
          // Handle success action, e.g., refresh the page
        });

        // Clear the selected status
        setSelectedMp("");
      } else if (response.status === 400) {
        console.log(formData);
        // Bad request with validation errors
        const errorData = await response.json();
        console.log("Validation errors:", errorData);

        // Update the state with the validation errors
        setValidationErrors(errorData.errors);
      } else {
        const errorMessage = await response.text();
        console.error("Error:", errorMessage);
        console.log(formData);
      }
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error submitting data:", error);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit data. Please try again later.",
      });
    }
  };

  const handleInputChange = (fieldName, value) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: [],
    }));

    // Update formData state
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  return (
    <Modal open={isOpen}>
      <div className="modal-container-statusChange">
        <div className="modal_Header "></div>
        <form className="uh_Form_Container" onSubmit={handleSubmit}>
          <FormGroup className="mb-3">
            <FormLabel>Mp</FormLabel>
            <Autocomplete
              id="status-options"
              options={mpOption}
              getOptionLabel={(option) => option.name} // Use the name property as the display value
              // getOptionSelected={(option, value) => option.id === value.id} // Compare based on the id property
              value={selectedMp}
              onChange={(event, newValue) => {
                setSelectedMp(newValue);
                if (newValue) {
                  setSelecMpId(newValue.id); // Set the selected MP's ID
                } else {
                  setSelecMpId(""); // Clear the ID when nothing is selected
                }
              }}
              onInputChange={(event, newInputValue) => {
                setSearchQueryforStatus(newInputValue);
              }}
              inputValue={searchQueryforStatus}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search or Select Status"
                  variant="outlined"
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>{option.name}</li>
              )}
            />
          </FormGroup>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            // onClick={onClose}
          >
            Submit
          </Button>
        </form>
        <button className="status-change-button" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default EquipmentAddMpModal;
