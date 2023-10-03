import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./SeeAllProducts.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrdersAction } from "../../Redux/Payment/orderAction";
import LaunchIcon from "@mui/icons-material/Launch";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteProductAction,
  fetchProducts,
} from "../../Redux/Product/ProductAction";
import ProductUpdateDialog from "../Dialogs/ProductUpdateDialog/ProductUpdateDialog";

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

export default function SeeAllProducts() {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const dispatch = useDispatch();
  const { myOrders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.products);

  function createData(id, name, stock, price) {
    return { id, name, stock, price };
  }

  const getProductData = React.useCallback(async () => {
    if (!products) return [];

    const rowData = await Promise.all(
      products.map(async (item) => {
        return createData(item._id, item.name, item.stock, item.price);
      })
    );

    return rowData;
  }, [products]);

  React.useEffect(() => {
    dispatch(fetchProducts({ currentPage: 1 }));
  }, [dispatch]);

  React.useEffect(() => {
    if (products) {
      async function fetchData() {
        const data = await getProductData();
        setRows(data);
      }

      fetchData();
    }
  }, [getProductData, products]);

  const deleteproduct = (id) => {
    dispatch(deleteProductAction(id));
  };
  return (
    <div className="tableCont">
      <TableContainer component={Paper}>
        <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead style={{ color: "red" }}>
              <TableRow>
                <StyledTableCell style={{ fontSize: "1.2rem" }}>
                  Product ID
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "1.2rem" }} align="left">
                  Name
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "1.2rem" }} align="left">
                  Stock
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "1.2rem" }} align="left">
                  Price
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "1.2rem" }} align="center">
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
                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                    <StyledTableCell align="left">{row.stock}</StyledTableCell>
                    <StyledTableCell align="left">{row.price}</StyledTableCell>
                    <StyledTableCell align="center">
                      <ProductUpdateDialog data={row} />
                      <DeleteIcon onClick={() => deleteproduct(row.id)} />
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
