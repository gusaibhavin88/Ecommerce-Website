import express from "express";
import {
  createUser,
  forgotPassword,
  getUserDetails,
  loginUser,
  logoutUser,
  resetPassword,
  updatePassword,
} from "../controller/userController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

// router.get("/products", getAllProduct);
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/me", isAuthenticated, getUserDetails);
router.put("/update", isAuthenticated, updatePassword);
// router.get("/product/:id", getProduct);
// router.delete("/product/:id", deleteProduct);

export default router;
