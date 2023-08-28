import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import "./product.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchproductDetails } from "../../Redux/Product/ProductAction";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const handleProductDetails = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <>
      <Card
        sx={{ maxWidth: 345 }}
        className="productCard"
        key={product._id}
        onClick={() => handleProductDetails(product._id)}
      >
        {product &&
          product.image.map((img) => {
            return (
              <CardMedia
                sx={{ height: 140 }}
                image={img?.url ? img.url : ""}
                title="green iguana"
              />
            );
          })}

        <CardContent className="productCardInner">
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Box
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <div style={{ display: "flex", gap: "1rem" }}>
              <Rating
                name="no-value"
                value={product.rating}
                defaultValue={2.5}
              ></Rating>
              <Typography component="legend">
                {product.reviews.length} Reviews
              </Typography>
            </div>

            <h3>
              <span>$</span>
              {product.price}
            </h3>
          </Box>
          <Typography variant="body2" color="text.secondary"></Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Product;
