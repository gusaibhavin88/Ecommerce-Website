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
// import { Button } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";

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

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const rows = [
    createRow("Paperclips (Box)", 100, 1.15),
    createRow("Paper (Case)", 10, 45.99),
    createRow("Waste Basket", 2, 17.99),
  ];

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  return (
    <div
      style={{
        padding: "2rem 10rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
            {rows.map((row) => (
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
                    <Typography style={{ fontWeight: "bold" }}>
                      Subscribe
                    </Typography>
                    <Typography>Price : 5000</Typography>
                    <Typography style={{ color: "red" }}>Remove</Typography>
                  </div>
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  <div
                    style={{
                      marginTop: "1rem",
                      gap: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<RemoveIcon />}
                      onClick={handleDecrement}
                    ></Button>
                    <span>{quantity}</span>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={handleIncrement}
                    ></Button>
                  </div>
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  {row.unit}
                </TableCell>
                <TableCell align="center" colSpan={4}>
                  {ccyFormat(row.price)}
                </TableCell>
              </TableRow>
            ))}
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
                >
                  Check Out
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
