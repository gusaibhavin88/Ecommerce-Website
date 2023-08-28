import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchproductDetails } from "../../Redux/Product/ProductAction";
import { useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";

const ProductDetails = () => {
  const { product, status, loading, error } = useSelector(
    (state) => state.products
  );
  console.log(product);
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchproductDetails(params.id));
  }, [dispatch, params.id]);
  return (
    <>
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Grid container spacing={3}>
            <Carousel index={0}>
              {product.image.map((imageUrl, index) => (
                <CarouselItem key={index}>
                  <img src={imageUrl.url} alt={`Image ${index}`} />
                  <Typography variant="caption">{`Image ${
                    index + 1
                  }`}</Typography>
                </CarouselItem>
              ))}
            </Carousel>
            {/* <Grid item xs={12} md={6}></Grid> */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {product.description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Price: ${product.price}
              </Typography>
              <Button variant="contained" color="primary">
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default ProductDetails;
