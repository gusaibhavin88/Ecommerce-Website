import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./AllUsers.css";
import { useDispatch, useSelector } from "react-redux";
import LaunchIcon from "@mui/icons-material/Launch";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllUsesrAction } from "../../Redux/User/UserAction";
import { deleteUser } from "../../Api/UserRequest";
import { useSnackbar } from "../context/SnackbarContext";
import { useDialog } from "../context/dialogContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AllUsers() {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.user);
  const { handleClick } = useSnackbar();
  const { handleShow, handleClose } = useDialog();

  function createData(id, email, name, role) {
    return { id, email, name, role };
  }

  const getOrderData = React.useCallback(async () => {
    if (!allUsers) return [];

    const rowData = await Promise.all(
      allUsers.map(async (item) => {
        return createData(item._id, item.email, item.name, item.role);
      })
    );

    return rowData;
  }, [allUsers]);

  const removeUser = async (id) => {
    const response = await deleteUser(id);
    if (response) {
      handleClick("success", "User deleted successfully");
      navigate("/admin/dashboard");
    }
  };

  const openDialog = (id) => {
    handleShow("userUpdate", id);
  };

  React.useEffect(() => {
    dispatch(getAllUsesrAction());
  }, [dispatch]);

  React.useEffect(() => {
    if (allUsers) {
      async function fetchData() {
        const data = await getOrderData();
        setRows(data);
      }

      fetchData();
    }
  }, [getOrderData]);
  return (
    <div className="tableCont">
      <TableContainer component={Paper}>
        <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead style={{ color: "red" }}>
              <TableRow>
                <StyledTableCell style={{ fontSize: "1.2rem" }}>
                  User ID
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "1.2rem" }} align="left">
                  Email
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "1.2rem" }} align="left">
                  Name
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "1.2rem" }} align="left">
                  Role
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "1.2rem" }} align="right">
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.email}</StyledTableCell>
                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                    <StyledTableCell align="left">{row.role}</StyledTableCell>
                    <StyledTableCell
                      style={{ gap: "1rem", display: "flex" }}
                      align="right"
                    >
                      <EditIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => openDialog(row.id)}
                      />
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => removeUser(row.id)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </TableContainer>
    </div>
  );
}
