import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./SeeAllOrders.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrderAction,
  getAllOrdersAction,
  getMyOrdersAction,
} from "../../Redux/Payment/orderAction";
import LaunchIcon from "@mui/icons-material/Launch";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProductAction } from "../../Redux/Product/ProductAction";

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

export default function SeeAllOrders() {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const dispatch = useDispatch();
  const myOrders = useSelector((state) => state.order.allOrders);

  function createData(id, status, qty, amount) {
    return { id, status, qty, amount };
  }

  const getOrderData = React.useCallback(async () => {
    if (!myOrders) return [];

    const rowData = await Promise.all(
      myOrders.map(async (item) => {
        return createData(
          item._id,
          item.orderStatus,
          item.itemsPrice,
          item.itemsPrice
        );
      })
    );

    return rowData;
  }, [myOrders]);

  React.useEffect(() => {
    dispatch(getAllOrdersAction());
  }, [dispatch]);

  React.useEffect(() => {
    if (myOrders) {
      async function fetchData() {
        const data = await getOrderData();
        setRows(data);
      }

      fetchData();
    }
  }, [getOrderData]);

  const deleteOrder = (id) => {
    dispatch(deleteOrderAction(id));
  };
  return (
    <div className="tableCont" id="seeAllOrders">
      <h1>All Orders</h1>
      <TableContainer component={Paper}>
        <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead style={{ color: "red" }}>
              <TableRow>
                <StyledTableCell style={{ fontSize: "1.2rem" }}>
                  Order ID
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "1.2rem" }} align="left">
                  Status
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "1.2rem" }} align="left">
                  Item Qty
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "1.2rem" }} align="left">
                  Amount
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
                    <StyledTableCell align="left">{row.status}</StyledTableCell>
                    <StyledTableCell align="left">{row.qty}</StyledTableCell>
                    <StyledTableCell align="left">{row.amount}</StyledTableCell>
                    <StyledTableCell
                      align="right"
                      style={{ gap: "1rem", display: "flex" }}
                    >
                      <EditIcon
                        onClick={() => navigate(`/admin/orderupdate/${row.id}`)}
                      />
                      <DeleteIcon onClick={() => deleteOrder(row.id)} />
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
