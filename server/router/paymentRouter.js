import express from "express";
import {
  processPayment,
  sendStripApiKey,
} from "../controller/paymentController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/process/payment", isAuthenticated, processPayment);
router.get("/stripapikey", isAuthenticated, sendStripApiKey);

// router.post("/process/rezopayment", isAuthenticated, processPayment);
// router.get("/rezoapikey", isAuthenticated, sendStripApiKey);

export default router;
