import express from "express";
import {
  processPayment,
  sendStripApiKey,
} from "../controller/paymentController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/process/payment", isAuthenticated, processPayment);
router.get("/stripapikey", isAuthenticated, sendStripApiKey);

export default router;
