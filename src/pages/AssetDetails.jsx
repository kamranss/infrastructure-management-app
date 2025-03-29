import { useParams, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable, usePagination } from "react-table";
import { fileBaseUrl } from "../Contants/Urls"; // Adjust the path accordingly
import { CircularProgress } from "@mui/material";
import EquipmentStatusChangeModal from "../Components/Modals/EquipmentStatusChangeModal";
import TableEquipmentMp from "../Components/Tables/TableEquipmentMp";
import TableEquipmentPart from "../Components/Tables/TableEquipmentPart";
import EquipmentAddMpModal from "../Components/Modals/EquipmentAddMpModal";
import EquipmentAddMpSettingModal from "../Components/Modals/EquipmentAddMpSettingModal";
import EquipmentAddPartModal from "../Components/Modals/EquipmentAddPartModal";

const AssetDetails = () => {
  const { id } = useParams();
  const [equipmentDetail, setEquipmentDetail] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const rowId = queryParams.get("id");

  const [isLoading, setIsLoading] = useState(true);

  const [isChangeStatusModalOpen, setIsChangeStatusModalOpen] = useState(false);
  const [isAddPartModalOpen, setIsAddPartModalOpen] = useState(false);

  const [isAddMpModalOpen, setIsAddMpModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddMpSettingsModalOpen, setisAddMpSettingsModalOpen] =
    useState(false);

  const [equipmentIdForStatusChange, setEquipmentIdForStatusChange] =
    useState(null);
  const [equipmentIdForMp, setEquipmentIdForMp] = useState(null);
  const [equipmentIdForPart, setEquipmentIdForPart] = useState(null);

  const refreshEquipmentDetails = async () => {
    try {
      // Refetch equipment details using the ID
      const response = await axios.get(`https://localhost:7066/api/Equipment`, {
        params: { id: rowId },
      });
      setEquipmentDetail(response.data);
      setIsChangeStatusModalOpen(false);
      setIsAddPartModalOpen(false);

      console.log("Equipment details refreshed.");
    } catch (error) {
      console.error("Error refreshing equipment details:", error);
    }
  };

  useEffect(() => {
    // Fetch detailed information using the ID and make the request to another URL
    axios
      .get(`https://localhost:7066/api/Equipment`, {
        params: { id: rowId }, // Pass id as a query parameter
      })
      .then((response) => {
        // Set the equipment detail data in state
        setEquipmentDetail(response.data);
        console.log(response.data);
        console.log(response.data.imagUrl);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching equipment detail:", error);
      });
  }, [id]);

  const imageUrl =
    equipmentDetail && equipmentDetail.imagUrl
      ? fileBaseUrl + equipmentDetail.imagUrl
      : null;
  console.log(imageUrl);

  const handleStatusChange = (equipmentId) => {
    setIsChangeStatusModalOpen(true);
    setEquipmentIdForStatusChange(equipmentId);
  };
  const handleAddMpChange = (equipmentId) => {
    setIsAddMpModalOpen(true);
    setEquipmentIdForMp(equipmentId);
  };
  const handleSetResetValue = (equipmentId) => {
    setisAddMpSettingsModalOpen(true);
    setEquipmentIdForMp(equipmentId);
  };
  const handlePartChange = (equipmentId) => {
    setIsAddPartModalOpen(true);
    setEquipmentIdForMp(equipmentId);
  };

  const handleSetMpComplete = () => {
    // Open the Set Mp Complete modal
    setIsAddMpModalOpen(true);
  };

  const handleDeleteChange = () => {
    // Open the Delete modal
    setIsDeleteModalOpen(true);
  };
  if (isLoading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <div className="line"></div>;
      <div className="main_container">
        <div className="equipment-detail-container">
          <div className="equipment-info">
            <div className="heading">
              <h2>Equipment Information</h2>
            </div>

            {equipmentDetail && (
              <div className="equipment-info-box">
                <div className="info-field">
                  <p className="info-label">Name:</p>
                  <p className="info-value">{equipmentDetail.name}</p>
                </div>
                <div className="info-field">
                  <p className="info-label">Description:</p>
                  <p className="info-value">{equipmentDetail.description}</p>
                </div>
                <div className="info-field">
                  <p className="info-label">Type:</p>
                  <p className="info-value">{equipmentDetail.type}</p>
                </div>
                <div className="info-field">
                  <p className="info-label">Department:</p>
                  <p className="info-value">{equipmentDetail.department}</p>
                </div>
                <div className="info-field">
                  <p className="info-label">Manufacture:</p>
                  <p className="info-value">{equipmentDetail.manufacture}</p>
                </div>
                <div className="info-field">
                  <p className="info-label">Model:</p>
                  <p className="info-value">{equipmentDetail.model}</p>
                </div>
                <div className="info-field">
                  <p className="info-label">OperationSite:</p>
                  <p className="info-value">{equipmentDetail.operationSite}</p>
                </div>
                {/* Add more fields as needed */}
              </div>
            )}
          </div>
        </div>
        <div className="right_Side">
          {equipmentDetail && (
            <div className="equipment-info-box_Status">
              <div className="info-field">
                {/* <p className="info-label">Status:</p> */}
                <p
                  className={`info-valueee ${
                    equipmentDetail.status === "ACTIVE"
                      ? "row-active"
                      : equipmentDetail.status === "INACTIVE"
                      ? "row-inactive"
                      : equipmentDetail.status === "REPAIR"
                      ? "row-repair"
                      : equipmentDetail.status === "IN_USE"
                      ? "row-inuse"
                      : equipmentDetail.status === "CONCERVATED"
                      ? "row-concervated"
                      : ""
                  }`}
                >
                  {equipmentDetail.status}
                </p>
              </div>
              <div className="button_container">
                <div className="equ_page_action-buttons_changestatus">
                  <button onClick={handleStatusChange}>Change Status</button>
                </div>
                <EquipmentStatusChangeModal
                  isOpen={isChangeStatusModalOpen}
                  onClose={() => setIsChangeStatusModalOpen(false)}
                  equipmentId={equipmentDetail.id}
                  onStatusChangeSuccess={refreshEquipmentDetails}
                />
                <div className="equ_page_action-buttons_addPart">
                  <button onClick={handlePartChange}>Add Part</button>
                </div>
                <EquipmentAddPartModal
                  isOpen={isAddPartModalOpen}
                  onClose={() => setIsAddPartModalOpen(false)}
                  equipmentId={equipmentDetail.id}
                  onMpaddSuccess={refreshEquipmentDetails}
                />

                <div className="equ_page_action-buttons_addMp">
                  <button onClick={handleAddMpChange}>Add Mp</button>
                </div>
                <EquipmentAddMpModal
                  isOpen={isAddMpModalOpen}
                  onClose={() => setIsAddMpModalOpen(false)}
                  equipmentId={equipmentDetail.id}
                  onMpaddSuccess={refreshEquipmentDetails}
                />
                <div className="equ_page_action-buttons_delete">
                  <button onClick={handleDeleteChange}>Delete</button>
                </div>
                <div className="equ_page_action-buttons_resetValue">
                  <button onClick={handleSetResetValue}>Set Reset Value</button>
                </div>
                <EquipmentAddMpSettingModal
                  isOpen={isAddMpSettingsModalOpen}
                  onClose={() => setisAddMpSettingsModalOpen(false)}
                  equipmentId={equipmentDetail.id}
                  onMpaddSuccess={refreshEquipmentDetails}
                />
                <div className="equ_page_action-buttons_setMp">
                  <button onClick={handleSetMpComplete}>Set Mp Complete</button>
                </div>
              </div>
            </div>
          )}
          {equipmentDetail && (
            <div className="equipment-info-box_2">
              <div className="info-field">
                <p className="info-label">Current Value:</p>
                <p className="info-value">{equipmentDetail.currentValue}</p>
              </div>
              <div className="info-field">
                <p className="info-label">Squence Value:</p>
                <p className="info-value">{equipmentDetail.squenceValue}</p>
              </div>
              <div className="info-field">
                <p className="info-label">Reset Value:</p>
                <p className="info-value">{equipmentDetail.resetValue}</p>
              </div>
            </div>
          )}
          <div className="mp_container">
            <div className="mp_list_container_mp">
              <h2>Maintenance Plans</h2>
              <TableEquipmentMp maintenancePlans={equipmentDetail.mpList} />
            </div>
            <div className="mp_list_container_part">
              <h2>Parts</h2>
              <TableEquipmentPart parts={equipmentDetail.partList} />
            </div>
            <div className="list-info">
              <div className="image_Main">
                {/* {equipmentDetail && ( */}
                <div className="image_Container">
                  {imageUrl ? (
                    <div className="image_box">
                      <img src={imageUrl} alt="" />
                    </div>
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetails;
