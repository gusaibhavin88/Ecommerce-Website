import express from "express";
import {
  createUser,
  forgotPassword,
  loginUser,
  logoutUser,
  resetPassword,
} from "../controller/userController.js";

const router = express.Router();

// router.get("/products", getAllProduct);
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
// router.get("/product/:id", getProduct);
// router.delete("/product/:id", deleteProduct);

export default router;
