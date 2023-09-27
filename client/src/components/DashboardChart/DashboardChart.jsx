import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
import "chart.js/auto"; // Import this line to enable automatic scale registration
import "./DashboardChart.css";

const DashboardChart = () => {
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 1000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [1, 20 - 2],
      },
    ],
  };
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="totalAmount">
        <h5>Total Amount</h5>
        <h5>Total Amount</h5>
      </div>
      <div className="productData">
        <div className="productinfo">
          <span>Product</span>
        </div>
        <div className="productinfo">
          <span>Product</span>
        </div>
        <div className="productinfo">
          <span>Product</span>
        </div>
      </div>
      <div className="lineChart">
        <Line data={lineState} />
      </div>
      <div className="doughnutChart">
        <Doughnut data={doughnutState} />
      </div>
    </div>
  );
};

export default DashboardChart;
