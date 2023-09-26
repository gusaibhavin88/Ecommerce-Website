import React from "react";
import "./Dashboard.css";
import Sidebar from "../../sidebar/sidebar";

const Dashboard = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        border: "1px solid red",
      }}
    >
      <Sidebar />
    </div>
  );
};

export default Dashboard;
