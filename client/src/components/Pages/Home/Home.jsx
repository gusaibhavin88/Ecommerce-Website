import React, { useEffect } from "react";
import "./Home.css";
import MouseIcon from "@mui/icons-material/Mouse";
import Product from "../../Product/Product";
import MetaData from "../../Layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../Redux/Product/ProductAction";
import ReactLoading from "react-loading";
import { useSnackbar } from "../../context/SnackbarContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Home = () => {
  const { handleClick, handleClose } = useSnackbar();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { products, status, loading, error } = useSelector(
    (state) => state.products
  );
  const { user } = useSelector((state) => state.auth);

  const fetchAllPoducts = () => {
    dispatch(
      fetchProducts({ keyword: "", currentPage: 1, price: [0, 1000000] })
    );
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
              <Button
                style={{ marginTop: "1rem", gap: "5px" }}
                variant="contained"
              >
                <MouseIcon />
                Button
              </Button>
            </a>
          </div>
          <div className="homeHeading">
            <h2>Featured Product</h2>
          </div>
          <div
            className="conatiner"
            id="container"
            style={{
              width: "100%",
              padding: "1rem",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Product products={products} />

            {products?.length < 1 && (
              <>
                <div
                  className="productNF"
                  style={{
                    backgroundColor: "lightgray",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>Products Not Found</span>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
