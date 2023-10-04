import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./components/Pages/Home/Home";
import ProductDetails from "./components/Pages/ProductDetails/ProductDetails.jsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import AllProducts from "./components/Pages/AllProducts/AllProducts";
import Login from "./components/Pages/LoginPage/LogIn";
import PageNotFound from "./components/Pages/PageNotFound/PageNotFound";
import { PrivateRoute } from "./components/Auth/PrivateRoute";
import WebLayout from "./components/Auth/WebLayout";
import Register from "./components/Pages/Register/Register";
import { getMyProfile } from "./Redux/Auth/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import Myprofile from "./components/MyProfile/Myprofile";
import AddCart from "./components/AddCart/AddCart";
import Shipping from "./components/Shopping/Shipping";
import CheckOutPage from "./components/CheckOutPage/CheckOutPage";
import OrderConfirm from "./components/OrderConfirm/OrderConfirm";
import UserOptions from "..//src/components/Layout/Header/UserOptions";
import axios from "axios";
import { getStripapikey } from "./Api/PaymentRequest";
import Payment from "./components/Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderSuccess from "./components/OrderSuccess/OrderSuccess";
import MyOrders from "./components/MyOrders/MyOrders";
import OrderInfo from "./components/OrderInfo/OrderInfo";
import Dashboard from "./components/Pages/Dashboard/Dashboard";

const App = () => {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);
  async function getStripeApiKey() {
    var { data } = await getStripapikey();
    setStripeApiKey(data.sendStripApiKey);
  }

  useEffect(() => {
    dispatch(getMyProfile());
    WebFont.load({
      google: {
        families: ["Robot", "Droid sans", "Chilanka"],
      },
    });

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <div className="app" style={{ height: "100vh" }}>
        {isAuthenticated && <UserOptions />}
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route
              exact
              path="/"
              element={
                <WebLayout>
                  <Home />
                </WebLayout>
              }
            />
            <Route
              exact
              path="/profile"
              element={
                <WebLayout>
                  <Myprofile />
                </WebLayout>
              }
            />
            <Route
              exact
              path="/products"
              element={
                <WebLayout>
                  <AllProducts />
                </WebLayout>
              }
            />
            <Route
              exact
              path="/products/:id"
              element={
                <WebLayout>
                  <ProductDetails />
                </WebLayout>
              }
            />
          </Route>
          <Route
            exact
            path="/cart"
            element={
              <WebLayout>
                <AddCart />
              </WebLayout>
            }
          />
          <Route
            exact
            path="/shipping"
            element={
              <WebLayout>
                <Shipping />
              </WebLayout>
            }
          />
          <Route
            exact
            path="/checkout"
            element={
              <WebLayout>
                <CheckOutPage />
              </WebLayout>
            }
          />
          <Route
            exact
            path="/order/confirm"
            element={
              <WebLayout>
                <OrderConfirm />
              </WebLayout>
            }
          />
          <Route
            exact
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <WebLayout>
                  <Payment />
                </WebLayout>
              </Elements>
            }
          />
          <Route
            exact
            path="/success"
            element={
              <WebLayout>
                <OrderSuccess />
              </WebLayout>
            }
          />
          <Route
            exact
            path="/orders"
            element={
              <WebLayout>
                <MyOrders />
              </WebLayout>
            }
          />
          <Route
            exact
            path="/orderinfo/:id"
            element={
              <WebLayout>
                <OrderInfo />
              </WebLayout>
            }
          />
          <Route
            exact
            path="/admin/orderupdate/:id"
            element={
              <WebLayout>
                <OrderInfo />
              </WebLayout>
            }
          />
          <Route
            exact
            path="/admin/dashboard"
            element={
              <WebLayout>
                <Dashboard />
              </WebLayout>
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
