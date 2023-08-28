import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header/Header";
import WebFont from "webfontloader";
import Footer from "./components/Layout/Footer/Footer";
import Home from "./components/Home/Home.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

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
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products/:id" element={<ProductDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
