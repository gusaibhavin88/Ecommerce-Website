import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getMyOrderAction } from "../../Redux/Payment/orderAction";
import MetaData from "../Layout/MetaData";
import "../OrderConfirm/OrderConfirm.css";
import { Form } from "react-bootstrap";
import { updateOrderStatus } from "../../Api/OrderRequest";

const OrderInfo = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [status, setStatus] = useState("");
  const { order } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const orderUpdate = location.pathname.includes("orderupdate");
  const handleSubmit = async () => {
    console.log("first");
    const response = await updateOrderStatus(params.id, {
      orderStatus: status,
    });
    console.log(response);
  };

  useEffect(() => {
    dispatch(getMyOrderAction(params.id));
  }, []);
  return (
    <div className="confirmorder">
      <MetaData title="Confirm Order" />
      <div className="orderData">
        <div className="leftdata">
          <div className="orderIdPer">
            <h1>Order Id : {order?._id}</h1>
          </div>

          <div className="lefttop">
            <h2>Shipping Info</h2>
            <div className="shipinfo">
              <h4>
                Name: <span>{user?.name}</span>
              </h4>
              <h4>
                Phone: <span>{order?.shippingInfo?.phoneNo}</span>
              </h4>
              <h4>
                Address: <span>{order?.shippingInfo?.address}</span>
              </h4>
            </div>
          </div>
          <div className="lefttop">
            <h2>Payment Info</h2>
            <div className="shipinfo">
              <h4
                style={
                  order?.paymentInfo?.status === "succeeded"
                    ? { color: "green" }
                    : { color: "red" }
                }
              >
                {order?.paymentInfo?.status === "succeeded" ? "PAID" : "FAIL"}
              </h4>
              <h4>
                Amount: <span>₹{order?.totalPrice}</span>
              </h4>
            </div>
            <h2>Order Status</h2>
            <div className="shipinfo">
              <h4
                style={
                  order?.paymentInfo?.status === "succeeded"
                    ? { color: "green" }
                    : { color: "red" }
                }
              >
                {order?.orderStatus}
              </h4>
            </div>
          </div>
          <div className="leftbottom">
            <h2>Your Cart Items:</h2>
            {order &&
              order?.orderItems?.map((item) => {
                return (
                  <div className="innerist">
                    <div className="twoitwm">
                      <img
                        src={item?.image}
                        alt=""
                        style={{ width: "10rem" }}
                      />
                      <h5> {item.name}</h5>
                    </div>
                    <div className="totalamount">
                      <h5>
                        {item.quantity} X ₹{item.price} ={" "}
                        <span style={{ fontWeight: "700" }}>
                          ₹{item.quantity * item.price}
                        </span>
                      </h5>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {orderUpdate && (
          <div className="rightList">
            <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
              <h2 style={{ textAlign: "center" }}>Process Order</h2>
              <Form.Control
                as="select"
                className="updateStatus"
                onChange={(e) => setStatus(e.target.value)}
              >
                {true &&
                  ["Select", "Shipped", "Delivered"].map((item) => {
                    return <option>{item}</option>;
                  })}
                {/* Add more category options as needed */}
              </Form.Control>
              <Button
                variant="contained"
                style={{ alignSelf: "center" }}
                onClick={() => handleSubmit()}
              >
                Check Out
              </Button>
            </Form.Group>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderInfo;
