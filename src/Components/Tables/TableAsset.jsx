import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import moment from "moment";
import { NavLink } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import { CheckCircle, AlarmClock } from "lucide-react";
import { AiOutlineClockCircle } from "react-icons/ai"; // blinking red
import { MdCheckCircle } from "react-icons/md"; // green check
import clock from "/src/assets/icons/clock.png";
import correct from "/src/assets/icons/correct.png";

export default function TableAsset({ thead = [], rows = [], onRowClick }) {
  // ✅ Sort rows: mpTime === true (or mpTimeCompleted === false) rows to top
  rows.sort((a, b) => {
    const aMp = a.mpTime === false ? 1 : 0;
    const bMp = b.mpTime === false ? 1 : 0;
    return bMp - aMp; // false (blinking clock) rows go to top
  });
  return (
    <TableContainer
      component={Paper}
      sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="asset table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                backgroundColor: "rgb(190, 213, 236)",
                fontWeight: "bold",
                borderBottom: "2px solid #e0e0e0",
                color: "#333",
                fontSize: "15px",
              }}
            >
              Details
            </TableCell>

            {thead?.map((th, key) => (
              <TableCell
                key={key}
                sx={{
                  backgroundColor: "rgb(190, 213, 236)",
                  fontWeight: "bold",
                  borderBottom: "2px solid #e0e0e0",
                  color: "#333",
                  fontSize: "15px",
                  textTransform: "capitalize",
                }}
              >
                {th}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, key) => {
            const statusclassName =
              row.status === "ACTIVE"
                ? "row-active"
                : row.status === "INACTIVE"
                ? "row-inactive"
                : row.status === "REPAIR"
                ? "row-repair"
                : row.status === "IN_USE"
                ? "row-inuse"
                : row.status === "CONCERVATED"
                ? "row-concervated"
                : "";

            return (
              <TableRow
                key={key}
                onClick={() => onRowClick(row.id)}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: row.mpTime === false ? "#e3f2fd" : "#ffffff",
                }}
              >
                <TableCell align="left">
                  <Tooltip title="View Asset Details">
                    <IconButton
                      component={NavLink}
                      to={`/assetdetails/${row.id}`}
                      size="small"
                    >
                      <VisibilityIcon sx={{ color: "#1976d2" }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>

                {/* ✅ MP Time Icon */}
                {/* <TableCell align="left">
                  {row.mpTime === false ? (
              
                    <span
                      className="blinking-clock"
                      style={{ fontSize: "20px", color: "red" }}
                    >
                      🕒
                    </span>
                  ) : (
                    <CheckCircleIcon style={{ color: "green", fontSize: 20 }} />
                  )}
                </TableCell>
                 */}
                {/* <TableCell align="left">
                  {row.mpTime === false ? (
                    <AiOutlineClockCircle
                      className="blinking-clock red-icon"
                      style={{ color: "red !important", fontSize: 26 }}
                    />
                  ) : (
                    <MdCheckCircle
                      className="green-icon"
                      style={{ color: "green !important", fontSize: 26 }}
                    />
                  )}
                </TableCell> */}
                <TableCell align="left">
                  <img
                    src={row.mpTime === false ? clock : correct}
                    alt={row.mpTime === false ? "MP Due" : "MP OK"}
                    style={{
                      width: "27px",
                      height: "27px",
                      animation:
                        row.mpTime === false
                          ? "blinkRed 1s linear infinite"
                          : "none",
                    }}
                  />
                </TableCell>
                <TableCell align="left">{row?.id}</TableCell>
                <TableCell align="left">{row?.name}</TableCell>
                <TableCell align="left">{row?.description || "-"}</TableCell>
                <TableCell align="left">{row?.operationSite || "-"}</TableCell>
                <TableCell align="left">{row?.productionYear || "-"}</TableCell>
                <TableCell align="left">{row?.serialNumber || "-"}</TableCell>
                <TableCell align="left">{row?.type || "-"}</TableCell>

                <TableCell
                  className={statusclassName}
                  align="left"
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  {row?.status || "-"}
                </TableCell>

                <TableCell align="left">
                  {row?.lastMaintenace && moment(row.lastMaintenace).isValid()
                    ? moment(row.lastMaintenace).format("DD-MM-YYYY")
                    : "Not Available"}
                </TableCell>

                <TableCell align="left">{row?.currentValue || "-"}</TableCell>

                <TableCell align="left">
                  <NavLink
                    to={{
                      pathname: "/equipmentDetail",
                      search: `?id=${row.id}`,
                    }}
                  >
                    <button>
                      <i className="fa-solid fa-circle-info"></i>
                    </button>
                  </NavLink>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
