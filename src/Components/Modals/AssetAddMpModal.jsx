import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Autocomplete,
  TextField,
  Button,
  FormGroup,
  FormLabel,
  Box,
  Modal,
  Paper,
  Typography,
} from "@mui/material";

const AssetAddMpModal = ({ isOpen, onClose, equipmentId, onMpaddSuccess }) => {
  const MySwal = withReactContent(Swal);

  const [mpOptions, setMpOptions] = useState([]);
  const [selectedMp, setSelectedMp] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // 🔍 Fetch MP options
  const fetchMpOptions = async (name = "") => {
    try {
      const response = await axios.get(
        `https://localhost:7066/api/MaintenancePlan/DropDown`,
        {
          params: { name },
        }
      );

      if (Array.isArray(response.data)) {
        const mapped = response.data.map((item) => ({
          id: item.id,
          label: item.name, // Used by Autocomplete
        }));
        setMpOptions(mapped);
      }
    } catch (err) {
      console.error("Error fetching MP options:", err);
    }
  };

  useEffect(() => {
    fetchMpOptions(searchQuery);
  }, [searchQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMp || !equipmentId) {
      MySwal.fire(
        "Missing Info",
        "Please select a Maintenance Plan.",
        "warning"
      );
      return;
    }

    try {
      const payload = {
        equipmentId: equipmentId,
        mpid: selectedMp.id,
      };

      console.log("Submitting payload:", payload);

      const response = await axios.post(
        "https://localhost:7066/api/Equipment/AddMpToEquipment",
        payload
      );

      if (response.status === 200) {
        MySwal.fire(
          "Success",
          "Maintenance plan added successfully!",
          "success"
        );
        onClose();
        setSelectedMp(null);
        setSearchQuery("");
        onMpaddSuccess();
      }
    } catch (error) {
      console.error("Submit error:", error);
      MySwal.fire("Error", "Failed to add maintenance plan.", "error");
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          maxWidth: "90%",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          mx: "auto",
          mt: "10%",
        }}
      >
        <Typography variant="h6" mb={2}>
          Add Maintenance Plan
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormGroup sx={{ mb: 2 }}>
            <FormLabel>Select Maintenance Plan</FormLabel>
            <Autocomplete
              options={mpOptions}
              value={selectedMp}
              onChange={(e, newValue) => setSelectedMp(newValue)}
              inputValue={searchQuery}
              onInputChange={(e, newInputValue) =>
                setSearchQuery(newInputValue)
              }
              getOptionLabel={(option) => option.label || ""}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search MP"
                  variant="outlined"
                  fullWidth
                />
              )}
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  {option.label}
                </li>
              )}
            />
          </FormGroup>

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AssetAddMpModal;
