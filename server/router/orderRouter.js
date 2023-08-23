import express from "express";
import { createNewOrder, myOrder } from "../controller/orderController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/order/new", isAuthenticated, createNewOrder);
router.get("/order/me", isAuthenticated, myOrder);

export default router;
