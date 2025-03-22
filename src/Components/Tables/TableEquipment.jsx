import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { NavLink } from "react-router-dom";

export default function TableEquipment({ thead = [], rows = [], onRowClick }) {
  rows.sort((a, b) => {
    // Convert mpTime to boolean (null and true will be treated as true, false will be treated as false)
    const aMpTime = !!a.mpTime;
    const bMpTime = !!b.mpTime;

    // Sort based on mpTime (false first)
    if (aMpTime < bMpTime) return -1;
    if (aMpTime > bMpTime) return 1;
    return 0;
  });
  return (
    <TableContainer
      component={Paper}
      sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {thead?.map((th, key) => (
              <TableCell key={key}>{th}</TableCell>
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
                // className={`row ${statusclassName}`} // Add 'row' className and status className
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  {/* {" "} */}
                  {console.log("mpTime:", row.mpTime)}
                  {console.log(
                    "Condition:",
                    row.mptime != true && row.mptime != null
                  )}
                  {row.mpTime !== true && row.mpTime !== null ? (
                    <i className="far fa-clock"></i> // Clock icon for incomplete
                  ) : (
                    <i className="fa-solid fa-check"></i>
                  )}
                </TableCell>
                <TableCell align="left">{row?.id}</TableCell>

                <TableCell align="left">{row?.name}</TableCell>
                <TableCell align="left">{row?.description || "-"}</TableCell>
                <TableCell align="left">{row?.operationSite || "-"}</TableCell>
                <TableCell align="left">{row?.productionYear || "-"}</TableCell>
                <TableCell align="left">{row?.serialNumber || "-"}</TableCell>
                <TableCell align="left">{row?.type || "-"}</TableCell>
                <TableCell
                  className={`${
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
                      : ""
                  }`}
                  align="left"
                  style={{
                    color:
                      row.status === "ACTIVE"
                        ? "white"
                        : row.status === "INACTIVE"
                        ? "white"
                        : row.status === "REPAIR"
                        ? "white"
                        : row.status === "IN_USE"
                        ? "white"
                        : row.status === "CONCERVATED"
                        ? "white"
                        : "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  {row?.status || "-"}
                </TableCell>

                <TableCell align="left">
                  {moment(row?.lastMaintenace).format("DD-MM-YYYY") || "-"}
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
