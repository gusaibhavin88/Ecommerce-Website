import express from "express";
import {
  checkout,
  getRezoKey,
  paymentVarification,
  processPayment,
  sendStripApiKey,
} from "../controller/paymentController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/process/payment", isAuthenticated, processPayment);
router.get("/stripapikey", isAuthenticated, sendStripApiKey);



// Rezopay
router.get("/rezokey",  getRezoKey); // This will send Key to CLient
router.post("/rezoapikey/checkout",  checkout); // This will Generate Order
router.post("/rezopayment/paymentverification" , paymentVarification); // This will verify payment

export default router;
