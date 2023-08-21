import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controller/userController.js";
// import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

// router.get("/products", getAllProduct);
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
// router.get("/product/:id", getProduct);
// router.delete("/product/:id", deleteProduct);

export default router;
