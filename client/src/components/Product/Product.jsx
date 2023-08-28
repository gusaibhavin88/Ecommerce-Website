// import React, { useEffect } from "react";
// import Box from "@mui/material/Box";
// import Rating from "@mui/material/Rating";
// import "./product.css";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { useNavigate } from "react-router-dom";

// const Product = ({ product }) => {
//   const navigate = useNavigate();
//   const handleProductDetails = (id) => {
//     navigate(`/products/${id}`);
//   };

//   return (
//     <>
//       <Card
//         sx={{ maxWidth: 345 }}
//         className="productCard"
//         key={product._id}
//         onClick={() => handleProductDetails(product._id)}
//       >
//         <CardMedia
//           sx={{ height: 140 }}
//           image={product.image[0] ? product.image[0].url : ""}
//           title="green iguana"
//         />

//         <CardContent className="productCardInner">
//           <Typography gutterBottom variant="h5" component="div">
//             {product.name}
//           </Typography>
//           <Box
//             style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
//             sx={{
//               "& > legend": { mt: 2 },
//             }}
//           >
//             <div style={{ display: "flex", gap: "1rem" }}>
//               <Rating
//                 name="no-value"
//                 value={product.rating}
//                 defaultValue={2.5}
//               ></Rating>
//               <Typography component="legend">
//                 {product.reviews.length} Reviews
//               </Typography>
//             </div>

//             <h3>
//               <span>$</span>
//               {product.price}
//             </h3>
//           </Box>
//           <Typography variant="body2" color="text.secondary"></Typography>
//         </CardContent>
//       </Card>
//     </>
//   );
// };

// export default Product;

import React, { useEffect } from "react";
import "./product.css";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Rating from "@mui/material/Rating";

const Product = ({ products }) => {
  const navigate = useNavigate();
  const handleProductDetails = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Row xs={1} md={3} className="g-4">
        {products &&
          products.map((item, idx) => (
            <Col key={idx} onClick={() => handleProductDetails(item._id)}>
              <Card style={{ gap: "1rem" }}>
                <Card.Img variant="top" src={item.image[0]?.url} />
                <Card.Body>
                  <Card.Title class="fs-3" style={{ fontWeight: "bold" }}>
                    {item.name}
                  </Card.Title>
                  <div style={{ display: "flex" }}>
                    <Rating
                      name="no-value"
                      value={products.rating}
                      defaultValue={2.5}
                    ></Rating>
                    <Card.Text>
                      &nbsp; ({item.reviews.length} &nbsp;Reviews)
                    </Card.Text>
                  </div>
                  <Card.Text style={{ fontWeight: "bold" }} class="fs-5">
                    ${item.price}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Product;
