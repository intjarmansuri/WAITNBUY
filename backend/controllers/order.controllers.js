import dotenv from "dotenv";
dotenv.config();
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Razorpay from "razorpay";

// global variable
const currency = "INR";
const deliveryCharge = 40;

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORYPAY_KEY_SECRET,
});

// Place an order using Cash on Delivery (COD) method
const placeOrder = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const order = new Order(orderData);
    await order.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res
      .status(201)
      .json(new ApiResponse(201, order, "Order placed successfully!"));
  } catch (error) {
    console.error(error.message);
  }
});

// Place an order using Razorpay payment method
const placeOrderRazorpay = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { items, amount, address } = req.body;

  const orderData = {
    userId,
    items,
    address,
    amount,
    paymentMethod: "Razorpay",
    payment: false,
    date: Date.now(),
  };

  const newOrder = new Order(orderData);
  await newOrder.save();

  const options = {
    amount: amount * 100,
    currency: currency,
    receipt: newOrder._id.toString(),
  };

  await razorpayInstance.orders.create(options, (error, order) => {
    if (error) {
      console.log(error);
      throw new ApiError(400, "Error while creating payment order");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, order, "Payment successfull"));
  });
});

const verifyRazorpay = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { razorpay_order_id } = req.body;

  const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

  if (orderInfo.status === "paid") {
    await Order.findByIdAndUpdate(orderInfo.receipt, { payment: true });

    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json(new ApiResponse(201, "Payment successful"));
  } else {
    throw new ApiError(400, "Payment failed");
  }
});

// Retrieve all orders data for the Admin Panel
const allOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});

  if (!orders) {
    throw new ApiError(404, "No order found");
  }

  return res.status(201).json(new ApiResponse(201, orders));
});

// Retrieve order data for a specific user for frontend display
const userOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(404, "User not found");
  }

  const orders = await Order.find({ userId });

  return res.status(201).json(new ApiResponse(201, orders));
});

// Update the status of an existing order
const updateStatus = asyncHandler(async (req, res) => {
  const { orderId, status } = req.body;

  await Order.findByIdAndUpdate(orderId, { status });

  return res.status(201).json(new ApiResponse(201, "Status updated"));
});

export {
  placeOrder,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyRazorpay,
};
