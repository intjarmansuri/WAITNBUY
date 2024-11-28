import { Router } from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controllers/cart.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get").get(verifyJWT, getUserCart);

router.route("/add").post(verifyJWT, addToCart);

router.route("/update").patch(verifyJWT, updateCart);

export default router;
