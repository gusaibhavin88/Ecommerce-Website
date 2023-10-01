import React, { useCallback, useEffect, useState } from "react";
import "../../Product/Product.css";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Rating from "@mui/material/Rating";
import Slider from "@mui/material/Slider";
import { useDispatch, useSelector } from "react-redux";
import ProductFilter from "../../ProductFilter/ProductFilter";
import SearchBar from "../../SearchBar/SearchBar";
import Pagination from "react-js-pagination";
import { fetchProducts } from "../../../Redux/Product/ProductAction";
import { useSnackbar } from "../../context/SnackbarContext";
import { clearError } from "../../../Redux/Product/ProductSlice";
import { profile } from "../../../assets";

const AllProducts = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(null);
  const { handleClick, handleClose } = useSnackbar();
  const {
    products,
    status,
    loading,
    error,
    productCount,
    filteredCount,
    resultPerPages,
  } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const navigate = useNavigate();
  const handleProductDetails = (id) => {
    navigate(`/products/${id}`);
  };

  useEffect(() => {
    if (error) {
      handleClick("error", error);
      dispatch(clearError());
    }
    if (currentPage) {
      dispatch(fetchProducts({ currentPage: 1 }));
    }
  }, [dispatch, currentPage, error]);

  return (
    <div>
      <div className="homeHeading">
        <h2>Products</h2>
      </div>
      <div
        style={{
          width: "100%",
          padding: "1rem",
          justifyContent: "center",
          display: "flex",
          gap: "1rem",
        }}
      >
        <ProductFilter />
        <div
          style={{
            width: "80%",
            padding: "1rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Row xs={2} md={4} className="g-4">
            {products &&
              products.map((item, idx) => (
                <Col key={idx} onClick={() => handleProductDetails(item._id)}>
                  <Card style={{ gap: "1rem", cursor: "pointer" }}>
                    <Card.Img variant="top" src={item.image[0]?.url} />
                    <Card.Body>
                      <Card.Title
                        classname="fs-3"
                        style={{ fontWeight: "bold" }}
                      >
                        {item.name}
                      </Card.Title>
                      <div style={{ display: "flex" }}>
                        <Rating name="read-only" value={item.rating} readOnly />
                        <Card.Text>
                          &nbsp; ({item.reviews.length} &nbsp;Reviews)
                        </Card.Text>
                      </div>
                      <Card.Text
                        style={{ fontWeight: "bold" }}
                        classname="fs-5"
                      >
                        ${item.price}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      </div>
      <div className="pagination">
        {resultPerPages < productCount && filteredCount > 0 && (
          <Pagination
            activePage={currentPage === null ? 1 : currentPage}
            itemsCountPerPage={resultPerPages}
            totalItemsCount={
              productCount > filteredCount ? filteredCount : productCount
            }
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        )}
      </div>
    </div>
  );
};

export default AllProducts;
