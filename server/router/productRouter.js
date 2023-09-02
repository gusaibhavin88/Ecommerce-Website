import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAllProduct,
  getProduct,
  updateProduct,
} from "../controller/productController.js";
import {
  authorizeRoles,
  isAuthenticated,
} from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/products", getAllProduct);
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
// router.delete("/product/:id", deleteProduct);

export default router;
