import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Typography } from "@mui/material";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { paymentRequest } from "../../Api/PaymentRequest";
import MetaData from "../Layout/MetaData";
import CustomizedSteppers from "../Shopping/CheckOutSteps/CheckOutSteps";
import { useSnackbar } from "../context/SnackbarContext";
import "./payment.css";
import { createNewOrderAction } from "../../Redux/Payment/orderAction";

const Payment = () => {
  const orderDetail = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingDetail } = useSelector((state) => state.cart);
  const { cartList } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const stepStage = 2;
  const payBtn = useRef();
  const stripe = useStripe();
  const element = useElements();
  const dispatch = useDispatch();
  const { handleClick, handleClose } = useSnackbar();
  const paymentData = {
    amount: Math.round(orderDetail.total),
  };

  let newOrder = {
    shippingInfo: shippingDetail,
    itemsPrice: orderDetail.subTotal,
    taxPrice: Number(orderDetail.gst),
    shippingPrice: Number(orderDetail.shippingCharge),
    totalPrice: Number(orderDetail.total),
    paymentInfo: {
      id: "",
      status: "",
    },
    // orderItems: cartList,
  };

  const onComplete = (response) => {
    handleClick("success", "Password has changed Login again");
  };

  const onError = (response) => {
    console.log(response);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const { data } = await paymentRequest(paymentData);

      const clientSecretKey = data.client_secret;
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
        payBtn.current.disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          const filterCart = cartList.map((item) => ({
            name: item.name,
            price: item.price,
            image: item.image[0].url,
            quantity: item.quantity,
            product: item._id,
          }));

          newOrder.paymentInfo.id = result.paymentIntent.id;
          newOrder.paymentInfo.status = result.paymentIntent.status;
          newOrder.orderItems = filterCart;
          console.log(newOrder);
          dispatch(
            createNewOrderAction({
              functions: {
                onComplete,
                onError,
                formdata: newOrder,
              },
            })
          );

          console.log("first");
          payBtn.current.disabled = false;
          navigate("/success");
          handleClick("success", "Payment done successfully");
        } else {
          handleClick("error", "There's some issue while processing payment");
        }
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
