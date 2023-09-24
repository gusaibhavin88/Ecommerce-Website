import React, { useRef } from "react";
import "./payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import CheckOutPage from "../CheckOutPage/CheckOutPage";
import MetaData from "../Layout/MetaData";
import CustomizedSteppers from "../Shopping/CheckOutSteps/CheckOutSteps";
import { Button, Typography } from "@mui/material";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { paymentRequest } from "../../Api/PaymentRequest";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const orderDetail = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingDetail } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const stepStage = 2;
  const payBtn = useRef();
  const stripe = useStripe();
  const element = useElements();
  const paymentData = {
    amount: Math.round(orderDetail.total),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const { data } = await paymentRequest(paymentData);

      const clientSecretKey = data.client_secret;
      console.log(clientSecretKey);
      if (!stripe || !element) {
        console.error("Stripe or element is not available.");
        return;
      }

      const cardElement = element.getElement(CardNumberElement);
      if (!cardElement) {
        console.error("Card element is missing.");
        payBtn.current.disabled = false;
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecretKey, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingDetail.address,
              city: shippingDetail.city,
              state: shippingDetail.state,
              postal_code: shippingDetail.pinCode,
              country: shippingDetail.country,
            },
          },
        },
      });

      console.log("Payment result:", result);

      if (result.error) {
        console.error("Payment failed:", result.error.message);
        payBtn.current.disabled = false;
      } else {
        console.log("Payment successful");
        navigate("/success");
        // Add your code for successful payment handling here
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      payBtn.current.disabled = false;
    }
  };

  return (
    <>
      <MetaData title="payment"></MetaData>
      <CustomizedSteppers stepStage={stepStage} />
      <div className="pamentContainer">
        <form action="" className="paymentForm">
          <Typography>Card Info</Typography>
          <div className="paymentCont">
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div className="paymentCont">
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div className="paymentCont">
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="text"
            className="total"
            style={{ width: "50%" }}
            ref={payBtn}
            onClick={handleSubmit}
            value={`pay  - ${orderDetail && orderDetail.total}`}
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
