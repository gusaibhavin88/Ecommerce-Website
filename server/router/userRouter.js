import express from "express";
import {
  createUser,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUser,
  getUserDetails,
  loginUser,
  logoutUser,
  resetPassword,
  updatePassword,
  updateProfile,
} from "../controller/userController.js";
import {
  authorizeRoles,
  isAuthenticated,
} from "../middleware/isAuthenticated.js";

const router = express.Router();

// router.get("/products", getAllProduct);
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/me", isAuthenticated, getUserDetails);
router.put("/updatepassword", isAuthenticated, updatePassword);
router.put("/updateprofile", isAuthenticated, updateProfile);
router.get("/getusers", isAuthenticated, authorizeRoles("admin"), getAllUsers);
router.get(
  "/admin/users/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  getUser
);
router.delete(
  "/deleteuser/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

export default router;
