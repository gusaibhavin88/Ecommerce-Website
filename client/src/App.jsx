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
import SignUp from "./components/Pages/Register/Register";

const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Robot", "Droid sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <div style={{ height: "100vh" }}>
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
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
