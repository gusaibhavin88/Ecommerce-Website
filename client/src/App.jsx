import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import Myprofile from "./components/MyProfile/Myprofile";
import AddCart from "./components/AddCart/AddCart";
import Shipping from "./components/Shopping/Shipping";
import CheckOutPage from "./components/CheckOutPage/CheckOutPage";
import OrderConfirm from "./components/OrderConfirm/OrderConfirm";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfile());
    WebFont.load({
      google: {
        families: ["Robot", "Droid sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <div className="app" style={{ height: "100vh" }}>
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
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
