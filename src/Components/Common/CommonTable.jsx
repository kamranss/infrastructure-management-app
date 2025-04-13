// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

// const CommonTable = ({ columns = [], rows = [], detailRouteBase = "" }) => {
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             {columns.map((col) => (
//               <TableCell key={col.field}>{col.headerName}</TableCell>
//             ))}
//             {detailRouteBase && <TableCell>Actions</TableCell>}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row, idx) => (
//             <TableRow key={idx}>
//               {columns.map((col) => (
//                 <TableCell key={col.field}>{row[col.field]}</TableCell>
//               ))}
//               {detailRouteBase && (
//                 <TableCell>
//                   <a href={`${detailRouteBase}/${row.id}`}>View</a>
//                 </TableCell>
//               )}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default CommonTable;

import React from "react";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

const CommonTable = ({ columns = [], rows = [], detailRouteBase = "" }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`${detailRouteBase}/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
            <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
              Details
            </TableCell>
            {columns.map((col) => (
              <TableCell
                key={col.field}
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#e3f2fd",
                  color: "#333",
                  borderBottom: "2px solid #ccc",
                }}
              >
                {col.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Tooltip title="View Details">
                  <IconButton onClick={() => handleView(row.id)} size="small">
                    <VisibilityIcon color="primary" />
                  </IconButton>
                </Tooltip>
              </TableCell>
              {columns.map((col) => (
                <TableCell key={col.field}>{row[col.field]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommonTable;
