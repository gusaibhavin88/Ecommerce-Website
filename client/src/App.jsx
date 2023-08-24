import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header/Header";
import WebFont from "webfontloader";
import Footer from "./components/Layout/Footer/Footer";
import Home from "./components/Home/Home.jsx";
import "./App.css";

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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
