import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import "./product.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Product = ({ product }) => {
  return (
    <>
      <Card sx={{ maxWidth: 345 }} className="productCard">
        <CardMedia
          sx={{ height: 140 }}
          image={product.images[0].url}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <div style={{ display: "flex" }}>
              <Rating name="no-value" value={null} defaultValue={2.5}></Rating>
              <Typography component="legend">200 Reviews</Typography>
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
