import express from "express";
import {
  processPayment,
  sendStripApiKey,
} from "../controller/paymentController";
import { isAuthenticated } from "../middleware/isAuthenticated";

const router = express.Router();

router.post("/payment/process", isAuthenticated, processPayment);
router.get("/stripapikey", isAuthenticated, sendStripApiKey);

export default router;
