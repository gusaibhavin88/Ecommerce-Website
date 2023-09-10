import React from "react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import UserOptions from "../Layout/Header/UserOptions";
import { useSelector } from "react-redux";

const WebLayout = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <>
      <Header />
      {isAuthenticated && <UserOptions />}
      <div className="content-wrapper">{children}</div>
      <Footer />
    </>
  );
};

export default WebLayout;
