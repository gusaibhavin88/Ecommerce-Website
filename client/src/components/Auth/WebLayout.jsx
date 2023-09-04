import React from "react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";

const WebLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="content-wrapper">{children}</div>
      <Footer />
    </>
  );
};

export default WebLayout;
