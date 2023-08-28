import express from "express";
import {
  createProduct,
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

export default router;
