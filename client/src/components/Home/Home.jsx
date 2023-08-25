import React, { useEffect } from "react";
import "./Home.css";
import MouseIcon from "@mui/icons-material/Mouse";
import Product from "../Product/Product";
import { logo } from "../../assets";
import MetaData from "../Layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { fetchproducts } from "../../Redux/Product/ProductAction";
import ReactLoading from "react-loading";

const Home = () => {
  const dispatch = useDispatch();
  const { products, status, loading, error } = useSelector(
    (state) => state.products
  );
  console.log(loading);

  const fetchAllPoducts = () => {
    dispatch(fetchproducts());
  };

  useEffect(() => {
    fetchAllPoducts();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loginloading">
          <ReactLoading type="spin" color="#0000FF" height={100} width={50} />
        </div>
      ) : (
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
            {products &&
              products.map((product, index) => {
                return <Product product={product} key={product._id} />;
              })}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
