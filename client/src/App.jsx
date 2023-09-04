import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header/Header";
import WebFont from "webfontloader";
import Footer from "./components/Layout/Footer/Footer";
import Home from "./components/Home/Home.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import SignIn from "./components/Auth/SignIn";
import AllProducts from "./components/AllProducts/AllProducts";
import Login from "./components/LoginPage/LogIn";
import PageNotFound from "./components/PageNotFound/PageNotFound";

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
        <Header />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/products" element={<AllProducts />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products/:id" element={<ProductDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
