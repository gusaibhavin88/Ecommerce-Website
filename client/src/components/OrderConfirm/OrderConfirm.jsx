import React from "react";
import CustomizedSteppers from "../Shopping/CheckOutSteps/CheckOutSteps";
import MetaData from "../Layout/MetaData";
import "./OrderConfirm.css";
import { logo } from "../../assets";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const OrderConfirm = () => {
  const { cartList } = useSelector((state) => state.cart);
  console.log(cartList);
  const stepStage = 1;
  return (
    <div className="confirmorder">
      <MetaData title="Confirm Order" />
      <CustomizedSteppers stepStage={stepStage} />
      <div className="orderData">
        <div className="leftdata">
          <div className="lefttop">
            <h1>Shipping Info</h1>
            <div className="shipinfo">
              <h4>
                Name: <span>gdgg</span>
              </h4>
              <h4>
                Phone: <span>sggs</span>
              </h4>
              <h4>
                Address: <span>gd</span>
              </h4>
            </div>
          </div>
          <div className="leftbottom">
            <h1>Your Cart Items:</h1>
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
                        {item.qty} X ₹{item.price} ={" "}
                        <span style={{ fontWeight: "700" }}>
                          ₹{item.qty * item.price}
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
              <h5>42000</h5>
            </div>
            <div className="calcu">
              <h5>Subtotal:</h5>
              <h5>42000</h5>
            </div>
            <div className="calcu">
              <h5>Subtotal:</h5>
              <h5>42000</h5>
            </div>
          </div>
          <div className="calcu">
            <h5 style={{ fontWeight: "bold" }}>Total:</h5>
            <h5>42000</h5>
          </div>
          <Button style={{ marginTop: "1rem" }} variant="contained">
            Proceed To Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;
