import { Router } from "express";
import { adminAuth, verifyJWT } from "../middlewares/auth.middleware.js";
import {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  updateStatus,
  userOrders,
  verifyRazorpay,
} from "../controllers/order.controllers.js";

const router = Router();

// Admin Features
router.route("/all-orders").post(adminAuth, allOrders);

router.route("/status").patch(adminAuth, updateStatus);

// Payment Features
router.route("/place").post(verifyJWT, placeOrder);

router.route("/razorpay").post(verifyJWT, placeOrderRazorpay);

// User Features
router.route("/user-orders").post(verifyJWT, userOrders);

// Verify payment
router.route("/verifyRazorpay").post(verifyJWT, verifyRazorpay);

export default router;
