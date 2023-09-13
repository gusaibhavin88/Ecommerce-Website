import { Rating } from "@mui/material";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Review = () => {
  const { product } = useSelector((state) => state.products);

  return (
    <div style={{ padding: "1rem 5rem" }}>
      <Row
        xs={2}
        md={3}
        className="g-4"
        style={{
          justifyContent: "center",
        }}
      >
        {product?.reviews?.length > 0 ? (
          product.reviews.map((item, idx) => (
            <Col key={idx} onClick={() => handleProductDetails(item._id)}>
              <Card
                style={{
                  gap: "1rem",
                  cursor: "pointer",
                  alignItems: "center",
                  padding: "1rem 0rem",
                }}
              >
                <Card.Img
                  variant="top"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                  }}
                  src={item?.user?.url}
                />
                <Card.Body
                  style={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Card.Title className="fs-3" style={{ fontWeight: "bold" }}>
                    {item.name}
                  </Card.Title>
                  <div style={{ display: "flex" }}>
                    <Rating name="read-only" value={item.rating} readOnly />
                  </div>
                  <Card.Text style={{ fontWeight: "bold" }} className="fs-5">
                    {item.comment}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "1.5rem",
              color: "red",
            }}
          >
            Reviews not found
          </div>
        )}
      </Row>
    </div>
  );
};

export default Review;
