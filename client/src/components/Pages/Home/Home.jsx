import React, { useEffect } from "react";
import "./Home.css";
import MouseIcon from "@mui/icons-material/Mouse";
import Product from "../../Product/Product";
import MetaData from "../../Layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../Redux/Product/ProductAction";
import ReactLoading from "react-loading";
import { useSnackbar } from "../../context/SnackbarContext";
import { NavLink } from "react-router-dom";

const Home = () => {
  const { handleClick, handleClose } = useSnackbar();

  const dispatch = useDispatch();
  const { products, status, loading, error } = useSelector(
    (state) => state.products
  );
  const { user } = useSelector((state) => state.auth);

  const fetchAllPoducts = () => {
    dispatch(fetchProducts({ keyword: "", currentPage: 1, price: [0, 25000] }));
  };

  useEffect(() => {
    fetchAllPoducts();
  }, []);

  const handleShowCustomSnackbar = (e) => {
    e.preventDefault();
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
            <br />
            <br />
            <br />
            <br />
            <br />
            <h2>Welcome to Amazon</h2>
            <h2>Find Amazing Products Below</h2>
            <a href="#container">
              <button className="btn btn-primary" type="submit">
                <MouseIcon />
                Button
              </button>
            </a>
            <NavLink to="/products">
              <button className="btn btn-primary" type="submit">
                <MouseIcon />
                products
              </button>
            </NavLink>
          </div>
          <div className="homeHeading">
            <h2>Featured Product</h2>
          </div>
          <div
            className="conatiner"
            id="container"
            style={{
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Product products={products} />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
