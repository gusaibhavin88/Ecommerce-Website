import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAllProducts,
  getAllReviews,
  getProduct,
  getProducts,
  updateProduct,
} from "../controller/productController.js";
import {
  authorizeRoles,
  isAuthenticated,
} from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/allproducts", isAuthenticated, getAllProducts);
router.post(
  "/product/new",
  isAuthenticated,
  authorizeRoles("admin"),
  createProduct
);
router.put(
  "/product/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateProduct
);
router.get(
  "/product/:id",
  // isAuthenticated,
  // authorizeRoles("admin"),
  getProduct
);
router.delete(
  "/product/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteProduct
);
router.delete("/reviews", isAuthenticated, deleteReview);
router.put("/createreview", isAuthenticated, createProductReview);
router.get("/getallreviews/:id", isAuthenticated, getAllReviews);
// router.delete("/product/:id", deleteProduct);

export default router;
