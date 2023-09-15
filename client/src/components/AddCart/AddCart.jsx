import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { logo } from "../../assets";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "../../Redux/Cart/CartSlice";
import { useNavigate } from "react-router-dom";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import "./addCart.css";

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

export default function AddCart() {
  const [quantity, setQuantity] = useState(0);
  const [rows, setRows] = useState([]);
  const { cartList } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  function createRowsFromDatabaseData() {
    const rowsList = cartList.map((item) =>
      createRow(item.name, item.qty, item.price)
    );
    return rowsList;
  }
  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const removeCartItem = (index) => {
    dispatch(removeCart(index));
  };

  React.useEffect(() => {
    async function fetchData() {
      const data = await createRowsFromDatabaseData();
      console.log(data);
      setRows(data);
    }

    fetchData();
  }, [dispatch, cartList]);
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="addcart" style={{}}>
      {rows[0] ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={1}
                  style={{ fontWeight: "bold" }}
                >
                  Products
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={2}
                  style={{ fontWeight: "bold" }}
                >
                  Quantity
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={3}
                  style={{ fontWeight: "bold" }}
                >
                  Rate per Unit
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={4}
                  style={{ fontWeight: "bold" }}
                >
                  Subtotal
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.map((row, index) => (
                  <TableRow key={row.desc} colSpan={1}>
                    <TableCell
                      align="center"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography>
                        <img
                          src={logo}
                          style={{
                            width: "10rem",
                            height: "10rem",
                          }}
                          alt="Not found"
                          loading="lazy"
                        />
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "left",
                        }}
                      >
                        <Typography
                          style={{ fontWeight: "bold", fontSize: "1.5rem" }}
                        >
                          {row.desc}
                        </Typography>
                        <Typography
                          style={{ color: "red" }}
                          onClick={() => removeCartItem(index)}
                        >
                          Remove
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      <span>{row.qty}</span>
                    </TableCell>
                    <TableCell align="center" colSpan={3}>
                      {row.unit}
                    </TableCell>
                    <TableCell align="center" colSpan={4}>
                      {ccyFormat(row.price)}
                    </TableCell>
                  </TableRow>
                ))}

              <>
                <TableRow>
                  <TableCell align="center" rowSpan={3} />
                  <TableCell align="center" colSpan={2}>
                    Subtotal
                  </TableCell>
                  <TableCell align="center" colSpan={3}></TableCell>
                  <TableCell align="center" colSpan={4}>
                    {ccyFormat(invoiceSubtotal)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    Tax
                  </TableCell>
                  <TableCell align="center" colSpan={3}>{`${(
                    TAX_RATE * 100
                  ).toFixed(0)} %`}</TableCell>
                  <TableCell align="center" colSpan={4}>
                    {ccyFormat(invoiceTaxes)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    Total
                  </TableCell>
                  <TableCell align="center" colSpan={3}></TableCell>
                  <TableCell align="center" colSpan={4}>
                    {ccyFormat(invoiceTotal)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" rowSpan={2} colSpan={3}></TableCell>
                  <TableCell align="center" colSpan={3}></TableCell>
                  <TableCell align="center" colSpan={4}>
                    <Button
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        outline: "none",
                      }}
                      onClick={() => navigate("/login?redirect=shipping")}
                    >
                      Check Out
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div
          className="nocart"
          style={{
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <RemoveShoppingCartIcon style={{ fontSize: "5rem", color: "red" }} />
          <h2>No Product in Your Cart</h2>
          <Button
            style={{
              backgroundColor: "blue",
              color: "white",
              outline: "none",
            }}
          >
            Add Products
          </Button>
        </div>
      )}
    </div>
  );
}
