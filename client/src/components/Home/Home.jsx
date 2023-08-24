import React from "react";
import "./Home.css";
import MouseIcon from "@mui/icons-material/Mouse";
import Product from "../Product/Product";
import { logo } from "../../assets";
import MetaData from "../Layout/MetaData";

const Home = () => {
  const product = {
    name: "Shoes",
    images: [
      {
        url: logo,
      },
    ],
    price: 500,
    _id: "gsgsg",
  };

  return (
    <>
      <MetaData title="Ecommerce " />
      <div className="banner">
        <h2>Welcome to Ecommerce</h2>
        <h2>Find Amazing Products Below</h2>
        <a href="#container">
          <button>
            <div>
              <p style={{ fontWeight: "bold" }}> Scroll</p> <MouseIcon />
            </div>
          </button>
        </a>
      </div>
      <div className="homeHeading">
        <h2>Featured Product</h2>
      </div>
      <div className="conatiner" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </>
  );
};

export default Home;
