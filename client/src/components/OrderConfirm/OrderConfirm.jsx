import React, { useEffect, useState } from "react";
import CustomizedSteppers from "../Shopping/CheckOutSteps/CheckOutSteps";
import MetaData from "../Layout/MetaData";
import "./OrderConfirm.css";
import { logo } from "../../assets";
import {  useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrderConfirm = () => {
  const navigate = useNavigate();
  const { cartList } = useSelector((state) => state.cart);
  const { shippingDetail } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [subTotal, setSubTotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [total, setTotal] = useState(0);
  const stepStage = 1;

  const processPayment = () => {
    const data = {
      subTotal: subTotal,
      total: total,
      shippingCharge: shippingCharge,
      gst: gst,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };


  // Rezopay section

  const checkoutHandler = async (amount) => {

    const { data: { key } } = await axios.get("http://localhost:5000/api/v1/rezokey")

    const { data: { order } } = await axios.post("http://localhost:5000/api/v1/rezoapikey/checkout", {
      amount : 1
    })

    const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Bag",
        description: "Products",
        image: "",
        image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: order.id,
        callback_url: "http://localhost:5000/api/v1/rezopayment/paymentverification",
        prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9999999999"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121212"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open();
}






  useEffect(() => {
    let total = 0;
    cartList.map((item) => {
      total = total + item.price;
    });
    setSubTotal(total);
    setGst((total * 7) / 100);
    setTotal((total * 7) / 100 + total);
  }, []);
  return (
    <div className="confirmorder">
      <MetaData title="Confirm Order" />
      <CustomizedSteppers stepStage={stepStage} />
      <div className="orderData">
        <div className="leftdata">
          <div className="lefttop">
            <h2>Shipping Info</h2>
            <div className="shipinfo">
              <h4>
                Name: <span>{user?.name}</span>
              </h4>
              <h4>
                Phone: <span>{shippingDetail?.phoneNo}</span>
              </h4>
              <h4>
                Address: <span>{shippingDetail?.address}</span>
              </h4>
            </div>
          </div>
          <div className="leftbottom">
            <h2>Your Cart Items:</h2>
            {cartList &&
              cartList.map((item) => {
                return (
                  <div className="innerist">
                    <div className="twoitwm">
                      <img
                        src={item?.image[0].url}
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

        <div className="rightdata">
          <h2>Order Summary</h2>
          <div className="calperent">
            <div className="calcu">
              <h5>Subtotal:</h5>
              <h5>₹{subTotal}</h5>
            </div>
            <div className="calcu">
              <h5>ShippingCharges:</h5>
              <h5>₹{shippingCharge}</h5>
            </div>
            <div className="calcu">
              <h5>GST:</h5>
              <h5>₹{gst}</h5>
            </div>
          </div>
          <div className="calcu">
            <h5 style={{ fontWeight: "bold" }}>Total:</h5>
            <h5>₹{total}</h5>
          </div>
          <Button
            style={{ marginTop: "1rem" }}
            variant="contained"
            // onClick={processPayment}
            onClick={checkoutHandler}
          >
            Proceed To Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;
