import { Router } from "express";
import {
  addProduct,
  getProducts,
  getSingleProduct,
  removeProduct,
} from "../controllers/product.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { adminAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addProduct").post(
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

router.route("/list").get(getProducts);

router.route("/:productId").delete(adminAuth, removeProduct);

router.route("/:productId").get(getSingleProduct);

export default router;
