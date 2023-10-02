import React, { useEffect, useState } from "react";
import "./product.css";
import { NavLink, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Rating from "@mui/material/Rating";
// import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/Product/ProductAction";

const Product = ({ products }) => {
  const { productCount } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const handleProductDetails = (id) => {
    navigate(`/products/${id}`);
  };

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  return (
    <div
      style={{
        width: "80%",
        padding: "1rem",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Row xs={2} md={4} className="g-4">
        {products &&
          products.map((item, idx) => (
            <Col key={idx} onClick={() => handleProductDetails(item._id)}>
              <Card style={{ gap: "1rem", cursor: "pointer" }}>
                <Card.Img variant="top" src={item.image[0]?.url} />
                <Card.Body>
                  <Card.Title className="fs-3" style={{ fontWeight: "bold" }}>
                    {item.name}
                  </Card.Title>
                  <div style={{ display: "flex" }}>
                    <Rating name="read-only" value={item.rating} readOnly />
                    <Card.Text>
                      &nbsp; ({item.reviews.length} &nbsp;Reviews)
                    </Card.Text>
                  </div>
                  <Card.Text style={{ fontWeight: "bold" }} className="fs-5">
                    ${item.price}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <NavLink to="/products">
        <span className="seeallproduct">See All Products</span>
      </NavLink>
      {products?.length < 1 && (
        <>
          <div
            style={{
              backgroundColor: "lightgray",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <span style={{ color: "red", fontWeight: "bold" }}>
              Products Not Found
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
