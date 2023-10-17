import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./MyOrders.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrdersAction } from "../../Redux/Payment/orderAction";
import LaunchIcon from "@mui/icons-material/Launch";
import { useNavigate } from "react-router-dom";

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

export default function MyOrders() {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const dispatch = useDispatch();
  const { myOrders } = useSelector((state) => state.order);

  function createData(id, status, items, amount) {
    let totalQty = items
      .map((price) => price.quantity)
      .reduce((sum, i) => sum + i, 0);

    return { id, status, totalQty, amount };
  }

  const getOrderData = React.useCallback(async () => {
    if (!myOrders) return [];

    const rowData = await Promise.all(
      myOrders.map(async (item) => {
        return createData(
          item._id,
          item.paymentInfo.status,
          item.orderItems,
          item.itemsPrice
        );
      })
    );

    return rowData;
  }, [myOrders]);

  React.useEffect(() => {
    dispatch(getMyOrdersAction());
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
  return (
    <div className="tableCont">
      <TableContainer
        component={Paper}
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          width: "85%",
          padding: "2rem 1rem",
        }}
      >
        <Table
          aria-label="customized table"
          className="table"
          sx={{ width: "100%" }}
        >
          <TableHead style={{ color: "red" }}>
            <TableRow>
              <StyledTableCell style={{ fontSize: "1.2rem" }}>
                Order ID
              </StyledTableCell>
              <StyledTableCell style={{ fontSize: "1.2rem" }} align="right">
                Name
              </StyledTableCell>
              <StyledTableCell style={{ fontSize: "1.2rem" }} align="right">
                Stock
              </StyledTableCell>
              <StyledTableCell style={{ fontSize: "1.2rem" }} align="right">
                Price
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
                  <StyledTableCell align="right">{row.status}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.totalQty}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.amount}</StyledTableCell>
                  <StyledTableCell
                    align="right"
                    onClick={() => navigate(`/orderinfo/${row.id}`)}
                  >
                    <LaunchIcon />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
