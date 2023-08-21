import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "../controller/productController.js";
import {
  authorizeRoles,
  isAuthenticated,
} from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get(
  "/products",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllProduct
);
router.post("/product/new", createProduct);
router.put("/product/:id", updateProduct);
router.get("/product/:id", getProduct);
router.delete("/product/:id", deleteProduct);

export default router;
