import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import axios from "axios";

const AssetInfoCard = ({ detail, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [assetData, setAssetData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [dropdowns, setDropdowns] = useState({
    models: [],
    types: [],
    departments: [],
    manufactures: [],
    operationSites: [],
  });

  const endpoints = {
    models: "Model",
    types: "EquipmentType",
    departments: "Department",
    manufactures: "Manufacture",
    operationSites: "OperationSite",
  };

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetch dropdowns once
  useEffect(() => {
    Object.keys(endpoints).forEach((key) => fetchDropdownData(key));
  }, []);

  const fetchDropdownData = async (key) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/${endpoints[key]}/DropDown`
      );
      if (Array.isArray(data)) {
        setDropdowns((prev) => ({ ...prev, [key]: data }));
      }
    } catch (err) {
      console.error(`Failed to fetch ${key}:`, err);
    }
  };

  // Set asset data when detail & dropdowns ready
  useEffect(() => {
    const allDropdownsLoaded = Object.values(dropdowns).every(
      (arr) => arr.length > 0
    );
    if (detail && allDropdownsLoaded) {
      const updated = { ...detail };
      updated.type =
        dropdowns.types.find((t) => t.id === detail.equipmentTypeId)?.name ||
        "";
      updated.department =
        dropdowns.departments.find((d) => d.id === detail.departmentId)?.name ||
        "";
      updated.manufacture =
        dropdowns.manufactures.find((m) => m.id === detail.manufactureId)
          ?.name || "";
      updated.model =
        dropdowns.models.find((m) => m.id === detail.modelId)?.name || "";
      updated.operationSite =
        dropdowns.operationSites.find((s) => s.id === detail.operationSiteId)
          ?.name || "";

      setAssetData(updated);
      setOriginalData(updated);
    }
  }, [detail, dropdowns]);

  const handleChange = (field, value) => {
    setAssetData((prev) => ({ ...prev, [field]: value }));
  };

  const hasChanges = JSON.stringify(assetData) !== JSON.stringify(originalData);

  const handleSave = async () => {
    const payload = {
      id: assetData.id,
      name: assetData.name || "",
      unitNumber: assetData.unitNumber || "",
      description: assetData.description || "",
      color: assetData.color || "",
      identification: assetData.identification || "",
      modelId:
        dropdowns.models.find((m) => m.name === assetData.model)?.id || 0,
      operationSiteId:
        dropdowns.operationSites.find((d) => d.name === assetData.operationSite)
          ?.id || 0,
      productionYear: Number(assetData.productionYear || 0),
      manufactureId:
        dropdowns.manufactures.find((m) => m.name === assetData.manufacture)
          ?.id || 0,
      seriaNumber: assetData.seriaNumber || "",
      equipmentTypeId:
        dropdowns.types.find((t) => t.name === assetData.type)?.id || 0,
      capacity: assetData.capacity || "",
      usageLocation: assetData.usageLocation || "",
      departmentId:
        dropdowns.departments.find((d) => d.name === assetData.department)
          ?.id || 0,
    };

    try {
      await axios.put(`${baseUrl}/api/Equipment/update`, payload);
      onSave && onSave(assetData);
      setEditMode(false);
      setOriginalData(assetData);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const renderInputField = (key, label) => (
    <Grid item xs={6} key={key}>
      <TextField
        label={label}
        value={assetData[key] || ""}
        onChange={(e) => handleChange(key, e.target.value)}
        fullWidth
        disabled={!editMode}
      />
    </Grid>
  );

  const renderAutocomplete = (key, label) => (
    <Grid item xs={6} key={key}>
      <Autocomplete
        disabled={!editMode}
        options={dropdowns[key]}
        value={
          dropdowns[key].find((opt) => opt.name === assetData[key]) || null
        }
        getOptionLabel={(option) => option?.name || ""}
        onChange={(e, newVal) => handleChange(key, newVal?.name || "")}
        renderInput={(params) => (
          <TextField {...params} label={label} fullWidth variant="outlined" />
        )}
      />
    </Grid>
  );

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Asset Info</Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setEditMode((prev) => !prev)}
        >
          {editMode ? "Cancel" : "Edit"}
        </Button>
      </Box>
      <Grid container spacing={2} mt={1}>
        {renderInputField("name", "Name")}
        {renderInputField("description", "Description")}
        {renderInputField("unitNumber", "Unit Number")}
        {renderInputField("seriaNumber", "Serial Number")}
        {renderInputField("productionYear", "Production Year")}
        {renderAutocomplete("types", "Type")}
        {renderAutocomplete("departments", "Department")}
        {renderAutocomplete("manufactures", "Manufacture")}
        {renderAutocomplete("models", "Model")}
        {renderAutocomplete("operationSites", "Operation Site")}
      </Grid>
      {editMode && (
        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
          <Button
            variant="outlined"
            onClick={() => {
              setEditMode(false);
              setAssetData(originalData);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!hasChanges}
          >
            Save
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default AssetInfoCard;
