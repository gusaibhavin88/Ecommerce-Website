import React, { useEffect } from "react";
import "./Home.css";
import MouseIcon from "@mui/icons-material/Mouse";
import Product from "../Product/Product";
import MetaData from "../Layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/Product/ProductAction";
import ReactLoading from "react-loading";
import { useSnackbar } from "../context/SnackbarContext";

const Home = () => {
  const { handleClick, handleClose } = useSnackbar();

  const dispatch = useDispatch();
  const { products, status, loading, error } = useSelector(
    (state) => state.products
  );

  const fetchAllPoducts = () => {
    dispatch(fetchProducts());
  };

  useEffect(() => {
    fetchAllPoducts();
  }, []);

  // useEffect(() => {
  //   if (error) {
  //     handleClick("error", error);
  //   }
  // }, [error]);

  const handleShowCustomSnackbar = (e) => {
    e.preventDefault();
    // Call the openSnackbar function from the context with 'success' severity and a custom message
    handleClick("error", "This is a custom success message!");
  };

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
          <button onClick={handleShowCustomSnackbar}>ggsgsdg</button>
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
