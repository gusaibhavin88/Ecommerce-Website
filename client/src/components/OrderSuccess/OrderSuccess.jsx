import React from "react";
import "./OrderSuccess.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
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
      <CheckCircleOutlineIcon style={{ fontSize: "10rem", color: "red" }} />
      <h2>Order Places Successfully</h2>
      <Button
        style={{
          backgroundColor: "blue",
          color: "white",
          outline: "none",
        }}
        onClick={() => navigate("/order/me")}
      >
        Continue Shopping
      </Button>
    </div>
  );
};

export default OrderSuccess;
