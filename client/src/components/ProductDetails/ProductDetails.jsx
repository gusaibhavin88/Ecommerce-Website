import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchproductDetails } from "../../Redux/Product/ProductAction";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "./ProductDetails.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ReviewDialog from "../Dialogs/ReviewDialog";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(0);
  const { product } = useSelector((state) => state.products);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchproductDetails(params.id));
  }, [dispatch, params.id]);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div
      style={{
        padding: "2rem 5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Row xs={1} md={1} className="g-4">
        <Col>
          <Card style={{ gap: "0.5rem" }}>
            <Carousel data-bs-theme="dark">
              {product.image &&
                product.image.map((img) => {
                  return (
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={img.url}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  );
                })}
            </Carousel>
            <Card.Body>
              <Card.Title class="fs-3" style={{ fontWeight: "bold" }}>
                {product.name}
              </Card.Title>
              <Card.Text class="text-secondary">{`Product Id :${product._id} `}</Card.Text>
              <div style={{ borderTop: "1px solid #7a7d7b" }}></div>
              <div style={{ display: "flex" }}>
                <Rating name="read-only" value={product.rating} readOnly />

                <Card.Text class="text-secondary">
                  &nbsp; ({product?.reviews?.length} &nbsp;Reviews)
                </Card.Text>
              </div>

              <Card.Text style={{ fontWeight: "bold" }} class="fs-5">
                ${product.price}
              </Card.Text>
              <div style={{ borderBottom: "1px solid #7a7d7b" }}></div>
              <div
                style={{
                  marginTop: "1rem",
                  gap: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<RemoveIcon />}
                  onClick={handleDecrement}
                ></Button>
                <span>{quantity}</span>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleIncrement}
                ></Button>
              </div>
              <Card.Text class="text-secondary">
                <span style={{ fontWeight: "bold" }}>Description : </span>
                {`${product.description} `}
              </Card.Text>
              <Card.Text class="text-secondary">
                <span style={{ fontWeight: "bold", cursor: "pointer" }}>
                  Status :{" "}
                </span>
                <span
                  style={{
                    cursor: "pointer",
                    ...(product.stock > 0
                      ? { color: "green", fontWeight: "bold" }
                      : { color: "red", fontWeight: "bold" }),
                  }}
                >
                  {`${product.stock > 0 ? "In Stock" : "Out of Stock"} `}
                </span>
              </Card.Text>
              <ReviewDialog />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
