import express from "express";
import {
  createNewOrder,
  deleteOrder,
  getAllOrders,
  myOrder,
  updateOrder,
} from "../controller/orderController.js";
import {
  authorizeRoles,
  isAuthenticated,
} from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/order/new", isAuthenticated, createNewOrder);
router.get("/order/me", isAuthenticated, myOrder);
router.get(
  "/order/all",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrders
);
router.get(
  "/order/all",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrders
);
router.put(
  "/order/update/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateOrder
);
router.delete(
  "/order/delete/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteOrder
);

export default router;
