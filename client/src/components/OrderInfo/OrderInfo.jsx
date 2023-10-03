import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMyOrderAction } from "../../Redux/Payment/orderAction";
import MetaData from "../Layout/MetaData";
import "../OrderConfirm/OrderConfirm.css";

const OrderInfo = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { order } = useSelector((state) => state.order);
  console.log(order);
  const { user } = useSelector((state) => state.auth);

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
                {order?.paymentInfo?.status}
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
      </div>
    </div>
  );
};

export default OrderInfo;
